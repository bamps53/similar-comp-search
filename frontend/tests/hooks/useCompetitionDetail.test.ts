// tests/hooks/useCompetitionDetail.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCompetitionDetail } from "../../src/hooks/useCompetitionDetail";
import { vi, Mock } from "vitest";
import apiClient from "../../src/utils/apiClient";

vi.mock("../../src/utils/apiClient");

describe("useCompetitionDetail Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch and return competition data", async () => {
    const mockData = {
      id: 1,
      title: "First Competition",
      subtitle: "This is a test competition",
      domain: "NLP",
    };

    // axios のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useCompetitionDetail("1"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/competitions/1");
    expect(result.current.competition).toEqual(mockData);
    expect(result.current.error).toBe("");
  });

  test("should handle error when competition not found", async () => {
    (apiClient.get as Mock).mockRejectedValue(
      new Error("Competition not found")
    );

    const { result } = renderHook(() => useCompetitionDetail("999"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/competitions/999");
    expect(result.current.competition).toBeNull();
    expect(result.current.error).toBe("コンペティションが見つかりませんでした");
  });
});
