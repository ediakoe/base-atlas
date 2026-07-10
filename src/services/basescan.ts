import { isValidAddress } from "../lib/address";

const API_KEY = import.meta.env.VITE_BASESCAN_API_KEY;

export async function getTransactionCount(address: string) {
  if (!isValidAddress(address)) {
    throw new Error("Invalid wallet address");
  }

  const url =
    `https://api.etherscan.io/v2/api` +
    `?chainid=8453` +
    `&module=account` +
    `&action=txlist` +
    `&address=${encodeURIComponent(address)}` +
    `&startblock=0` +
    `&endblock=99999999` +
    `&sort=asc` +
    `&apikey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.result?.length || 0;
}
