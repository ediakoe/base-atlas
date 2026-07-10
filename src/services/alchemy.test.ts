import { describe, it, expect, vi, afterEach } from "vitest";
import {
  alchemyRpc,
  getWalletBalance,
  getWalletAge,
  getNFTCount,
  getTokenCount,
  getTopTokens,
} from "./alchemy";

afterEach(() => {
  vi.restoreAllMocks();
});

/** Stub fetch with a resolver that receives the parsed JSON-RPC body. */
function stubRpc(resolver: (body: { method: string; id: number }) => unknown) {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => {
    const body = JSON.parse(String(init?.body ?? "{}"));
    return {
      ok: true,
      status: 200,
      json: async () => resolver(body),
    };
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

/** Convert a millisecond epoch into the hex-seconds format alchemy returns. */
function hexSeconds(ms: number): string {
  return "0x" + Math.floor(ms / 1000).toString(16);
}

describe("alchemyRpc", () => {
  it("posts a well-formed JSON-RPC payload and returns parsed json", async () => {
    const fetchMock = stubRpc(() => ({ result: "0x2a" }));
    const result = await alchemyRpc("eth_call", ["a", "b"], 7);

    expect(result).toEqual({ result: "0x2a" });
    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      jsonrpc: "2.0",
      id: 7,
      method: "eth_call",
      params: ["a", "b"],
    });
  });

  it("throws when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 })
    );
    await expect(alchemyRpc("eth_call", [])).rejects.toThrow(
      "Alchemy RPC Error 500"
    );
  });
});

describe("getWalletBalance", () => {
  it("converts a wei hex balance into a 4-decimal ether string", async () => {
    // 1.5 ETH = 1.5e18 wei
    const wei = "0x" + (15n * 10n ** 17n).toString(16);
    stubRpc(() => ({ result: wei }));
    expect(await getWalletBalance("0xabc")).toBe("1.5000");
  });

  it("defaults to zero balance when result is absent", async () => {
    stubRpc(() => ({}));
    expect(await getWalletBalance("0xabc")).toBe("0.0000");
  });

  it("returns '0' when the request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await getWalletBalance("0xabc")).toBe("0");
  });
});

describe("getWalletAge", () => {
  const NOW = 1_700_000_000_000;

  function ageResolver(days: number) {
    const blockNum = "0x10";
    return (body: { id: number }) => {
      if (body.id === 99) {
        return { result: { transfers: [{ blockNum }] } };
      }
      if (body.id === 100) {
        return { result: { transfers: [] } };
      }
      // block lookup
      return {
        result: { timestamp: hexSeconds(NOW - days * 86400000) },
      };
    };
  }

  it("returns 'No History' when there are no transfers", async () => {
    stubRpc(() => ({ result: { transfers: [] } }));
    expect(await getWalletAge("0xabc")).toBe("No History");
  });

  it("formats an age under a month in days", async () => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    stubRpc(ageResolver(5));
    expect(await getWalletAge("0xabc")).toBe("5 Days");
  });

  it("formats an age under a year in months", async () => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    stubRpc(ageResolver(60));
    expect(await getWalletAge("0xabc")).toBe("2 Months");
  });

  it("formats an age over a year in years", async () => {
    vi.spyOn(Date, "now").mockReturnValue(NOW);
    stubRpc(ageResolver(400));
    expect(await getWalletAge("0xabc")).toBe("1.1 Years");
  });

  it("returns 'Unknown' when the block has no timestamp", async () => {
    stubRpc((body) => {
      if (body.id === 99) {
        return { result: { transfers: [{ blockNum: "0x10" }] } };
      }
      if (body.id === 100) {
        return { result: { transfers: [] } };
      }
      return { result: {} };
    });
    expect(await getWalletAge("0xabc")).toBe("Unknown");
  });

  it("returns 'Unknown' when a request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await getWalletAge("0xabc")).toBe("Unknown");
  });
});

describe("getNFTCount", () => {
  it("prefers totalCount from the response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ totalCount: 42, ownedNfts: [{}, {}] }),
      })
    );
    expect(await getNFTCount("0xabc")).toBe(42);
  });

  it("falls back to the ownedNfts length", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ownedNfts: [{}, {}, {}] }),
      })
    );
    expect(await getNFTCount("0xabc")).toBe(3);
  });

  it("returns 0 for a non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 404 })
    );
    expect(await getNFTCount("0xabc")).toBe(0);
  });

  it("returns 0 when the request throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("boom")));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await getNFTCount("0xabc")).toBe(0);
  });
});

describe("stubbed token helpers", () => {
  it("getTokenCount resolves to 0", async () => {
    expect(await getTokenCount()).toBe(0);
  });

  it("getTopTokens resolves to an empty list", async () => {
    expect(await getTopTokens()).toEqual([]);
  });
});
