export type WalletProfile = {
  trader: number;
  farmer: number;
  collector: number;
  builder: number;
  defi: number;
};

export function calculateAtlasScore(profile: WalletProfile) {
  return Math.round(
    profile.trader * 0.25 +
      profile.farmer * 0.3 +
      profile.collector * 0.15 +
      profile.builder * 0.1 +
      profile.defi * 0.2
  );
}

export function getArchetype(profile: WalletProfile) {
  const entries = Object.entries(profile);

  const highest = entries.sort((a, b) => b[1] - a[1])[0][0];

  switch (highest) {
    case "farmer":
      return "Alpha Farmer";

    case "trader":
      return "Active Trader";

    case "collector":
      return "Collector";

    case "builder":
      return "Builder";

    case "defi":
      return "DeFi Power User";

    default:
      return "Explorer";
  }
}