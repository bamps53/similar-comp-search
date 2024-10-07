// tests/components/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "../../src/components/Footer/Footer";

describe("Footer Component", () => {
  test("should render footer with correct content", () => {
    render(<Footer />);

    expect(screen.getByLabelText("フッター")).toBeInTheDocument();
    expect(
      screen.getByText(/© \d{4} 類似コンペ検索サイト. All rights reserved./)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("プライバシーポリシー")).toBeInTheDocument();
    expect(screen.getByLabelText("利用規約")).toBeInTheDocument();
    expect(screen.getByLabelText("お問い合わせ")).toBeInTheDocument();
  });
});
