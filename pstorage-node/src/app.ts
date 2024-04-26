import express, { Application, Request, Response } from 'express';
import { create, CID } from 'kubo-rpc-client';
import { pipe } from 'it-pipe';
import toBuffer from 'it-to-buffer'
import { extract } from 'it-tar'
import map from 'it-map'
import all from 'it-all';

const app: Application = express();
if (process.argv.length < 3) {
  console.log('specify port!');
  process.exit(1);
}
const port = process.argv[2];

app.use(express.json({limit: '50mb'}));

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

app.post('/store', async (req: Request, res: Response) => {
  const data = req.body.data;
  const client = create({ url: 'http://127.0.0.1:5001/api/v0' });
  const parsedData = new TextEncoder().encode(data);
  const { cid } = await client.add(parsedData);
  res.send({
    cid: cid.toString()
  });
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
