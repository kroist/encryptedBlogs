import React from 'react'
import {Link} from 'react-router-dom'
import BlogPostReview from './BlogPostPreview.tsx';
import Loading from './Loading.tsx'
import useFetchBlogs from '../hooks/useFetchBlogs.tsx';
import Feed from './Feed.tsx';
import { getAvailableBlogAdresses } from '../hooks/storage.tsx';
const MyFeed = () => {
    const filter = (blogs)=>{
        const get = getAvailableBlogAdresses();
        
        return blogs.filter(blog=> get.includes(blog.address));
    }
    const [blogs, error, fetchBlogs, loading] = useFetchBlogs(filter);
 
    return <Feed blogs={blogs} error={error} loading={loading}/>
}

export default MyFeed;