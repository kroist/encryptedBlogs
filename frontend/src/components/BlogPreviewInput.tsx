import React, { useState } from 'react';

function BlogPreviewInput({author, setAuthor, headline, setHeadline, description, setDescription, price, setPrice}) {
  
  return (
    <div className="w-full flex justify-between" >
    <div className="max-w-md mt-10" style={{maxWidth: '350px', width: '50%'}}>
      <div className="mb-5">
        <label htmlFor="headline" className="block text-sm font-medium text-gray-700">Public View    Headline</label>
        <input
          type="text"
          id="headline"
          name="headline"
          value={headline}
          onChange={e => setHeadline(e.target.value)}
          placeholder="Enter the blog headline"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Public View    Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter the blog description"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </div>


    <div className="ml-5 max-w-md mt-10">
        <label htmlFor="headline" className="block text-m font-medium text-gray-700">Sub price in <strong> ZAMA </strong></label>
            <input
              type="number"
              id="headline"
              name="headline"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="20"
              className=" mt-1 text-m block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m"
            />
        
        
        
        <label htmlFor="headline" className="block text-m font-medium text-gray-700 mt-5">Author</label>
            <input
              type="text"
              id="headline"
              name="headline"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Author Name"
              className=" mt-1 text-m block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-m"
            />
    </div>

    </div>
  );
}

export default BlogPreviewInput;