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
// const thing = await import("pstoragesdk/features/client");
// const PnodeClient = thing.PnodeClient
// import sdk_client from "pstoragesdk/features/client"
// import sdk_crypto from "pstoragesdk/features/crypto"

// const {PnodeClient} = sdk_client;




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



const relayers = ["http://localhost:3001", "http://localhost:3002"]

const factoryAddress = '0xB125C346f66166B3b5DbC3EDDe89dDa9f486bc85';

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

    let keys: ethers.BytesLike[][] = []; 
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
        const cids = await new_client.storeEncrypted(text, not_serialized_keys);

        const fheBlogFactory = FHEBlogFactory__factory.connect(
            factoryAddress,
            signer
        );
        const val = await fheBlogFactory.blogsCount();
        alert("VAL IS " + val);

        return;
        const predict_addr = await fheBlogFactory.getBlogAddress(randomSalt);

        console.log( " PREDICT " , predict_addr);
        let blog_address = predict_addr;

        const pubkeys = await new_client.getPubKeys(predict_addr);

        const txDeploy = await createTransaction(
            fheBlogFactory["createBlog((bytes[],bytes[][],bytes32[]),string,string,bytes32)"],
            {
                cid: cids,
                p: keys,
                publicKey: pubkeys
            },  
            'FHE_BLOG',
            'FHBL',
            randomSalt
          );
        await txDeploy.wait();
        
        console.log("deployed");
        console.log()
        return blog_address;
       
    }catch(error){
        console.log("error " , error);
    }

}



export const getText = async(metamask_provider, blog_address)=>{

    let provider = normalizeProvider(metamask_provider);
    const new_client = new PnodeClient(relayers);
    console.log(" FHE BLOG " , blog_address);
    const fheBlog = FHE_BLOG__factory.connect(
        blog_address,
        provider
    );

    const nft = await fheBlog.s_tokenCounter();
    await fheBlog.mintNft();

    const is_owner = (await fheBlog.ownerOf(nft)) == provider;

    alert("TRUE IF YOU ARE OWNER OF NFT " + is_owner);


    return;
}


export const createTransaction = async <A extends [...{ [I in keyof A]-?: A[I] | Typed }]>(
    method: TypedContractMethod<A>,
    ...params: A
  ) => {
    const gasLimit = await method.estimateGas(...params);
    const updatedParams: ContractMethodArgs<A> = [
      ...params,
      { gasLimit: 10000000 },
    ];
    return method(...updatedParams);
};
