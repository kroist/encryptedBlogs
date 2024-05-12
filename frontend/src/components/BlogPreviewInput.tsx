import React, { useState } from 'react';

function BlogPreviewInput({headline, setHeadline, description, setDescription}) {
  
  return (
    <div className="w-full " >
    <div className="max-w-md mt-10">
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
    </div>
  );
}

export default BlogPreviewInput;