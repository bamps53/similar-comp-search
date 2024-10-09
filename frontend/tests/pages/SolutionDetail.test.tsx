// tests/pages/SolutionDetail.test.tsx
import { render, screen } from "@testing-library/react";
import SolutionDetail from "../../src/pages/SolutionDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, Mock } from "vitest";
import apiClient from "../../src/utils/apiClient";

vi.mock("../../src/utils/apiClient");

describe("SolutionDetail Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render solution details correctly", async () => {
    const mockData = {
      id: 1,
      description: "This is a test solution",
      link: "http://example.com/solution",
      repository_link: "http://example.com/repo",
    };

    // apiClient のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

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
    // apiClient のモック設定（エラーをスロー）
    (apiClient.get as Mock).mockRejectedValue(new Error("Solution not found"));

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
