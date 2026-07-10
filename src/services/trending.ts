import { shortenAddress } from "../lib/address";
import { alchemyRpc } from "./alchemy";

export type TrendingWallet = {
  address: string;
  shortAddress: string;
  totalTransactions: number;
  signal: string;
};

const SEED_WALLETS = [
  "0x4200000000000000000000000000000000000006",
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "0x3304E22DDaa22bCdC5fCa2269b418046aE7b566A",
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
];

async function getTransactionCount(address: string): Promise<number> {
  try {
    const data = await alchemyRpc(
      "eth_getTransactionCount",
      [address, "latest"],
      Math.floor(Math.random() * 1000)
    );
    return data.result ? parseInt(data.result, 16) : 0;
  } catch {
    return 0;
  }
}

function getSignal(txCount: number): string {
  if (txCount > 100000) return "Mega Active Wallet";
  if (txCount > 10000) return "High Activity";
  if (txCount > 1000) return "Active Wallet";
  return "Growing Wallet";
}

export async function getTrendingWallets(): Promise<TrendingWallet[]> {
  const results = await Promise.all(
    SEED_WALLETS.map(async (address) => {
      const totalTransactions = await getTransactionCount(address);
      return {
        address,
        shortAddress: shortenAddress(address),
        totalTransactions,
        signal: getSignal(totalTransactions),
      };
    })
  );

  return results.sort((a, b) => b.totalTransactions - a.totalTransactions);
}