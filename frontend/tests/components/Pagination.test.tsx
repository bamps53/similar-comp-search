// tests/components/Pagination.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../src/components/Pagination/Pagination";
import { vi } from "vitest";

describe("Pagination Component", () => {
  const onPageChangeMock = vi.fn();

  test("should render pagination correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    // 現在のページが強調表示されていることを確認
    const currentPageButton = screen.getByRole("button", { name: "ページ 2" });
    expect(currentPageButton).toHaveAttribute("aria-current", "page");

    // 全体のページ数が正しく表示されていることを確認
    expect(screen.getAllByRole("button")).toHaveLength(7); // 5ページ + 前のページへ + 次のページへ
  });

  test("should call onPageChange when page number is clicked", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    const pageButton = screen.getByRole("button", { name: "ページ 2" });
    fireEvent.click(pageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test("should disable previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByRole("button", { name: "前のページへ" });
    expect(prevButton).toBeDisabled();
  });

  test("should disable next button on last page", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByRole("button", { name: "次のページへ" });
    expect(nextButton).toBeDisabled();
  });
});
