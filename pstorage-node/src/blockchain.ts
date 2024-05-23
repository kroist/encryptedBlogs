import { ethers } from 'ethers';
import { FHEBlogFactory__factory } from './types/factories/FHEBlogFactory__factory.js';

import { createInstance, FhevmInstance, getPublicKeyCallParams } from 'fhevmjs/node';
import { FHE_BLOG__factory } from './types/factories/FHE_BLOG__factory.js';
import { FHE_BLOGCrutch__factory } from './types/factories/FHE_BLOGCrutch__factory.js';
import { parseKey } from './crypto.js';
import bs58 from 'bs58'
const factoryAddress = '0xB195B2D00f8B6DD5EA2DbB667d24Af74ceA53127';

class BlockchainParams {
  signer: ethers.Signer;
  provider: ethers.Provider;
  fhevmInstance: FhevmInstance;
}

export async function initBlockchain(privateKey: string): Promise<BlockchainParams> {
  const signer = new ethers.BaseWallet(new ethers.SigningKey(privateKey));

  const provider = new ethers.JsonRpcProvider("https://devnet.zama.ai");
  const fhevmInstance = await createFhevmInstance(factoryAddress, signer, provider);
  return {
    signer,
    provider,
    fhevmInstance,
  };
}


export const generatePublicKey = async (contractAddress: string, signer: ethers.Signer, instance: FhevmInstance) => {
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

const encodeToIpfsHash = (hexInput) => {
    // Convert the hexadecimal string back to a byte array (Buffer)
    const cleanHex = hexInput.startsWith('0x') ? hexInput.slice(2) : hexInput;
   
    
    const buffer = Buffer.from(cleanHex, 'hex');
    // Encode the byte array using Base58
    const encoded = bs58.encode(buffer);
    return encoded;
}
export async function getKeyAndCidFromBlockchainCrutch(
  params: BlockchainParams,
  blogAddress: string,
  nft_id: ethers.BigNumberish,
  relayer_id: ethers.BigNumberish,
  caller: ethers.AddressLike,
  nonce: ethers.BigNumberish,
  signature: Uint8Array
){
  const blog = FHE_BLOGCrutch__factory.connect(blogAddress, params.provider);


  await generatePublicKey(blogAddress, params.signer, params.fhevmInstance);


  console.log("SENDING it ");
  const {p} = await blog.generateJwt(
    nft_id,
    relayer_id,
    caller,
    nonce,
    signature,
  );

  console.log(" GOT IT ", p );
  const cid = await blog.getCid(relayer_id);


  let normal_cid = encodeToIpfsHash(cid);
  
  console.log("GOT CID " , cid , " WTF " , normal_cid);
  const k1: bigint = p[0];
  const k2: bigint = p[1];

  return {
    cid: normal_cid,
    key: await parseKey(k1, k2)
  }
}

function bytesToBigInt(hexString) {
  // Remove '0x' prefix if present
  hexString = hexString.startsWith('0x') ? hexString.slice(2) : hexString;

  // Convert hex string to buffer
  const buffer = Buffer.from(hexString, 'hex');

  // Convert buffer to BigInt
  const bigIntValue = BigInt('0x' + buffer.toString('hex'));

  return bigIntValue;
}

export async function getKeyAndCidFromBlockchain(
  params: BlockchainParams,
  blogAddress: string,
  nft_id: ethers.BigNumberish,
  relayer_id: ethers.BigNumberish,
  caller: ethers.AddressLike,
  nonce: ethers.BigNumberish,
  signature: Uint8Array
) {

  // const fheBlogFactory = FHEBlogFactory__factory.connect(
  //   factoryAddress,
  //   params.provider
  // );
  // const blogCount = await fheBlogFactory.blogsCount();
  
  // if (blog_id >= blogCount) {
  //   throw new Error('Blog does not exist');
  // }

  // const blogAddress = await fheBlogFactory.blogs(blog_id);

  const blog = FHE_BLOG__factory.connect(blogAddress, params.provider);


  await generatePublicKey(blogAddress, params.signer, params.fhevmInstance);

  const {p} = await blog.generateJwt(
    nft_id,
    relayer_id,
    caller,
    nonce,
    signature,
  );

  const cid = await blog.getCid(relayer_id);
  let normal_cid = encodeToIpfsHash(cid);
  

  console.log("P are ", p);

  console.log("direct transform ", bytesToBigInt(p[0]), " k2 is ", bytesToBigInt(p[1]));


  // return; 
  const k1: bigint = await params.fhevmInstance.decrypt(blogAddress, p[0]);
  const k2: bigint = await params.fhevmInstance.decrypt(blogAddress, p[1]);



  console.log("k1 is ", k1, " k2 is ", k2);


  return {
    cid : normal_cid,
    key: await parseKey(k1, k2)
  }

}

// Use the provider for blockchain operations
// ...