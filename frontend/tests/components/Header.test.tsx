// tests/components/Header.test.tsx
import { render, screen } from "@testing-library/react";
import Header from "../../src/components/Header/Header";

describe("Header Component", () => {
  test("should render header with logo and theme toggle", () => {
    render(<Header />);

    expect(screen.getByLabelText("サイトロゴ")).toHaveTextContent(
      "類似コンペ検索サイト"
    );
    expect(screen.getByRole("button")).toBeInTheDocument(); // テーマトグルボタン
  });
});
