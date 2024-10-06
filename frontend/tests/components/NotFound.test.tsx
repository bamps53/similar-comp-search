// tests/components/NotFound.test.tsx
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

    expect(screen.getByText("ページが見つかりません")).toBeInTheDocument();
    expect(
      screen.getByText("申し訳ありませんが、お探しのページは存在しません。")
    ).toBeInTheDocument();
  });
});
