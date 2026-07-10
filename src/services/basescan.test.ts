import { describe, it, expect, vi, afterEach } from "vitest";
import { getTransactionCount } from "./basescan";

afterEach(() => {
  vi.restoreAllMocks();
});

function mockFetch(payload: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({
    json: async () => payload,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("getTransactionCount", () => {
  it("returns the number of transactions in the result array", async () => {
    mockFetch({ result: [{}, {}, {}] });
    expect(await getTransactionCount("0xabc")).toBe(3);
  });

  it("returns 0 when the result array is empty", async () => {
    mockFetch({ result: [] });
    expect(await getTransactionCount("0xabc")).toBe(0);
  });

  it("returns 0 when result is missing", async () => {
    mockFetch({ status: "0", message: "NOTOK" });
    expect(await getTransactionCount("0xabc")).toBe(0);
  });

  it("queries the Base chain id and includes the address", async () => {
    const fetchMock = mockFetch({ result: [] });
    await getTransactionCount("0xDEADBEEF");
    const calledUrl = fetchMock.mock.calls[0][0] as string;
    expect(calledUrl).toContain("chainid=8453");
    expect(calledUrl).toContain("address=0xDEADBEEF");
  });
});
