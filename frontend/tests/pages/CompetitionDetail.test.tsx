// tests/pages/CompetitionDetail.test.tsx
import { render, screen } from "@testing-library/react";
import CompetitionDetail from "../../src/pages/CompetitionDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi, Mock } from "vitest";
import apiClient from "../../src/utils/apiClient";

vi.mock("../../src/utils/apiClient");

describe("CompetitionDetail Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render competition details correctly", async () => {
    const mockData = {
      id: 1,
      title: "First Competition",
      subtitle: "This is a test competition",
      domain: "NLP",
    };

    // apiClient のモック設定
    (apiClient.get as Mock).mockResolvedValue({ data: mockData });

    render(
      <MemoryRouter initialEntries={["/competitions/1"]}>
        <Routes>
          <Route path="/competitions/:id" element={<CompetitionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("コンペタイトル")).toHaveTextContent(
      "First Competition"
    );
    expect(
      await screen.findByLabelText("コンペサブタイトル")
    ).toHaveTextContent("This is a test competition");
    expect(await screen.findByLabelText("ドメイン")).toHaveTextContent(
      "ドメイン: NLP"
    );
  });

  test("should display error message for invalid ID", async () => {
    (apiClient.get as Mock).mockRejectedValue(new Error("Competition not found"));

    render(
      <MemoryRouter initialEntries={["/competitions/999"]}>
        <Routes>
          <Route path="/competitions/:id" element={<CompetitionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByLabelText("エラーメッセージ")).toHaveTextContent(
      "コンペティションが見つかりませんでした"
    );
  });
});
