// tests/pages/SolutionDetail.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import SolutionDetail from "../../src/pages/SolutionDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

describe("SolutionDetail Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should render solution details correctly", async () => {
    const mockData = {
      id: 1,
      description: "This is a test solution",
      link: "http://example.com/solution",
      repository_link: "http://example.com/repo",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    render(
      <MemoryRouter initialEntries={["/solutions/1"]}>
        <Routes>
          <Route path="/solutions/:id" element={<SolutionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByLabelText("ソリューション説明")
    ).toHaveTextContent("This is a test solution");

    expect(
      screen.getByRole("link", { name: "ソリューションリンク" })
    ).toHaveAttribute("href", "http://example.com/solution");

    expect(
      screen.getByRole("link", { name: "リポジトリリンク" })
    ).toHaveAttribute("href", "http://example.com/repo");
  });

  test("should display error message for invalid ID", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <MemoryRouter initialEntries={["/solutions/999"]}>
        <Routes>
          <Route path="/solutions/:id" element={<SolutionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("エラーメッセージ")).toHaveTextContent(
      "ソリューションが見つかりませんでした"
    );
  });
});
