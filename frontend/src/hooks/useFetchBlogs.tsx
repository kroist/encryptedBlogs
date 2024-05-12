import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {BIN_ID}  from './publicPreview.tsx'

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState("");
    const [loading , setLoading] = useState(false);
    const fetchBlogs = async ()=>{
        setError("");
        setLoading(true);
        try{
            const info = (await axios.get(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`))?.data;
            
            const bin = info.record;
            setBlogs(bin.blogPreviews);
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