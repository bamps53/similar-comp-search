// tests/components/SearchBar.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar, { SearchParams } from "../../src/components/SearchBar";
import { vi } from "vitest";

describe("SearchBar Component", () => {
  test("should update input value on change", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByLabelText("検索キーワード入力");

    fireEvent.change(input, { target: { value: "テスト" } });

    expect(input).toHaveValue("テスト");
  });

  test("should call onSearch with correct parameters when search button is clicked", () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const keywordInput = screen.getByLabelText("検索キーワード入力");
    const filterSelect = screen.getByLabelText("フィルター選択");
    const similaritySelect = screen.getByLabelText("類似性の観点選択");
    const searchButton = screen.getByRole("button", { name: "検索ボタン" });

    fireEvent.change(keywordInput, { target: { value: "テストキーワード" } });
    fireEvent.change(filterSelect, { target: { value: "NLP" } });
    fireEvent.change(similaritySelect, { target: { value: "ドメイン" } });

    const expectedParams: SearchParams = {
      keyword: "テストキーワード",
      filter: "NLP",
      similarity: "ドメイン",
    };

    fireEvent.click(searchButton);

    expect(onSearchMock).toHaveBeenCalledWith(expectedParams);
  });

  test("should update filter selection", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const filterSelect = screen.getByLabelText("フィルター選択");

    fireEvent.change(filterSelect, { target: { value: "NLP" } });

    expect(filterSelect).toHaveValue("NLP");
  });

  test("should update similarity option", () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const similaritySelect = screen.getByLabelText("類似性の観点選択");

    fireEvent.change(similaritySelect, { target: { value: "ドメイン" } });

    expect(similaritySelect).toHaveValue("ドメイン");
  });
});
