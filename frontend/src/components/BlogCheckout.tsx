import React, {useEffect, useState, useRef} from 'react';
import {useLocation} from 'react-router-dom'
// You could also move this to a CSS module for better maintainability
import Loading from './Loading.tsx'
import { nftPosession } from '../hooks/useLogin.tsx';
import {getNftByContract} from '../hooks/storage.tsx'
import BlogPostPreview from './BlogPostPreview.tsx' 
import useCustomSDK from '../hooks/useCustomSDK.tsx'
function BlogCheckout() {
    const [loading, setLoading] = useState(true);
    const [loadingCaption, setLoadingCaption] = useState("Loading blog info...");
    const [have_access, setHaveAccess] = useState(false);
    const location = useLocation();
    const blogAddress = useRef();

    const firstTime = useRef(false);

    const [error, setError] = useState("");

    const { sdk, connected, connecting, provider, chainId, ready } = useCustomSDK();
  
    useEffect(() => {
        
        if(!provider || !firstTime || firstTime.current == true){
            return;
        }
        firstTime.current = true;
        // Extract the path segment after '/blog/'
        const pathParts = location.pathname.split('/'); // This splits the path by '/'
        // Assuming the structure is /blog/:id, `id` should be at index 2
        blogAddress.current = pathParts[2];
        
        console.log('Blog ID:', blogId); // This should log 'fkasdjflz' or whatever the id is

        setLoadingCaption("Checking access...");
        const current_nft = getNftByContract(blogAddress.current);
        nftPosession(provider, blogAddress.current, current_nft).then(response=>{
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
    }, [location, firstTime]);

    return <>
        {
            <Loading loading={loading} caption={loadingCaption}/>    
        }
        {!loading && !have_access && 
        <div>
            
        <BlogPostPreview blog={blog}/>

        <button>
            Buy access
        </button>

        </div>
        }

        {loading == false && have_access == true && 
        <div>
            We should try to load content here
        </div>
        }

        {loading == false && <div>
            Error occured! {error}
        </div>}

    </>
}

export default BlogCheckout;
