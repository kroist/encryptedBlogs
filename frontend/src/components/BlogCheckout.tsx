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
import LoadContent from './LoadContent.tsx'
import NftInput from './NftInput.tsx'
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
        
        getBlogPreview(blogAddress.current).then(response=>{

            console.log(" THE RESPONSE IS " , response);
            setBlog(response);
            setLoading(false);
          
        }).catch(error=> {
            console.log("couldn't fetch blog info");
            setError("Couldn't fetch blog info, error occured");
            setLoading(false);
        })
        
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
            setHaveAccess(false);
            
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
                alert("error occured");
                setError("Couldn't mint NFT, error occured");
                console.log("the error is " , error)
                theme.setShadowLoading(false);
                setHaveAccess(false);
               })
            }}>
                Buy blog's NFT
            </button>
            


        <div className="flex items-center flex-col mt-[10%]" >
            <p className="italic"> Or if you do have an nft, please type your NFT id in here:</p>
            <NftInput className="mt-5" />
        </div>
            

        </div>

        </div>


        
        }

        {loading == false && have_access == true && 
        <div>
            <LoadContent provider={provider} blogAddress={blogAddress.current} />
        </div>
        }

{loading == false && error == "Couldn't verify your ownership, error occured" && (
    <div className="w-full mt-10 flex flex-col justify-center items-center font-semibold text-center">
        <div>
            You seem to not possess the NFT for this blogpost, please change/buy your NFT to get access.
        </div>
        
        <div>
           
            <button className="ml-5 mt-5 bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline" onClick={(e)=>{
                setError("");
            }}>
                Change NFT
            </button>


           
            
        </div>

        {/* <div className="flex items-center flex-col mt-[10%]" >
            <p className="italic"> If this doesn't work, please type your NFT id in here:</p>
            <NftInput className="mt-5" />
        </div> */}
    </div>
)}

    </div></>
}

export default BlogCheckout;
