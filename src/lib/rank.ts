export function getWalletRank(score: number) {
  const rank = Math.max(
    1,
    Math.round(10000 - score * 8)
  );

  const percentile = Math.min(
    99,
    Math.max(1, Math.round(score / 10))
  );

  return {
    rank,
    percentile,
  };
}