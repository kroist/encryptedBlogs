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


    
    const loadContent = async(blog_addr)=>{
        const saved_nft = getNftByContract(blog_addr)[0].nft;
        const raw_content = await requestAccess(provider , blog_addr, saved_nft, setCaption);
        let in_char = fromHexToString(raw_content);

        let with_images = in_char;
        console.log(" THE CONTENT IS " , in_char);

        setContent(in_char);
        setReady(true);
        setLoading(false);
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
        {ready && 
        <div  style={{ maxWidth: '820px' , width: '90vw', minHeight: '90vh'}} className="border-l border-r border-gray-300" >
        
            <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} />

        </div>
        }
    </>
}

export default LoadContent;
