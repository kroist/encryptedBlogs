import React, {useEffect, useState} from 'react'
import axios, { all } from 'axios'
import {BIN_ID, getCurrentPublicView}  from './publicPreview.tsx'

const useFetchBlogs = (filter = null) => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [loading , setLoading] = useState(false);
    const fetchBlogs = async ()=>{
        setError("");
        setLoading(true);
        try{

            const all_blogs = await getCurrentPublicView();
            console.log("all blogs are " , all_blogs);
            if(filter && filter != null){
                setBlogs(filter(all_blogs));
            }else{
                setBlogs(all_blogs);
            }
        }catch(error){
            console.log("error while fetching blogs " , error);
            setError(error);
        }
        
        setLoading(false);
    }
    useEffect(()=>{
        console.log("started fetching")
        fetchBlogs();
    }, [])


    return [blogs, error, fetchBlogs, loading];
}

export default useFetchBlogs;