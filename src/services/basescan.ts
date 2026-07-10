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

  if (!res.ok) {
    throw new Error(`Basescan Error ${res.status}`);
  }

  const data = await res.json();

  // Etherscan returns HTTP 200 with status "0" for errors (rate limits,
  // invalid address, ...) and puts a string in `result`. Guard against
  // treating that string's length as a transaction count.
  if (data.status === "0" && !Array.isArray(data.result)) {
    throw new Error(
      `Basescan Error: ${data.message || data.result || "Unknown error"}`
    );
  }

  return Array.isArray(data.result) ? data.result.length : 0;
}
