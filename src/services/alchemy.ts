const ALCHEMY_URL =
  "https://base-mainnet.g.alchemy.com/v2/OZteITa8V_tkEObX_mo4a";

export async function getWalletBalance(address: string) {
  const res = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [address, "latest"],
    }),
  });

  const data = await res.json();

  const balanceWei = BigInt(data.result);

  return (Number(balanceWei) / 1e18).toFixed(4);
}

export async function getTokenCount(address: string) {
  const res = await fetch(ALCHEMY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "alchemy_getTokenBalances",
      params: [address],
    }),
  });

  const data = await res.json();

  if (!data.result?.tokenBalances) {
    return 0;
  }

  return data.result.tokenBalances.filter(
    (token: { tokenBalance: string }) =>
      token.tokenBalance !== "0x0"
  ).length;
}

export async function getNFTCount(address: string) {
  const res = await fetch(
    `https://base-mainnet.g.alchemy.com/nft/v3/OZteITa8V_tkEObX_mo4a/getNFTsForOwner?owner=${address}`
  );

  const data = await res.json();

  return data.ownedNfts?.length || 0;
}