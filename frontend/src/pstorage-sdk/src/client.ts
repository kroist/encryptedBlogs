import axios, { AxiosInstance } from 'axios';
import { shamirCombine, shamirShare } from './shamir';
import { webcrypto } from "crypto-browserify";
import { decryptWithKey, encryptWithKey, genKey } from './crypto';

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

  public async retrieve(cid: string): Promise<string> {
    let response = await this.client.get('/retrieve', {params: {cid}});
    return response.data.data;
  }

  public async getPubKey(): Promise<string> {
    let response = await this.client.get('/pubkey');
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
    let shares = await shamirShare(data, this.nodes.length);
    let cids = [];
    for (let i = 0; i < shares.length; i++) {
      let encr = await encryptWithKey(shares[i], pkeys[i]);
      cids.push(await this.nodes[i].store(encr));
    }
    return cids;
  }

  public async retrieve(cids: string[]): Promise<string> {
    let shares = [];
    for (let i = 0; i < cids.length; i++) {
      shares.push(await this.nodes[i].retrieve(cids[i]));
    }
    return await shamirCombine(shares);
  }

  public async retrieveEncrypted(cids: string[], pkeys: webcrypto.CryptoKey[]): Promise<string> {
    let shares = [];
    for (let i = 0; i < cids.length; i++) {
      shares.push(await decryptWithKey(
        await this.nodes[i].retrieve(cids[i]),
        pkeys[i],
      ));
    }
    return await shamirCombine(shares);
  }

  public async getPubKeys(): Promise<string[]> {
    let pubkeys: string[] = [];
    for (let i = 0; i < this.nodes.length; i++) {
      pubkeys.push(await this.nodes[i].getPubKey());
    }
    // let response = await this.client.get('/pubkey');
    return pubkeys;
  }
}