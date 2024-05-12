import express, { Application, Request, Response } from 'express';
import { create, CID } from 'kubo-rpc-client';
import { pipe } from 'it-pipe';
import toBuffer from 'it-to-buffer'
import { extract } from 'it-tar'
import map from 'it-map'
import all from 'it-all';
import { decryptWithKey, parseKey } from './crypto.js';
import { getKeyAndCidFromBlockchain, initBlockchain, generatePublicKey } from './blockchain.js';
import cors from 'cors'

let cid = CID.parse('QmSnuWmxptJZdLJpKRarxBMS2Ju2oANVrgbr2xWbie9b2D');
console.log(cid);
console.log(cid.toV1());

// let cid2 = CID.parse('QmdmQXB2mzChmMeKY47C43LxUdg1NDJ5MWcKMKxDu7RgQm');
// console.log(cid2);
// console.log(cid2.bytes);

const app: Application = express();
if (process.argv.length < 3) {
  console.log('specify port!');
  process.exit(1);
}
const port = process.argv[2];

if (process.argv.length < 4) {
  console.log('specify private key!')
  process.exit(1);
}

console.log('read');
const blockchainParams = await initBlockchain(process.argv[3]);
// await readBlockchain(blockchainParams);

app.use(express.json({limit: '50mb'}));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true // Allow any origin and specifically allow http://localhost:3000
  })
);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World with TypeScript!');
});


async function * tarballed (source) {
  yield * pipe(
    source,
    extract(),
    async function * (source) {
      for await (const entry of source) {
        yield {
          ...entry,
          body: await toBuffer(map(entry.body, (buf) => buf.slice()))
        }
      }
    }
  )
}

app.get('/retrieve', async (req: Request, res: Response) => {
  const cid = req.query.cid as string;
  const client = create({ url: 'http://127.0.0.1:5001/api/v0' });
  const unparsedData = ((await pipe(
    await client.get(CID.parse(cid)),
    tarballed,
    (source) => all(source)
  ))[0]).body;
  const data = new TextDecoder('utf-8').decode(unparsedData);
  res.send({data});
});

app.post('/retrieve_decrypt', async (req: Request, res: Response) => {
  const data = req.body.data;
  const {cid, key} = await getKeyAndCidFromBlockchain(
    blockchainParams,
    data.blog_id,
    data.nft_id,
    data.relayer_id,
    data.caller,
    data.nonce,
    data.signature
  );

  const client = create({ url: 'http://127.0.0.1:5001/api/v0' });
  const unparsedData = ((await pipe(
    await client.get(CID.parse(cid)),
    tarballed,
    (source) => all(source)
  ))[0]).body;
  const dataEncr = new TextDecoder('utf-8').decode(unparsedData);
  const dataDecr = await decryptWithKey(
    dataEncr,
    key
  );
  res.send({dataDecr});
});

app.post('/store', async (req: Request, res: Response) => {
  const data = req.body.data;
  const client = create({ url: 'http://127.0.0.1:5001/api/v0' });
  const parsedData = new TextEncoder().encode(data);
  const { cid } = await client.add(parsedData);
  res.send({
    cid: cid.toString()
  });
});

app.get('/pubkey', async (req: Request, res: Response) => {
  let contract : string = String(req.query.contract);

  await generatePublicKey(contract, blockchainParams.signer, blockchainParams.fhevmInstance);
  // console.log(" contract is " , contract);
  // console.log(" instance " ,blockchainParams.fhevmInstance);
  console.log(" pub key " , blockchainParams.fhevmInstance.getPublicKey(contract).publicKey)
  res.send({
    pubkey: Array.from(blockchainParams.fhevmInstance.getPublicKey(
      contract
    ).publicKey)
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
