import { describe, it, expect } from "vitest";
import { calculateAtlasScore, getArchetype } from "./atlasScore";

describe("calculateAtlasScore", () => {
  it("returns 0 for an empty profile", () => {
    expect(
      calculateAtlasScore({ balance: 0, tokens: 0, nfts: 0 })
    ).toBe(0);
  });

  it("sums the weighted balance, token and nft components", () => {
    // balance: 1 * 40 = 40, tokens: 2 * 8 = 16, nfts: 3 * 5 = 15
    expect(
      calculateAtlasScore({ balance: 1, tokens: 2, nfts: 3 })
    ).toBe(71);
  });

  it("caps the balance component at 400", () => {
    // balance would be 1000 * 40 = 40000, capped to 400
    expect(
      calculateAtlasScore({ balance: 1000, tokens: 0, nfts: 0 })
    ).toBe(400);
  });

  it("caps the token component at 300", () => {
    // tokens would be 100 * 8 = 800, capped to 300
    expect(
      calculateAtlasScore({ balance: 0, tokens: 100, nfts: 0 })
    ).toBe(300);
  });

  it("caps the nft component at 300", () => {
    // nfts would be 100 * 5 = 500, capped to 300
    expect(
      calculateAtlasScore({ balance: 0, tokens: 0, nfts: 100 })
    ).toBe(300);
  });

  it("caps all three components simultaneously at the max of 1000", () => {
    expect(
      calculateAtlasScore({ balance: 1000, tokens: 1000, nfts: 1000 })
    ).toBe(1000);
  });

  it("rounds the final score to the nearest integer", () => {
    // balance: 0.111 * 40 = 4.44 -> rounds to 4
    expect(
      calculateAtlasScore({ balance: 0.111, tokens: 0, nfts: 0 })
    ).toBe(4);
  });
});

describe("getArchetype", () => {
  it("returns Collector when nfts dominate and exceed 20", () => {
    expect(
      getArchetype({ balance: 0, tokens: 5, nfts: 30 })
    ).toBe("Collector");
  });

  it("does not return Collector when nfts are not greater than tokens", () => {
    expect(
      getArchetype({ balance: 0, tokens: 30, nfts: 25 })
    ).toBe("DeFi Explorer");
  });

  it("does not return Collector when nfts are 20 or fewer", () => {
    expect(
      getArchetype({ balance: 0, tokens: 5, nfts: 20 })
    ).toBe("Early User");
  });

  it("returns DeFi Explorer when tokens exceed 20", () => {
    expect(
      getArchetype({ balance: 0, tokens: 21, nfts: 0 })
    ).toBe("DeFi Explorer");
  });

  it("returns Whale when balance exceeds 1 and other rules do not match", () => {
    expect(
      getArchetype({ balance: 2, tokens: 5, nfts: 5 })
    ).toBe("Whale");
  });

  it("returns Early User as the default fallback", () => {
    expect(
      getArchetype({ balance: 0.5, tokens: 1, nfts: 1 })
    ).toBe("Early User");
  });
});
