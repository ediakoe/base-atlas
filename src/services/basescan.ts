const API_KEY = "6VUWRR1RM79576SRN1Y4V1HG6TUUANNW8X";

export async function getTransactionCount(address: string) {
  const url =
    `https://api.etherscan.io/v2/api` +
    `?chainid=8453` +
    `&module=account` +
    `&action=txlist` +
    `&address=${address}` +
    `&startblock=0` +
    `&endblock=99999999` +
    `&sort=asc` +
    `&apikey=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.result?.length || 0;
}