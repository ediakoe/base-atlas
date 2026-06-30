export function getIntelligenceSummary(
  balance: number,
  tokens: number,
  nfts: number
) {
  if (balance > 5 && tokens > 25) {
    return {
      title: "Base Power User",
      summary:
        "High conviction participant with strong capital allocation and broad ecosystem exposure.",
    };
  }

  if (nfts > 20) {
    return {
      title: "NFT Collector",
      summary:
        "Strong collector profile with meaningful participation in Base NFT communities.",
    };
  }

  if (tokens > 15) {
    return {
      title: "DeFi Explorer",
      summary:
        "Actively exploring protocols with diversified token exposure across the ecosystem.",
    };
  }

  return {
    title: "Early Participant",
    summary:
      "Still building onchain reputation with significant room for growth.",
  };
}