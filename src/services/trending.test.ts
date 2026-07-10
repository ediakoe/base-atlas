import { describe, it, expect, vi, beforeEach } from "vitest";
import { alchemyRpc } from "./alchemy";
import { getTrendingWallets } from "./trending";

vi.mock("./alchemy", () => ({
  alchemyRpc: vi.fn(),
}));

const alchemyRpcMock = vi.mocked(alchemyRpc);

beforeEach(() => {
  alchemyRpcMock.mockReset();
});

describe("getTrendingWallets", () => {
  it("returns one entry per seed wallet with derived fields", async () => {
    alchemyRpcMock.mockResolvedValue({ result: "0x1" });
    const wallets = await getTrendingWallets();

    expect(wallets).toHaveLength(5);
    for (const wallet of wallets) {
      expect(wallet.shortAddress).toMatch(/^0x[0-9a-fA-F]{4}\.\.\.[0-9a-fA-F]{4}$/);
      expect(wallet.totalTransactions).toBe(1);
    }
  });

  it("parses hex transaction counts and sorts descending", async () => {
    // Return increasing counts per call so ordering is verifiable.
    const counts = ["0x1", "0xa", "0x64", "0x2710", "0x186a1"];
    let call = 0;
    alchemyRpcMock.mockImplementation(async () => ({
      result: counts[call++],
    }));

    const wallets = await getTrendingWallets();
    const totals = wallets.map((w) => w.totalTransactions);

    expect(totals).toEqual([100001, 10000, 100, 10, 1]);
    // sorted strictly descending
    expect([...totals].sort((a, b) => b - a)).toEqual(totals);
  });

  it("maps transaction counts to the correct activity signal", async () => {
    const counts = ["0x186a1", "0x2711", "0x3e9", "0x1", "0x0"];
    // 100001, 10001, 1001, 1, 0
    let call = 0;
    alchemyRpcMock.mockImplementation(async () => ({
      result: counts[call++],
    }));

    const wallets = await getTrendingWallets();
    const signals = wallets.map((w) => w.signal);

    expect(signals).toEqual([
      "Mega Active Wallet",
      "High Activity",
      "Active Wallet",
      "Growing Wallet",
      "Growing Wallet",
    ]);
  });

  it("treats a rejected rpc call as zero transactions", async () => {
    alchemyRpcMock.mockRejectedValue(new Error("network down"));
    const wallets = await getTrendingWallets();

    expect(wallets).toHaveLength(5);
    for (const wallet of wallets) {
      expect(wallet.totalTransactions).toBe(0);
      expect(wallet.signal).toBe("Growing Wallet");
    }
  });

  it("treats a missing result field as zero transactions", async () => {
    alchemyRpcMock.mockResolvedValue({});
    const wallets = await getTrendingWallets();
    expect(wallets.every((w) => w.totalTransactions === 0)).toBe(true);
  });
});
