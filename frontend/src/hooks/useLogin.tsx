import { ContractMethodArgs, ethers } from "ethers";

// Import just a few select items
import { BrowserProvider, parseUnits } from "ethers";

// Import from a specific export
import { HDNodeWallet } from "ethers/wallet";
import { FHEBlogFactory__factory } from "../types/factories/FHEBlogFactory__factory.ts";
import { FHE_BLOG__factory } from "../types/factories/FHE_BLOG__factory.ts";
import "pstoragesdk";
import "pstoragesdk/crypto";

import { TypedContractMethod } from "../types/common";
// import { createInstance, FhevmInstance, getPublicKeyCallParams } from 'fhevmjs';

export let signer;
export let provider;

export const tryLogin = async ()=>{

    if (window.ethereum == null) {

        // If MetaMask is not installed, we use the default provider,
        // which is backed by a variety of third-party services (such
        // as INFURA). They do not have private keys installed,
        // so they only have read-only access
        console.log("MetaMask not installed; using read-only defaults")
        provider = ethers.getDefaultProvider()

    } else {

        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        provider = new ethers.BrowserProvider(window.ethereum)

        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        signer = await provider.getSigner();
    }
}


const relayers = ["http://localhost:3001", "http://localhost:3002"]

const factoryAddress = '0x.....';

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

export const sendText = async(text)=>{

    // const instance = await createFhevmInstance(factoryAddress, signer, provider);
    /// is this good anyway?

    

    const new_client = new PnodeClient(relayers);

    let not_serialized_keys = await Promise.all([genKey(), genKey()]); // p
  
    let keys : ethers.BytesLike[][] = [
        await instance.encrypt64(serializeKey(not_serialized_keys[0])),
        await instance.encrypt64(serializeKey(not_serialized_keys[1]))
    ]
    
    // generate array of random Uint8
    let randomSalt = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        randomSalt[i] = Math.floor(Math.random() * 256);
    }

    try{
        const cids = await new_client.storeEncrypted(text, keys);

        const fheBlogFactory = FHEBlogFactory__factory.connect(
            factoryAddress,
            provider
        );

        const predict_addr = await fheBlogFactory.getBlogAddress(randomSalt);

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


       
    }catch(error){
        console.log("error " , error);
    }

}

export const getText = async()=>{
    const new_client = new PnodeClient(relayers);

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
