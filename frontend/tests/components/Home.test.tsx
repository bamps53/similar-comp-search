// tests/components/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../../src/pages/Home";

describe("Home Component", () => {
  test("should render welcome message", () => {
    render(<Home />);

    expect(
      screen.getByText("ようこそ、類似コンペ検索サイトへ")
    ).toBeInTheDocument();
  });

  test("should render SearchBar component", () => {
    render(<Home />);

    expect(
      screen.getByPlaceholderText("検索キーワードを入力")
    ).toBeInTheDocument();
  });

  test("should render ToggleSwitch component", () => {
    render(<Home />);

    expect(screen.getByText("コンペ検索")).toBeInTheDocument();
  });
});
