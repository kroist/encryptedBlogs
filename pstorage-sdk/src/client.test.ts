import { PnodeClient } from "./client";

import * as mocha from 'mocha';
import * as chai from 'chai';
import { genKey } from "./crypto";

describe('pnode client', async () => {

  it('should send shares', async () => {
    const client = new PnodeClient(
      [
        'http://127.0.0.1:3002',
        'http://127.0.0.1:3003',
      ]
    )
    const textHex = Buffer.from('1234asdasd', 'utf-8').toString('hex');
    await client.store(textHex);
  }).timeout(60000);
  it('should retrieve shares', async () => {
    const client = new PnodeClient(
      [
        'http://127.0.0.1:3002',
        'http://127.0.0.1:3003',
      ],
    )
    const text = '1234asdasd';
    const textHex = Buffer.from(text, 'utf-8').toString('hex');
    const shares = await client.store(textHex);
    const retrieveHex = await client.retrieve(shares);
    const retrieve = Buffer.from(retrieveHex, 'hex').toString();
    chai.expect(retrieve).to.equal(text);
  }).timeout(60000);
  it('should retrieve big', async () => {
    const client = new PnodeClient(
      [
        'http://127.0.0.1:3002',
        'http://127.0.0.1:3003',
      ]
    )
    let text = '1';
    for (let i = 0; i < 20; i++) {
      text = text + text;
    }
    chai.expect(text.length).to.eq(1<<20);
    const textHex = Buffer.from(text, 'utf-8').toString('hex');
    const shares = await client.store(textHex);
    const retrieveHex = await client.retrieve(shares);
    const retrieve = Buffer.from(retrieveHex, 'hex').toString();
    chai.expect(retrieve).to.equal(text);
  }).timeout(60000);
});