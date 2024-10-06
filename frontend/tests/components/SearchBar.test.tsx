// tests/components/SearchBar.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../../src/components/SearchBar";
import { vi } from "vitest";

describe("SearchBar Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should update input value on change", () => {
    render(<SearchBar setIsLoading={vi.fn()} setResults={vi.fn()} />);

    const input = screen.getByPlaceholderText("検索キーワードを入力");

    fireEvent.change(input, { target: { value: "テスト" } });

    expect(input).toHaveValue("テスト");
  });

  test("should call fetch with correct parameters and update setResults", async () => {
    const setIsLoadingMock = vi.fn();
    const setResultsMock = vi.fn();
    render(
      <SearchBar
        setIsLoading={setIsLoadingMock}
        setResults={setResultsMock}
      />
    );

    const input = screen.getByPlaceholderText("検索キーワードを入力");
    const button = screen.getByRole("button", { name: "検索" });

    fireEvent.change(input, { target: { value: "テスト" } });

    const expectedParams = {
      keyword: "テスト",
      filter: "",
      similarity: "",
    };

    // fetch のモック
    const mockData = [{ id: 1, title: "Test Result" }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    fireEvent.click(button);

    expect(setIsLoadingMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedParams),
      });

      expect(setResultsMock).toHaveBeenCalledWith(mockData);
      expect(setIsLoadingMock).toHaveBeenCalledWith(false);
    });
  });

  test("should update filter selection", () => {
    render(<SearchBar setIsLoading={vi.fn()} setResults={vi.fn()} />);

    const filterSelect = screen.getByLabelText("フィルター");

    fireEvent.change(filterSelect, { target: { value: "NLP" } });

    expect(filterSelect).toHaveValue("NLP");
  });

  test("should call fetch with selected filter and update setResults", async () => {
    const setIsLoadingMock = vi.fn();
    const setResultsMock = vi.fn();
    render(
      <SearchBar
        setIsLoading={setIsLoadingMock}
        setResults={setResultsMock}
      />
    );

    const input = screen.getByPlaceholderText("検索キーワードを入力");
    const filterSelect = screen.getByLabelText("フィルター");
    const button = screen.getByRole("button", { name: "検索" });

    fireEvent.change(input, { target: { value: "テスト" } });
    fireEvent.change(filterSelect, { target: { value: "NLP" } });

    const expectedParams = {
      keyword: "テスト",
      filter: "NLP",
      similarity: "",
    };

    // fetch のモック
    const mockData = [{ id: 1, title: "Test Result with Filter" }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    fireEvent.click(button);

    expect(setIsLoadingMock).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expectedParams),
      });

      expect(setResultsMock).toHaveBeenCalledWith(mockData);
      expect(setIsLoadingMock).toHaveBeenCalledWith(false);
    });
  });

  test("should update similarity option", () => {
    render(<SearchBar setIsLoading={vi.fn()} setResults={vi.fn()} />);

    const similaritySelect = screen.getByLabelText("類似性の観点");

    fireEvent.change(similaritySelect, { target: { value: "ドメイン" } });

    expect(similaritySelect).toHaveValue("ドメイン");
  });
});
