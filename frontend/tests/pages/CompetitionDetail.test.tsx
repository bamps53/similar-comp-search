// tests/pages/CompetitionDetail.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import CompetitionDetail from "../../src/pages/CompetitionDetail";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

describe("CompetitionDetail Component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("should render competition details correctly", async () => {
    const mockData = {
      id: 1,
      title: "First Competition",
      subtitle: "This is a test competition",
      domain: "NLP",
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

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
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

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
