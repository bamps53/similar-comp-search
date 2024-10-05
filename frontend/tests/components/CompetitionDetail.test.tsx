// tests/components/CompetitionDetail.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import CompetitionDetail from '../../src/components/CompetitionDetail';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('CompetitionDetail Component', () => {
  test('should render competition details correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/competitions/1']}>
        <Routes>
          <Route path="/competitions/:id" element={<CompetitionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('First Competition')).toBeInTheDocument();
    expect(await screen.findByText('This is a test competition')).toBeInTheDocument();
    expect(await screen.findByText('NLP')).toBeInTheDocument();
  });

  test('should display error message for invalid ID', async () => {
    render(
      <MemoryRouter initialEntries={['/competitions/999']}>
        <Routes>
          <Route path="/competitions/:id" element={<CompetitionDetail />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('コンペティションが見つかりませんでした')
      ).toBeInTheDocument();
    });
  });
});
