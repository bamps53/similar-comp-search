// tests/components/SearchResults.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import SearchResults from '../../src/components/SearchResults';
import { server, http } from '../setupTests';

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
