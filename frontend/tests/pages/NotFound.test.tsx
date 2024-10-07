// tests/pages/NotFound.test.tsx
import { render, screen } from "@testing-library/react";
import NotFound from "../../src/pages/NotFound";
import { MemoryRouter } from "react-router-dom";

describe("NotFound Component", () => {
  test("should render 404 error message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("404エラーメッセージ")).toHaveTextContent(
      "ページが見つかりません"
    );
    expect(screen.getByLabelText("説明文")).toHaveTextContent(
      "申し訳ありませんが、お探しのページは存在しません。"
    );
    expect(
      screen.getByRole("link", { name: "ホームページに戻るボタン" })
    ).toBeInTheDocument();
  });
});
