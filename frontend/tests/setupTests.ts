// tests/setupTests.ts

import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

// モックデータの定義
const mockCompetition = {
  id: 1,
  title: "First Competition",
  subtitle: "This is a test competition",
  domain: "NLP",
  // 他のフィールド
};

const mockSolution = {
  id: 1,
  description: "This is a test solution",
  link: "http://example.com/solution",
  repository_link: "http://github.com/repo",
  // 他のフィールド
};

const mockResults = [
  { id: 1, title: "First Competition", domain: "NLP" },
  { id: 2, title: "Second Competition", domain: "Computer Vision" },
];

// サーバーのセットアップ
const server = setupServer(
  http.get("/api/competitions/search", (req, res, ctx) => {
    return HttpResponse.json(mockResults);
  }),

  http.get("/api/competitions/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (id === "1") {
      return HttpResponse.json(mockCompetition);
    } else {
      return res(
        ctx.status(404),
        ctx.json({ detail: "Competition not found" })
      );
    }
  }),

  http.get("/api/solutions/:id", (req, res, ctx) => {
    const { id } = req.params;
    if (id === "1") {
      return HttpResponse.json(mockSolution);
    } else {
      return res(ctx.status(404), ctx.json({ detail: "Solution not found" }));
    }
  })
);

// サーバーの起動とクリーンアップ
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// サーバーを他のテストで使用できるようにエクスポート
export { server, http };
