const ALCHEMY_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

const ALCHEMY_URL = import.meta.env.DEV
  ? `/alchemy-rpc/v2/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const ALCHEMY_NFT_URL = import.meta.env.DEV
  ? `/alchemy-nft/nft/v3/${ALCHEMY_KEY}`
  : `https://base-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_KEY}`;

const MISSING_KEY_MESSAGE =
  "Missing Alchemy API key. Set VITE_ALCHEMY_API_KEY in your environment.";

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
  if (!ALCHEMY_KEY) {
    throw new Error(MISSING_KEY_MESSAGE);
  }

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

  const data = await res.json();

  // A JSON-RPC endpoint can return HTTP 200 while carrying an error in the
  // body. Surface it instead of letting callers treat a missing `result` as
  // valid data.
  if (data.error) {
    const message =
      typeof data.error === "object" && data.error?.message
        ? data.error.message
        : String(data.error);

    throw new Error(`Alchemy RPC Error: ${message}`);
  }

  return data;
}

export async function getWalletBalance(
  address: string
): Promise<string> {
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
}

export async function getWalletAge(
  address: string
): Promise<string> {
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
    return "No History";
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
    return "Unknown";
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

  if (days < 30) {
    return `${days} Days`;
  }

  if (days < 365) {
    return `${Math.floor(
      days / 30
    )} Months`;
  }

  return `${(
    days / 365
  ).toFixed(1)} Years`;
}

export async function getNFTCount(
  address: string
): Promise<number> {
  if (!ALCHEMY_KEY) {
    throw new Error(MISSING_KEY_MESSAGE);
  }

  const res = await fetch(
    `${ALCHEMY_NFT_URL}/getNFTsForOwner?owner=${address}&withMetadata=false`
  );

  if (!res.ok) {
    throw new Error(`Alchemy NFT Error ${res.status}`);
  }

  const data = await res.json();

  return (
    data.totalCount ??
    data.ownedNfts?.length ??
    0
  );
}

export async function getTokenCount(): Promise<number> {
  return 0;
}

export async function getTopTokens(): Promise<TokenHolding[]> {
  return [];
}
