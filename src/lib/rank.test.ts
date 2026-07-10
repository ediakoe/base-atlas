import { describe, it, expect } from "vitest";
import { getWalletRank } from "./rank";

describe("getWalletRank", () => {
  it("computes rank and percentile for a mid-range score", () => {
    // rank: 10000 - 500 * 8 = 6000, percentile: 500 / 10 = 50
    expect(getWalletRank(500)).toEqual({ rank: 6000, percentile: 50 });
  });

  it("returns the best rank of 1 for a zero score", () => {
    // rank: 10000 - 0 = 10000, percentile clamps to min of 1
    expect(getWalletRank(0)).toEqual({ rank: 10000, percentile: 1 });
  });

  it("clamps rank to a minimum of 1 for very high scores", () => {
    // rank would be 10000 - 2000 * 8 = -6000, clamped to 1
    expect(getWalletRank(2000).rank).toBe(1);
  });

  it("clamps percentile to a maximum of 99", () => {
    // percentile would be 2000 / 10 = 200, clamped to 99
    expect(getWalletRank(2000).percentile).toBe(99);
  });

  it("rounds fractional rank and percentile values", () => {
    // rank: round(10000 - 123 * 8) = 9016, percentile: round(123 / 10) = 12
    expect(getWalletRank(123)).toEqual({ rank: 9016, percentile: 12 });
  });
});
