// tests/hooks/useSearch.test.ts
import { renderHook, act } from "@testing-library/react";
import { useSearch } from "../../src/hooks/useSearch";
import { Mock, vi } from "vitest";
import apiClient from "../../src/utils/apiClient";

vi.mock("../../src/utils/apiClient");

describe("useSearch Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch and update results correctly for competitions", async () => {
    const mockData = [{ id: 1, title: "Test Competition" }];

    // axios のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useSearch(false));

    await act(async () => {
      await result.current.handleSearch({
        keyword: "test",
        filter: "",
        similarity: "",
      });
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/competitions/search", {
      keyword: "test",
      filter: "",
      similarity: "",
    });

    expect(result.current.results).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });

  test("should fetch and update results correctly for solutions", async () => {
    const mockData = [{ id: 1, title: "Test Solution" }];

    // apiClient のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

    const { result } = renderHook(() => useSearch(true));

    await act(async () => {
      await result.current.handleSearch({
        keyword: "test",
        filter: "",
        similarity: "",
      });
    });

    expect(apiClient.get).toHaveBeenCalledWith("/api/solutions/search", {
      keyword: "test",
      filter: "",
      similarity: "",
    });

    expect(result.current.results).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});
