import { ContractMethodArgs, ethers } from "ethers";
import { SDKProvider } from '@metamask/sdk-react-ui'
// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";
import { FHEBlogFactory__factory } from "../types/factories/FHEBlogFactory__factory.ts";
import { FHE_BLOG__factory } from "../types/factories/FHE_BLOG__factory.ts";
// import "pstoragesdk";

import { TypedContractMethod } from "../types/common";
import { createInstance, FhevmInstance, getPublicKeyCallParams, initFhevm} from 'fhevmjs';
import {PnodeClient} from "pstoragesdk";
import {genKey, serializeKey} from "pstoragesdk";
import bs58 from 'bs58';
const { BigNumber } = require('ethers');
// const thing = await import("pstoragesdk/features/client");
// const PnodeClient = thing.PnodeClient
// import sdk_client from "pstoragesdk/features/client"
// import sdk_crypto from "pstoragesdk/features/crypto"

// const {PnodeClient} = sdk_client;


const decodeIpfsHash = (input)=>{
    const bytes = bs58.decode(input);
      // Convert the Uint8Array to a string to display it
      // Using Buffer to convert Uint8Array to a readable string (optional)
    const result = Buffer.from(bytes).toString('hex');
    return result;
}

const addChaing = async()=>{

    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
              chainId: '0x1F49',
              chainName: 'Zama Network',
              rpcUrls: ['https://devnet.zama.ai'],
              blockExplorerUrls: ['https://main.explorer.zama.ai'],
              nativeCurrency: {
                decimals: 18,
                name: 'ZAMA',
                symbol: 'ZAMA',
              },
            },
          ]
      })
    
}

const changeChain = ()=>{
    return
}

export const normalizeProvider = (metamaskProvider: SDKProvider)=>{
    return new BrowserProvider(metamaskProvider as any);
}

export const initFHE = async (metamaskProvider: SDKProvider) => {
    let provider = new BrowserProvider(metamaskProvider as any)

    console.log("hey there " , await provider.getNetwork());
    
    // provider = new BrowserProvider((metamaskProvider as any));
    await initFhevm() // Load TFHE
    const fhevmInstance = await createFhevmInstance(factoryAddress, await provider.getSigner(), provider);
    
    
    const encrypted = await fhevmInstance.encrypt64(12351235);

    console.log("encrytped shit " , encrypted);


    return fhevmInstance;
}



const relayers = ["http://localhost:3002", "http://localhost:3003"]

const factoryAddress = '0x2d31186A1Cae2Bf56dfC3076ef6B90a39bF6bdd9';
// const factoryAddress = '0x4Fa39D4AfaB4d1ed2179Fe9637EEF5aAE2598D93';
const generatePublicKey = async (contractAddress: string, signer: ethers.Signer, instance: FhevmInstance) => {
    // Generate token to decrypt
    const generatedToken = instance.generatePublicKey({
      verifyingContract: contractAddress,
    });
    // Sign the public key
    const signature = await signer.signTypedData(
      generatedToken.eip712.domain,
      { Reencrypt: generatedToken.eip712.types.Reencrypt }, // Need to remove EIP712Domain from types
      generatedToken.eip712.message,
    );
    instance.setSignature(contractAddress, signature);
};
  
export const createFhevmInstance = async (contractAddress: string, account: ethers.Signer, provider: ethers.Provider) => {
    // 1. Get chain id
  
    const network = await provider.getNetwork();

    console.log("NETWORK IS " , network);


    const chainId = +network.chainId.toString(); // Need to be a number
    let publicKey;
    try {
      // Get blockchain public key
      const ret = await provider.call(getPublicKeyCallParams());
      const decoded = ethers.AbiCoder.defaultAbiCoder().decode(['bytes'], ret);
      publicKey = decoded[0];
    } catch (e) {
      publicKey = undefined;
    }
  
    const instance = await createInstance({ chainId, publicKey });
  
    await generatePublicKey(contractAddress, account, instance);
  
    return instance;
};


const stringToHex = (str) => {
    return str.split('').map((char) => {
      return char.charCodeAt(0).toString(16).padStart(2, '0');
    }).join('');
  };


const addZero = (input) : any => {
    if (Array.isArray(input)) {
      // If the input is an array, map through it and prefix each element
      return input.map(str => '0x' + str);
    } else {
      // If it's a single string, just add '0x' to the front
      return '0x' + input;
    }
  }
  
