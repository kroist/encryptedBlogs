import React, {useEffect, useState, useRef, useContext} from 'react';
import {useLocation} from 'react-router-dom'
// You could also move this to a CSS module for better maintainability
import Loading from './Loading.tsx'
import { nftPosession } from '../hooks/useLogin.tsx';
import {getNftByContract} from '../hooks/storage.tsx'
import BlogPostPreview from './BlogPostPreview.tsx' 
import useCustomSDK from '../hooks/useCustomSDK.tsx'
import { getBlogPreview } from '../hooks/publicPreview.tsx';
import {addNft} from '../hooks/storage.tsx'
import {mintNft} from '../hooks/useLogin.tsx'
import ThemeContext from '../ThemeContext.tsx';
function BlogCheckout() {
    const [loading, setLoading] = useState(true);
    const [loadingCaption, setLoadingCaption] = useState("Loading blog info...");
    const [have_access, setHaveAccess] = useState(false);
    const [blog, setBlog] = useState(null);
    const location = useLocation();
    const blogAddress = useRef();

    const firstTime = useRef(false);

    const [error, setError] = useState("");

    const { sdk, connected, connecting, provider, chainId, ready } = useCustomSDK();
  

    const theme = useContext(ThemeContext);

    useEffect(() => {
        
        if(!provider || !firstTime || firstTime.current == true){
            return;
        }
        firstTime.current = true;
        // Extract the path segment after '/blog/'
        const pathParts = location.pathname.split('/'); // This splits the path by '/'
        // Assuming the structure is /blog/:id, `id` should be at index 2
        blogAddress.current = pathParts[2];
        console.log(" Addr is " , blogAddress.current)
        if(blogAddress.current == 'undefined'){
            setError("Blog address not found");
            setLoading(false);
            return;
        }
        const addr = blogAddress.current;
        console.log('Blog ID:', addr); // This should log 'fkasdjflz' or whatever the id is

        setLoadingCaption("Checking access...");
        const current_nft = getNftByContract(blogAddress.current);
        if(current_nft.length == 0){
            getBlogPreview(blogAddress.current).then(response=>{

                console.log(" THE RESPONSE IS " , response);
                setBlog(response);
                setHaveAccess(false);
                setLoading(false);
              
            }).catch(error=> {
                console.log("couldn't fetch blog info");
                setError("Couldn't fetch blog info, error occured");
                setLoading(false);
            })
             return;
        }
        nftPosession(provider, blogAddress.current, current_nft[0].nft).then(response=>{
            if(response){
                setHaveAccess(true);
            }
            setLoading(false);
        }).catch(error => {
            console.log("error while checking access " , error);
            setError("Couldn't verify your ownership, error occured");
            setLoading(false);
        
        })


        // You can now use `blogId` for fetching data, etc.
    }, [location, firstTime, provider]);

    return <> <div className="flex flex-col items-center w-full">
     
        {
            <Loading loading={loading} caption={loadingCaption}/>    
        }
        {!loading && !have_access && error == '' && 
        <div className="w-full flex flex-col mt-10 items-center align-center " style={{maxWidth: '1080px'}}>
        
        <div className="w-[90%]">
        <BlogPostPreview blog={blog}/>
        </div>
      
        
        <div className="flex items-center justify-center w-[100%] flex-col">
        
            <p className="text-xl mt-10">
                Currently you don't have access to this blogpost, you can buy the NFT to get access.
            </p>
        
            <button  className="mt-5 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline" 
       onClick={(e) => {

               theme.setShadowLoading(true);
               mintNft(provider, blogAddress.current).then(response=>{
                     console.log("NFT MINTED " , response);
                     addNft(blogAddress.current, response);

                     theme.setShadowLoading(false);
                     setHaveAccess(true);
               }).catch(error => {
                setError("Couldn't mint NFT, error occured");
                theme.setShadowLoading(false);
                setHaveAccess(false);
               })
            }}>
                Buy blog's NFT
            </button>
        
        </div>

        </div>


        
        }

        {loading == false && have_access == true && 
        <div>
            We should try to load content here
        </div>
        }

{loading == false && error != '' && (
    <div className="w-full mt-5 flex flex-col justify-center items-center font-semibold text-center">
        <div>
            Error occurred! {error}
        
        
        </div>
        <button className="mt-5 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline">
            Try again
        </button>
    </div>
)}

    </div></>
}

export default BlogCheckout;
