import { webcrypto } from "crypto-browserify";
const subtle = webcrypto.subtle;

function toUint8Array(str) {
  return new Uint8Array(str.split('').map(c => c.charCodeAt(0)));
}
function fromUint8Array(uint8array) {
  return new TextDecoder().decode(uint8array);
}

const hexToUint8Array = (data: string) => Uint8Array.from(Buffer.from(data, 'hex'));
const hexToString = (data: Uint8Array) => Buffer.from(data).toString('hex');

export async function genKey(): Promise<webcrypto.CryptoKey> {
  let key = await subtle.generateKey(
    {
      name: "AES-GCM",
      length: 128,
    },
    true,
    ["encrypt", "decrypt"],
  );
  return key;
}

export async function serializeKey(key: webcrypto.CryptoKey): Promise<[bigint, bigint]> {
  let buff = await subtle.exportKey('raw', key);
  let arr = new BigInt64Array(buff);
  let k1 = arr[0];
  let k2 = arr[1];
  return [k1, k2];
}

export async function encryptWithKey(input: string, key: webcrypto.CryptoKey) {
  let encryption = new Uint8Array(await subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    toUint8Array(input),
  ));
  return hexToString(encryption);
}

export async function decryptWithKey(input: string, key: webcrypto.CryptoKey) {
  let ciphertext = hexToUint8Array(input);
  let msgUint8Arr = await subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(12),
    },
    key,
    ciphertext
  );
  return fromUint8Array(new Uint8Array(msgUint8Arr));
}
