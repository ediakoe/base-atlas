const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

if (!ALCHEMY_KEY) {
  console.warn("VITE_ALCHEMY_API_KEY is not set. Add it to your .env file.");
}

// ✅ URL درست
const ALCHEMY_URL = import.meta.env.DEV
  ? `/alchemy-rpc/v2/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const ALCHEMY_NFT_URL = import.meta.env.DEV
  ? `/alchemy-nft/nft/v3/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`;

export type TokenHolding = {
  symbol: string;
  balance: string;
  contractAddress: string;
};

export type LastTransaction = {
  hash: string;
  from: string;
  to: string;
  value: string;
  asset: string;
  category: string;
  timeStamp: string;
};

export type TransactionStats = {
  totalTransactions: number;
  lastActivity: string;
  lastTransaction?: LastTransaction;
};

export type WalletAgeData = {
  days: string;
  years: string;
  firstActivity: string;
};

export async function alchemyRpc(method: string, params: unknown[], id = 1) {
  const res = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
  });
  if (!res.ok) throw new Error(`Alchemy RPC error: ${res.status}`);
  const json = await res.json();
  if (json.error) {
    throw new Error(`Alchemy RPC error: ${json.error.message}`);
  }
  return json;
}

export async function getWalletBalance(address: string): Promise<string> {
  const data = await alchemyRpc("eth_getBalance", [address, "latest"], 1);
  const balanceWei = BigInt(data.result || 0);
  const eth = Number(balanceWei) / 1e18;
  return eth.toFixed(4);
}

export async function getTokenCount(address: string): Promise<number> {
  const data = await alchemyRpc("alchemy_getTokenBalances", [address], 2);
  if (!data.result?.tokenBalances) return 0;
  return data.result.tokenBalances.filter(
    (t: any) => t.tokenBalance && t.tokenBalance !== "0x0"
  ).length;
}

export async function getNFTCount(address: string): Promise<number> {
  try {
    const res = await fetch(
      `${ALCHEMY_NFT_URL}/getNFTsForOwner?owner=${address}&withMetadata=false`
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.totalCount ?? data.ownedNfts?.length ?? 0;
  } catch {
    return 0;
  }
}

export async function getTopTokens(address: string): Promise<TokenHolding[]> {
  const data = await alchemyRpc("alchemy_getTokenBalances", [address], 3);
  const balances = data.result?.tokenBalances || [];

  const nonZero = balances
    .filter((t: any) => t.tokenBalance && t.tokenBalance !== "0x0")
    .slice(0, 5);

  const requests = nonZero.map(async (token: any, index: number) => {
    try {
      const meta = await alchemyRpc(
        "alchemy_getTokenMetadata",
        [token.contractAddress],
        100 + index
      );

      const decimals = meta.result?.decimals ?? 18;
      const symbol = meta.result?.symbol || "UNKNOWN";

      const rawBalance = BigInt(token.tokenBalance || "0x0");
      const realBalance = Number(rawBalance) / Math.pow(10, decimals);

      const formatted =
        realBalance < 0.001
          ? realBalance.toExponential(2)
          : realBalance.toLocaleString("en-US", { maximumFractionDigits: 4 });

      return {
        symbol,
        balance: formatted,
        contractAddress: token.contractAddress,
      };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(requests);
  return results.filter((t): t is TokenHolding => t !== null);
}

export async function getWalletAge(address: string): Promise<WalletAgeData> {
  try {
    const data = await alchemyRpc(
      "alchemy_getAssetTransfers",
      [
        {
          fromBlock: "0x0",
          toBlock: "latest",
          fromAddress: address,
          category: ["external", "erc20", "erc721", "erc1155"],
          maxCount: "0x1",
          order: "asc",
          withMetadata: true,
        },
      ],
      5
    );

    const transfers = data.result?.transfers;
    if (!transfers?.length) {
      return { days: "New Wallet", years: "", firstActivity: "" };
    }

    const firstDate = new Date(transfers[0].metadata.blockTimestamp);
    const diffDays = Math.floor((Date.now() - firstDate.getTime()) / 86400000);

    return {
      days: diffDays.toLocaleString(),
      years: `≈ ${(diffDays / 365).toFixed(1)} Years`,
      firstActivity: firstDate.toLocaleDateString(),
    };
  } catch {
    return { days: "Unknown", years: "", firstActivity: "" };
  }
}

export async function getTransactionStats(
  address: string
): Promise<TransactionStats> {
  try {
    const countData = await alchemyRpc(
      "eth_getTransactionCount",
      [address, "latest"],
      10
    );
    const totalTransactions = countData.result
      ? parseInt(countData.result, 16)
      : 0;

    const [sentData, recvData] = await Promise.all([
      alchemyRpc(
        "alchemy_getAssetTransfers",
        [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            fromAddress: address,
            category: ["external", "erc20", "erc721", "erc1155"],
            maxCount: "0xa",
            order: "desc",
            withMetadata: true,
          },
        ],
        11
      ),
      alchemyRpc(
        "alchemy_getAssetTransfers",
        [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            toAddress: address,
            category: ["external", "erc20", "erc721", "erc1155"],
            maxCount: "0xa",
            order: "desc",
            withMetadata: true,
          },
        ],
        12
      ),
    ]);

    const allTransfers = [
      ...(sentData.result?.transfers || []),
      ...(recvData.result?.transfers || []),
    ];

    let lastActivity = "No Activity";
    let lastTransaction: LastTransaction | undefined = undefined;

    if (allTransfers.length > 0) {
      allTransfers.sort(
        (a, b) =>
          new Date(b.metadata.blockTimestamp).getTime() -
          new Date(a.metadata.blockTimestamp).getTime()
      );

      const tx = allTransfers[0];
      const ts = new Date(tx.metadata.blockTimestamp);
      lastActivity = ts.toLocaleDateString();

      lastTransaction = {
        hash: tx.hash,
        from: tx.from,
        to: tx.to || "",
        value: tx.value != null ? Number(tx.value).toFixed(6) : "0",
        asset: tx.asset || "ETH",
        category: tx.category || "",
        timeStamp: Math.floor(ts.getTime() / 1000).toString(),
      };
    }

    return { totalTransactions, lastActivity, lastTransaction };
  } catch (err) {
    console.error("Transaction Stats Error:", err);
    return {
      totalTransactions: 0,
      lastActivity: "Error",
      lastTransaction: undefined,
    };
  }
}