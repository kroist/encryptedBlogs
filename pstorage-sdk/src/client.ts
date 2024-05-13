import axios, { AxiosInstance } from 'axios';
import { shamirCombine, shamirShare } from './shamir';
import { webcrypto } from "crypto";
import { decryptWithKey, encryptWithKey, genKey } from './crypto';

const hexToString = (data: Uint8Array) => Buffer.from(data).toString('hex');

export class Pnode {
  private client: AxiosInstance;

  constructor(
    baseURL: string
  ) {
    this.client = axios.create({
      baseURL
    });
  }

  public async store(data: string): Promise<string> {
    let response = await this.client.post('/store', {data});
    return response.data.cid;
  }

  public async retrieve_past(cid: string): Promise<string> {
    let response = await this.client.get('/retrieve', {params: {cid}});
    return response.data.data;
  }
  /*
 const {cid, key} = await getKeyAndCidFromBlockchain(
    blockchainParams,
    data.blog_id,
    data.nft_id,
    data.relayer_id,
    data.caller,
    data.nonce,
    data.signature
  );
  */
  public async retrieve(blog_addr: string, nft_id : string, relayer_id,  caller, nonce, signature): Promise<string> {
    console.log("We Are in retrieve \n");
    console.log(blog_addr , nft_id , relayer_id , caller , nonce , signature)
    
    let response = await this.client.post('/retrieve_decrypt', {
      blog_addr : blog_addr,
      nft_id : String(nft_id),
      relayer_id : relayer_id,
      caller : caller,
      nonce : String(nonce),
      signature : signature
    });
    return response.data.dataDecr;
  }
  
  public async getPubKey(contract_addr : string): Promise<Uint8Array> {
    let response = await this.client.get(`/pubkey?contract=${contract_addr}`);
    console.log(" RESPONSE IS " , response.data.pubkey);
    return response.data.pubkey;
  }
}

export class PnodeClient {
  private nodes: Pnode[];

  constructor(nodeURLS: string[]) {
    let nodes: Pnode[] = [];
    for (let nodeURL of nodeURLS) {
      nodes.push(new Pnode(nodeURL));
    }
    this.nodes = nodes;
  }

  public async store(data: string): Promise<string[]> {
    let shares = await shamirShare(data, this.nodes.length);
    let cids = [];
    for (let i = 0; i < shares.length; i++) {
      cids.push(await this.nodes[i].store(shares[i]));
    }
    return cids;
  }

  public async storeEncrypted(data: string, pkeys: webcrypto.CryptoKey[]) {
    console.log("DATA IS " , data);
    let shares = await shamirShare(data, this.nodes.length);
    let cids = [];
    for (let i = 0; i < shares.length; i++) {
      let encr = await encryptWithKey(shares[i], pkeys[i]);
      cids.push(await this.nodes[i].store(encr));
    }
    return cids;
  }

  public async retrieve_past(cids: string[]): Promise<string> {
    let shares = [];
    for (let i = 0; i < cids.length; i++) {
      shares.push(await this.nodes[i].retrieve_past(cids[i]));
    }
    return await shamirCombine(shares);
  }

  public async retrieve(blog_addr: string, nft_id : string, caller, nonces, signatures): Promise<string> {
    let shares = [];
    for (let i = 0; i < signatures.length; i++) {
      shares.push(await this.nodes[i].retrieve(blog_addr, nft_id, i, caller, nonces[i], signatures[i]));
    }
    console.log(" SHARES ARE " , shares);
    return await shamirCombine(shares);
  }

  public async retrieveEncrypted(cids: string[], pkeys: webcrypto.CryptoKey[]): Promise<string> {
    let shares = [];
    for (let i = 0; i < cids.length; i++) {
      shares.push(await decryptWithKey(
        await this.nodes[i].retrieve_past(cids[i]),
        pkeys[i],
      ));
    }
    return await shamirCombine(shares);
  }

  public async getPubKeys(contract_addr : string): Promise<Uint8Array[]> {
    let pubkeys: Uint8Array[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
      pubkeys.push(await this.nodes[i].getPubKey(contract_addr));
    }
    
    // let response = await this.client.get('/pubkey');
    return pubkeys;
  }
}