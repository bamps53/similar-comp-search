// tests/e2e/search.spec.ts
import { test, expect } from '@playwright/test';

test('Search functionality works correctly', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // キーワードを入力
  await page.fill('input[placeholder="検索キーワードを入力"]', 'テスト');

  // 検索ボタンをクリック
  await page.click('button:has-text("検索")');

  // 結果が表示されるまで待機
  await page.waitForSelector('text=First Competition');

  // 結果を確認
  const results = await page.$$eval('ul > li', (items) =>
    items.map((item) => item.textContent)
  );

  expect(results.length).toBeGreaterThan(0);
  expect(results[0]).toContain('First Competition');
});
