export function shortenAddress(
  address: string,
  prefix = 6,
  suffix = 4
): string {
  return `${address.slice(0, prefix)}...${address.slice(-suffix)}`;
}
