// tests/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';

describe('App Routing', () => {
  test('should render home page on default route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('ようこそ、類似コンペ検索サイトへ')).toBeInTheDocument();
  });

  test('should render CompetitionDetail on /competitions/:id', async () => {
    render(
      <MemoryRouter initialEntries={['/competitions/1']}>
        <App />
      </MemoryRouter>
    );

    // 最初に「読み込み中...」が表示されていることを確認
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();

    // 非同期の状態更新を待機し、データが表示されることを確認
    expect(await screen.findByText('First Competition')).toBeInTheDocument();
  });

  test('should render 404 page on invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('ページが見つかりません')).toBeInTheDocument();
  });
});
