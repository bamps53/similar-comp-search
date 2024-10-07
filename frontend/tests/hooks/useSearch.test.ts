// tests/hooks/useSearch.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "../../src/hooks/useSearch";
import { vi } from "vitest";

describe("useSearch Hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should fetch and update results correctly for competitions", async () => {
    const mockData = [{ id: 1, title: "Test Competition" }];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useSearch(false));

    await act(async () => {
      await result.current.handleSearch({
        keyword: "test",
        filter: "",
        similarity: "",
      });
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/competitions/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: "test",
        filter: "",
        similarity: "",
      }),
    });

    expect(result.current.results).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  test("should fetch and update results correctly for solutions", async () => {
    const mockData = [{ id: 1, title: "Test Solution" }];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useSearch(true));

    await act(async () => {
      await result.current.handleSearch({
        keyword: "test",
        filter: "",
        similarity: "",
      });
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/solutions/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: "test",
        filter: "",
        similarity: "",
      }),
    });

    expect(result.current.results).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});
