import { shamirCombine, shamirShare } from "./shamir";

import * as mocha from 'mocha';
import * as chai from 'chai';

describe('shamir ss', async () => {
    it('should share', async () => {
      const textHex = Buffer.from('1234asdasd', 'utf-8').toString('hex');
      const shares = await shamirShare(textHex, 3);
      chai.expect(shares.length).to.equal(3);
    });
    it('should combine', async () => {
      const text = '1234asdasd';
      const textHex = Buffer.from(text, 'utf-8').toString('hex');
      const shares = await shamirShare(textHex, 3);
      const recombinedHex = await shamirCombine(shares);
      const recombined = Buffer.from(recombinedHex, 'hex').toString();
      chai.expect(recombined).to.equal(text);
    });
    it('should combine long text', async () => {
      let text = '1';
      for (let i = 0; i < 20; i++) {
        text = text + text;
      }
      chai.expect(text.length).to.eq(1<<20);
      const textHex = Buffer.from(text, 'utf-8').toString('hex');
      const shares = await shamirShare(textHex, 3);
      const recombinedHex = await shamirCombine(shares);
      const recombined = Buffer.from(recombinedHex, 'hex').toString();
      chai.expect(recombined).to.equal(text);
    }).timeout(15000);
});