export const sendText = async(text, instance, metamask_provider)=>{
    

    const res = await instance.encrypt64(12351);

    console.log("sendText encryption is working " , res);
    let provider = normalizeProvider(metamask_provider);
    let signer = await provider.getSigner();
    console.log("signer is " , await provider.getNetwork())
    console.log("signer is " , await signer.getAddress());


    const new_client = new PnodeClient(relayers);
  
    let not_serialized_keys = await Promise.all([genKey(), genKey()]); // p
  

    console.log("the keys are " , not_serialized_keys);
    console.log("afetr serialization " , await serializeKey(not_serialized_keys[0]));

    let cnt_relayers = relayers.length;

    let keys: [ethers.BytesLike, ethers.BytesLike][] = [];
    for(let i = 0; i < cnt_relayers; i += 1){
        let serialized_key = await serializeKey(not_serialized_keys[i]);
        keys.push([
            await instance.encrypt64(serialized_key[0]),
            await instance.encrypt64(serialized_key[1])
        ]);
    }


    
    // generate array of random Uint8
    let randomSalt = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        randomSalt[i] = Math.floor(Math.random() * 256);
    }
    try{
        const cids : any[] = await new_client.storeEncrypted(stringToHex(text), not_serialized_keys);

        const fheBlogFactory = FHEBlogFactory__factory.connect(
            factoryAddress,
            signer
        );
      
        const predict_addr = await fheBlogFactory.getBlogAddress(randomSalt);


        let bytes32_cids : string[] = [];
        for(let cid of cids){
            bytes32_cids.push(
                addZero(decodeIpfsHash(cid))
            );
        }
        console.log( " PREDICT " , predict_addr, " lol " , bytes32_cids);
        let blog_address = predict_addr;

        const pubkeys = await new_client.getPubKeys(predict_addr);
        const transformed_keys: Uint8Array[] = [];
        for(let i = 0; i < pubkeys.length; i += 1){
            transformed_keys.push(new Uint8Array(pubkeys[i]));
        }

        console.log("PUB KEYS ARE" , " ", pubkeys);
        
        // const txDeploy = await createTransaction(
        //     fheBlogFactory["createBlog((bytes[],bytes[][],bytes32[]),string,string,bytes32)"],
        //     {
        //         cid: bytes32_cids,
        //         p: keys,
        //         publicKey: transformed_keys
        //     },  
        //     'FHE_BLOG',
        //     'FHBL',
        //     randomSalt
        //   );

        console.log(keys);

        const txDeploy = await fheBlogFactory["createBlog((bytes[],bytes[2][],bytes32[]),string,string,bytes32)"](
          {
              cid: bytes32_cids,
              p: keys,
              publicKey: transformed_keys
          },  
          'FHE_BLOG',
          'FHBL',
          randomSalt,
          {
            gasLimit: 10000000
          }
        );
        await txDeploy.wait();
        
        console.log("deployed");
        console.log()
        return blog_address;
       
    }catch(error){
        console.log("error " , error);
    }

}



export const nftPosession = async (metamask_provider, blog_address, nft)=>{
    let provider = normalizeProvider(metamask_provider);
    let signer = await provider.getSigner();
    const fheBlog = FHE_BLOG__factory.connect(
        blog_address,
        signer
    );

    const owner = await fheBlog.ownerOf(nft)
    const is_owner = owner == (await signer.getAddress());

    console.log(`NFT number ${nft}, owner is ${owner}, you're ${is_owner ? 'the owner' : 'not the owner'}`);
    return is_owner;
}

export const mintNft = async(metamask_provider, blog_address)=>{

    let provider = normalizeProvider(metamask_provider);
    let signer = await provider.getSigner();
    const new_client = new PnodeClient(relayers);
    console.log(" FHE BLOG " , blog_address);
    const fheBlog = FHE_BLOG__factory.connect(
        blog_address,
        signer
    );

    const nft = await fheBlog.s_tokenCounter();
    await fheBlog.mintNft();

    return nft;
}


export const createTransaction = async <A extends [...{ [I in keyof A]-?: A[I] | Typed }]>(
    method: TypedContractMethod<A>,
    ...params: A
  ) => {
    // const gasLimit = await method.estimateGas(...params);

    // console.log("GAS LIMIT IS " , gasLimit);
    const updatedParams: ContractMethodArgs<A> = [
      ...params,
      { gasLimit: 10000000 },
    ];
    return method(...updatedParams);
};
