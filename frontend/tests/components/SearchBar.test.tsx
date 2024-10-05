// tests/components/SearchBar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../src/components/SearchBar';
import { vi } from 'vitest';

describe('SearchBar Component', () => {
  test('should update input value on change', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('検索キーワードを入力');

    fireEvent.change(input, { target: { value: 'テスト' } });

    expect(input).toHaveValue('テスト');
  });

  test('should call onSearch with correct value', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('検索キーワードを入力');
    const button = screen.getByRole('button', { name: '検索' });

    fireEvent.change(input, { target: { value: 'テスト' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith({
      keyword: 'テスト',
      filters: { filter: "" },
      similarity: '',
    });
  });

  test('should update filter selection', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const filterSelect = screen.getByLabelText('フィルター');

    fireEvent.change(filterSelect, { target: { value: 'NLP' } });

    expect(filterSelect).toHaveValue('NLP');
  });

  test('should call onSearch with selected filter', () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText('検索キーワードを入力');
    const filterSelect = screen.getByLabelText('フィルター');
    const button = screen.getByRole('button', { name: '検索' });

    fireEvent.change(input, { target: { value: 'テスト' } });
    fireEvent.change(filterSelect, { target: { value: 'NLP' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith({
      keyword: 'テスト',
      filters: { filter: 'NLP' },
      similarity: '',
    });
  });

  test('should update similarity option', () => {
    render(<SearchBar onSearch={vi.fn()} />);

    const similaritySelect = screen.getByLabelText('類似性の観点');

    fireEvent.change(similaritySelect, { target: { value: 'ドメイン' } });

    expect(similaritySelect).toHaveValue('ドメイン');
  });
});
