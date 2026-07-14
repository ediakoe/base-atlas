const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const ALCHEMY_URL = import.meta.env.DEV
  ? `/alchemy-rpc/v2/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const ALCHEMY_NFT_URL = import.meta.env.DEV
  ? `/alchemy-nft/nft/v3/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`;

export interface TokenHolding {
  symbol: string;
  balance: string;
  contractAddress: string;
}

export async function alchemyRpc(
  method: string,
  params: unknown[],
  id = 1
) {
  const res = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id,
      method,
      params,
    }),
  });

  if (!res.ok) {
    throw new Error(`Alchemy RPC Error ${res.status}`);
  }

  return res.json();
}

export async function getWalletBalance(
  address: string
): Promise<string> {
  try {
    const data = await alchemyRpc(
      "eth_getBalance",
      [address, "latest"]
    );

    const balanceWei = BigInt(
      data.result || "0x0"
    );

    return (
      Number(balanceWei) / 1e18
    ).toFixed(4);
  } catch (error) {
    console.error(
      "Balance Error:",
      error
    );

    return "0";
  }
}

export async function getWalletAge(
  address: string
): Promise<{ label: string; days: number; since: string }> {
  try {
    const incoming = await alchemyRpc(
      "alchemy_getAssetTransfers",
      [
        {
          fromBlock: "0x0",
          toAddress: address,
          category: [
            "external",
            "erc20",
            "erc721",
            "erc1155",
          ],
          maxCount: "0x1",
          order: "asc",
        },
      ],
      99
    );

    const outgoing = await alchemyRpc(
      "alchemy_getAssetTransfers",
      [
        {
          fromBlock: "0x0",
          fromAddress: address,
          category: [
            "external",
            "erc20",
            "erc721",
            "erc1155",
          ],
          maxCount: "0x1",
          order: "asc",
        },
      ],
      100
    );

    const transfers = [
      ...(incoming.result?.transfers || []),
      ...(outgoing.result?.transfers || []),
    ];

    if (transfers.length === 0) {
      return { label: "No History", days: 0, since: "—" };
    }

    let earliestTransfer = transfers[0];

    for (const transfer of transfers) {
      if (
        parseInt(transfer.blockNum, 16) <
        parseInt(
          earliestTransfer.blockNum,
          16
        )
      ) {
        earliestTransfer = transfer;
      }
    }

    const blockData =
      await alchemyRpc(
        "eth_getBlockByNumber",
        [
          earliestTransfer.blockNum,
          false,
        ],
        101
      );

    if (!blockData.result?.timestamp) {
      return { label: "Unknown", days: 0, since: "—" };
    }

    const timestamp =
      parseInt(
        blockData.result.timestamp,
        16
      ) * 1000;

    const ageMs =
      Date.now() - timestamp;

    const days = Math.floor(
      ageMs / 86400000
    );

    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 30;

    let label = "";
    if (years > 0) {
      label = `${years}y ${months}m`;
    } else if (months > 0) {
      label = `${months}m ${remainingDays}d`;
    } else {
      label = `${days}d`;
    }

    const sinceDate = new Date(timestamp);
    const since = sinceDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    return { label, days, since };
  } catch (error) {
    console.error(
      "Wallet Age Error:",
      error
    );

    return { label: "Unknown", days: 0, since: "—" };
  }
}

export async function getNFTCount(
  address: string
): Promise<number> {
  try {
    const res = await fetch(
      `${ALCHEMY_NFT_URL}/getNFTsForOwner?owner=${address}&withMetadata=false`
    );

    if (!res.ok) {
      return 0;
    }

    const data = await res.json();

    return (
      data.totalCount ||
      data.ownedNfts?.length ||
      0
    );
  } catch (error) {
    console.error(
      "NFT Error:",
      error
    );

    return 0;
  }
}

export async function getTokenCount(): Promise<number> {
  return 0;
}

export async function getTopTokens(): Promise<TokenHolding[]> {
  return [];
}