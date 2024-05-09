import { webcrypto } from "crypto";
const subtle = webcrypto.subtle;

function toUint8Array(str) {
  return new Uint8Array(str.split('').map(c => c.charCodeAt(0)));
}
function fromUint8Array(uint8array) {
  return new TextDecoder().decode(uint8array);
}

const hexToUint8Array = (data: string) => Uint8Array.from(Buffer.from(data, 'hex'));
const hexToString = (data: Uint8Array) => Buffer.from(data).toString('hex');

export async function parseKey(k1: bigint, k2: bigint) {
  let arr = new BigInt64Array([k1, k2]);
  let key = await subtle.importKey('raw', arr, 'AES-GCM', true, ['encrypt', 'decrypt']);
  return key;
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
