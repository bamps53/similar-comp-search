// tests/hooks/useSolutionDetail.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSolutionDetail } from "../../src/hooks/useSolutionDetail";
import apiClient from "../../src/utils/apiClient";
import { vi, Mock } from "vitest";

vi.mock("../../src/utils/apiClient");

describe("useSolutionDetail Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch and return solution data", async () => {
    const mockData = {
      id: 1,
      description: "This is a test solution",
      link: "http://example.com/solution",
      repository_link: "http://example.com/repo",
    };

    // apiClient のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useSolutionDetail("1"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/solutions/1");

    expect(result.current.solution).toEqual(mockData);
    expect(result.current.error).toBe("");
  });

  test("should handle error when solution not found", async () => {
    // apiClient のモック設定（エラーをスロー）
    (apiClient.get as Mock).mockRejectedValue(new Error("Solution not found"));

    const { result } = renderHook(() => useSolutionDetail("999"));

    await act(async () => {
      // フック内の useEffect を待機
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/solutions/999");
    expect(result.current.solution).toBeNull();
    expect(result.current.error).toBe("ソリューションが見つかりませんでした");
  });
});
