export function getWalletAge(
  balance: number,
  tokens: number,
  nfts: number
) {
  const estimatedDays = Math.max(
    30,
    Math.round(
      balance * 50 +
      tokens * 10 +
      nfts * 5
    )
  );

  const years = estimatedDays / 365;

  return {
    days: estimatedDays.toLocaleString(),
    years:
      years >= 1
        ? `≈ ${years.toFixed(1)} Years`
        : `≈ ${Math.round(years * 12)} Months`,
  };
}