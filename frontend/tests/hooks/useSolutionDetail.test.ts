// tests/hooks/useSolutionDetail.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSolutionDetail } from "../../src/hooks/useSolutionDetail";
import { vi } from "vitest";

describe("useSolutionDetail Hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should fetch and return solution data", async () => {
    const mockData = {
      id: 1,
      description: "This is a test solution",
      link: "http://example.com/solution",
      repository_link: "http://example.com/repo",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useSolutionDetail("1"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/solutions/1");
    expect(result.current.solution).toEqual(mockData);
    expect(result.current.error).toBe("");
  });

  test("should handle error when solution not found", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { result } = renderHook(() => useSolutionDetail("999"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/solutions/999");
    expect(result.current.solution).toBeNull();
    expect(result.current.error).toBe("ソリューションが見つかりませんでした");
  });
});
