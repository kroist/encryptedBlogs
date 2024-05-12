import React from 'react';

// You could also move this to a CSS module for better maintainability

function BlogPostPreview({blog}) {
    return <div className="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md" style={{minWidth: '40vw'}}>
            <div className="flex justify-between items-center">
                <span className="font-light text-gray-600">{blog && blog.date}</span>
                {
                    blog?.tag && <a className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">{blog && blog.tag}</a>
                }
            </div>

            <div className="mt-2">
                <a className="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">{blog && blog.headline}</a>
                <p className="mt-2 text-gray-600">{blog && blog.description}</p>
            </div>
            
            <div className="flex justify-between items-center mt-4">
                <a className="text-blue-600 hover:underline" href={`/blog/${blog?.address}`}>Read more</a>
                <div>
                    <a className="flex items-center" href="#">
                        
                        <h1 className="text-gray-700 font-bold">{blog && blog.author}</h1>
                    </a>
                </div>
            </div>
        </div>;
}

export default BlogPostPreview;
