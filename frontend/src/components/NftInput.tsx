import React from 'react';

const NftInput = ({className}) => {
    return (
        <div className={`flex justify-center items-center ${className ? className : ""}`}>
            <div className="flex space-x-2">
                <input 
                    type="text" 
                    placeholder="Enter your NFT id" 
                    className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    Add
                </button>
            </div>
        </div>
    );
};

export default NftInput;
