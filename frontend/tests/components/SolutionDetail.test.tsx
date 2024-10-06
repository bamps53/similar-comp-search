// tests/components/SolutionDetail.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import SolutionDetail from "../../src/pages/SolutionDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("SolutionDetail Component", () => {
  test("should render solution details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/solutions/1"]}>
        <Routes>
          <Route path="/solutions/:id" element={<SolutionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("This is a test solution")).toBeInTheDocument();
    });

    expect(
      screen.getByRole("link", { name: "ソリューションリンク" })
    ).toHaveAttribute("href", "http://example.com/solution");
  });

  test("should display error message for invalid ID", async () => {
    render(
      <MemoryRouter initialEntries={["/solutions/999"]}>
        <Routes>
          <Route path="/solutions/:id" element={<SolutionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText("ソリューションが見つかりませんでした")
      ).toBeInTheDocument();
    });
  });
});
