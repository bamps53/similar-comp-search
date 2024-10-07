// tests/hooks/useCompetitionDetail.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCompetitionDetail } from "../../src/hooks/useCompetitionDetail";
import { vi } from "vitest";

describe("useCompetitionDetail Hook", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should fetch and return competition data", async () => {
    const mockData = {
      id: 1,
      title: "First Competition",
      subtitle: "This is a test competition",
      domain: "NLP",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useCompetitionDetail("1"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/competitions/1");
    expect(result.current.competition).toEqual(mockData);
    expect(result.current.error).toBe("");
  });

  test("should handle error when competition not found", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { result } = renderHook(() => useCompetitionDetail("999"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/competitions/999");
    expect(result.current.competition).toBeNull();
    expect(result.current.error).toBe("コンペティションが見つかりませんでした");
  });
});
