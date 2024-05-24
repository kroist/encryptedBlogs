import React, {useState} from 'react';
import {addNft, removeNft} from '../hooks/storage.tsx'
const NftInput = ({className, address, retry}) => {
    const [nftId, setNftId] = useState('');
    return (
        <div className={`flex justify-center items-center ${className ? className : ""}`}>
            <div className="flex space-x-2">
                <input 
                    type="text" 
                    value={nftId}
                    onChange={(e)=>setNftId(e.target.value)}
                    placeholder="Enter your NFT id" 
                    className="px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600" onClick={(e)=>{
                   removeNft(address);
                   addNft(address, nftId);
                   retry();
                }}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default NftInput;
