import React from 'react'
import {Link} from 'react-router-dom'
import BlogPostReview from './BlogPostPreview.tsx';
import Loading from './Loading.tsx'
const Feed = ({blogs, error, loading}) => {


    return (

    <div className="flex flex-col items-center w-full">
        {blogs == undefined || blogs.length == 0 ? (
            loading ? <Loading loading={loading} /> :
        <div className="mt-5">
                No blogs found
            </div>) : 
        <div style={{maxWidth: '1080px'}}>
            {blogs.map((blog, index) => (
            <BlogPostReview blog={blog} />  
            ))}
        </div>
        }


        {error && <div className="text-red-500 text-lg font-bold">{error}</div>}
    </div>
    )
}

export default Feed;