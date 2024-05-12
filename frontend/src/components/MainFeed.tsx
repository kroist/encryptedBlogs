import React from 'react'
import {Link} from 'react-router-dom'
import BlogPostReview from './BlogPostPreview.tsx';
import Loading from './Loading.tsx'
import useFetchBlogs from '../hooks/useFetchBlogs.tsx';
import Feed from './Feed.tsx';

const MainFeed = () => {
    
    const [blogs, error, fetchBlogs, loading] = useFetchBlogs();
 
    return <Feed blogs={blogs} error={error} loading={loading}/>
}

export default MainFeed;