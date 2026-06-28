type Profile = {
  balance: number;
  tokens: number;
  nfts: number;
};

export function calculateAtlasScore(profile: Profile) {
  const balanceScore = Math.min(profile.balance * 40, 400);

  const tokenScore = Math.min(profile.tokens * 8, 300);

  const nftScore = Math.min(profile.nfts * 5, 300);

  return Math.round(
    balanceScore +
    tokenScore +
    nftScore
  );
}

export function getArchetype(profile: Profile) {
  if (profile.nfts > profile.tokens && profile.nfts > 20) {
    return "Collector";
  }

  if (profile.tokens > 20) {
    return "DeFi Explorer";
  }

  if (profile.balance > 1) {
    return "Whale";
  }

  return "Early User";
}