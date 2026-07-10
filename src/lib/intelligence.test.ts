import { describe, it, expect } from "vitest";
import { getIntelligenceSummary } from "./intelligence";

describe("getIntelligenceSummary", () => {
  it("returns Base Power User when balance and tokens are both high", () => {
    expect(getIntelligenceSummary(6, 26, 0).title).toBe("Base Power User");
  });

  it("requires both balance and tokens thresholds for Base Power User", () => {
    // high balance but not enough tokens
    expect(getIntelligenceSummary(6, 25, 0).title).not.toBe("Base Power User");
    // enough tokens but balance not high enough
    expect(getIntelligenceSummary(5, 26, 0).title).not.toBe("Base Power User");
  });

  it("returns NFT Collector when nfts exceed 20 and power-user rule misses", () => {
    expect(getIntelligenceSummary(0, 0, 21).title).toBe("NFT Collector");
  });

  it("returns DeFi Explorer when tokens exceed 15 without other matches", () => {
    expect(getIntelligenceSummary(0, 16, 0).title).toBe("DeFi Explorer");
  });

  it("returns Early Participant as the default fallback", () => {
    expect(getIntelligenceSummary(0, 0, 0).title).toBe("Early Participant");
  });

  it("includes a non-empty summary for each classification", () => {
    const cases: Array<[number, number, number]> = [
      [6, 26, 0],
      [0, 0, 21],
      [0, 16, 0],
      [0, 0, 0],
    ];
    for (const [balance, tokens, nfts] of cases) {
      const result = getIntelligenceSummary(balance, tokens, nfts);
      expect(result.summary.length).toBeGreaterThan(0);
    }
  });
});
