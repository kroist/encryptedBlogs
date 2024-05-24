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
import MDEditor from '@uiw/react-md-editor';
import {requestAccess} from '../hooks/useLogin.tsx'
import {changeToNormal} from '../hooks/digestContent.tsx'

const fromHexToString = (hexString)=>{
    const text = Buffer.from(hexString, 'hex').toString('utf-8');
    return text;
}
function LoadContent({provider, blogAddress}) {
    const [loading , setLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const [content, setContent] = useState('');
    const firstTime = useRef(false);
    const [caption, setCaption] = useState('You have a blog nft, requesting access...');

    const [error, setError] = useState("");
    
    const loadContent = async(blog_addr)=>{
        const saved_nft = getNftByContract(blog_addr)[0].nft;
        try{
            const raw_content = await requestAccess(provider , blog_addr, saved_nft, setCaption);
            let in_char = fromHexToString(raw_content);

            let with_images = in_char;
            console.log(" THE CONTENT IS " , in_char);

            setContent(in_char);
            setReady(true);
            setLoading(false);
        }catch(error){
            setLoading(false);
            setReady(true);
            setError("Couldn't fetch blog info, error occured");
        }
    }
    useEffect(()=>{
        if(!firstTime || firstTime.current == true){
            return;
        }
        if(provider){
            firstTime.current = true;
            loadContent(blogAddress);
        }
    }, [provider, firstTime]);
    return <> 

        <Loading loading={loading} caption={caption}/>
        {ready && error == '' &&
        <div  style={{ maxWidth: '820px' , width: '90vw', minHeight: '90vh'}} className="border-l border-r border-gray-300" >
        
            <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />

        </div>
        }
        {ready && error != '' &&
        
        <div className="flex items-center flex-col mt-[10%]" >
        <p className="italic"> {error}</p>
        <button className="bg-black mt-5 text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
        onClick={()=>window.location.reload()}

        > Try again </button>
    </div> }
    </>
}

export default LoadContent;
