const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

if (!ALCHEMY_KEY) {
  console.warn("VITE_ALCHEMY_API_KEY is not set. Add it to your .env file.");
}

const ALCHEMY_URL = `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

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
  asset: string; // واحد دارایی واقعی: ETH, USDC, ...
  category: string; // نوع واقعی: external, erc20, erc721, erc1155
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

// helper مشترک برای فراخوانی JSON-RPC
async function alchemyRpc(method: string, params: unknown[], id = 1) {
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
      `https://base-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}/getNFTsForOwner?owner=${address}&withMetadata=false`
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
      return {
        symbol: meta.result?.symbol || "UNKNOWN",
        balance: "Holding",
        contractAddress: token.contractAddress,
      };
    } catch {
      return {
        symbol: "UNKNOWN",
        balance: "Holding",
        contractAddress: token.contractAddress,
      };
    }
  });

  return Promise.all(requests);
}

export async function getWalletAge(address: string): Promise<WalletAgeData> {
  // مستقیماً از Alchemy می‌خوانیم چون BaseScan در مرورگر CORS دارد
  return getWalletAgeFromAlchemy(address);
}

async function getWalletAgeFromAlchemy(
  address: string
): Promise<WalletAgeData> {
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
    // 1) تعداد کل تراکنش‌های ارسالی (nonce) - داده واقعی از RPC
    const countData = await alchemyRpc(
      "eth_getTransactionCount",
      [address, "latest"],
      10
    );
    const totalTransactions = countData.result
      ? parseInt(countData.result, 16)
      : 0;

    // 2) آخرین تراکنش از طریق getAssetTransfers (هم ارسالی هم دریافتی)
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
      // جدیدترین تراکنش بر اساس زمان واقعی بلاک
      allTransfers.sort(
        (a, b) =>
          new Date(b.metadata.blockTimestamp).getTime() -
          new Date(a.metadata.blockTimestamp).getTime()
      );

      const tx = allTransfers[0];
      const ts = new Date(tx.metadata.blockTimestamp);
      lastActivity = ts.toLocaleDateString();

      // فقط داده‌های واقعی برگردانده می‌شوند (فیلدهای فیک حذف شدند)
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
