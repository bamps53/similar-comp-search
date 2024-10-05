// tests/components/SearchResults.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from '../../src/components/SearchResults';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const mockResults = [
  { id: 1, title: 'First Competition', domain: 'NLP' },
  { id: 2, title: 'Second Competition', domain: 'Computer Vision' },
];

const server = setupServer(
  http.get('/api/competitions/search', (req, res, ctx) => {
    return HttpResponse.json(mockResults);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchResults Component with API', () => {
  test('should fetch and render results from API', async () => {
    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.getByText('First Competition')).toBeInTheDocument();
    });

    expect(screen.getByText('Second Competition')).toBeInTheDocument();
  });

  test('should handle API errors', async () => {
    server.use(
      http.get('/api/competitions/search', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<SearchResults />);

    await waitFor(() => {
      expect(
        screen.getByText('データの取得に失敗しました')
      ).toBeInTheDocument();
    });
  });
});
