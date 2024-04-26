import { combine, split } from 'shamir-secret-sharing';

const toUint8Array = (data: string) => Uint8Array.from(Buffer.from(data, 'hex'));
const toString = (data: Uint8Array) => Buffer.from(data).toString('hex');

export async function shamirShare(input: string, nShares: number): Promise<string[]> {
  const secret = toUint8Array(input);
  const shares = await split(secret, nShares, nShares);
  return shares.map(toString);
}

export async function shamirCombine(shares: string[]): Promise<string> {
  const reconstructed = await combine(shares.map(toUint8Array));
  return toString(reconstructed);
}