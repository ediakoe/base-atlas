import { describe, it, expect } from "vitest";
import { getWalletAge } from "./walletAge";

describe("getWalletAge", () => {
  it("enforces a minimum of 30 estimated days", () => {
    const result = getWalletAge(0, 0, 0);
    expect(result.days).toBe((30).toLocaleString());
    // 30 / 365 < 1 -> months: round(30/365 * 12) = 1
    expect(result.years).toBe("≈ 1 Months");
  });

  it("weights balance, tokens and nfts into the day estimate", () => {
    // 2 * 50 + 3 * 10 + 4 * 5 = 100 + 30 + 20 = 150 days
    const result = getWalletAge(2, 3, 4);
    expect(result.days).toBe((150).toLocaleString());
    // 150 / 365 < 1 -> months: round(150/365 * 12) = 5
    expect(result.years).toBe("≈ 5 Months");
  });

  it("formats large day counts with locale separators", () => {
    // 40 * 50 = 2000 days
    const result = getWalletAge(40, 0, 0);
    expect(result.days).toBe((2000).toLocaleString());
  });

  it("renders years when the estimate is at least one year", () => {
    // 10 * 50 = 500 days -> 500 / 365 = 1.37 years -> "≈ 1.4 Years"
    const result = getWalletAge(10, 0, 0);
    expect(result.years).toBe("≈ 1.4 Years");
  });

  it("rounds the day estimate to a whole number", () => {
    // 0.111 * 50 = 5.55, but minimum floor of 30 applies
    expect(getWalletAge(0.111, 0, 0).days).toBe((30).toLocaleString());
    // 1.111 * 50 = 55.55 -> round -> 56
    expect(getWalletAge(1.111, 0, 0).days).toBe((56).toLocaleString());
  });
});
