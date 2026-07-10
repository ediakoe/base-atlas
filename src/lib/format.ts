export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString();
}

export function formatUsd(value: number): string {
  return `$${formatNumber(value)}`;
}
