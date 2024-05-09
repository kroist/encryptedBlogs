import { ethers } from 'ethers';
import { FHEBlogFactory__factory } from './types/factories/FHEBlogFactory__factory.js';
import { createInstance, FhevmInstance, getPublicKeyCallParams } from 'fhevmjs/node';
import { FHE_BLOG__factory } from './types/factories/FHE_BLOG__factory.js';
import { parseKey } from './crypto.js';

const factoryAddress = '0x294bf3D0323E38A04210C75Eb2D7Eaf7c92C7862';

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

export async function getKeyAndCidFromBlockchain(
  params: BlockchainParams,
  blog_id: bigint,
  nft_id: ethers.BigNumberish,
  relayer_id: ethers.BigNumberish,
  caller: ethers.AddressLike,
  nonce: ethers.BigNumberish,
  signature: Uint8Array
) {

  const fheBlogFactory = FHEBlogFactory__factory.connect(
    factoryAddress,
    params.provider
  );
  const blogCount = await fheBlogFactory.blogsCount();
  
  if (blog_id >= blogCount) {
    throw new Error('Blog does not exist');
  }

  const blogAddress = await fheBlogFactory.blogs(blog_id);

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

  const k1: bigint = await params.fhevmInstance.decrypt(factoryAddress, p[0]);
  const k2: bigint = await params.fhevmInstance.decrypt(factoryAddress, p[1]);

  return {
    cid,
    key: await parseKey(k1, k2)
  }

}

// Use the provider for blockchain operations
// ...