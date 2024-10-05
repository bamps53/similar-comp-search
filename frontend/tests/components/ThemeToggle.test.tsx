// tests/components/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../src/components/ThemeToggle';

describe('ThemeToggle Component', () => {
  test('should toggle theme on click', () => {
    render(<ThemeToggle />);

    const toggleButton = screen.getByRole('checkbox');

    // デフォルトはライトモード
    expect(document.body.classList.contains('dark')).toBe(false);

    // トグルをクリックしてダークモードに切り替え
    fireEvent.click(toggleButton);

    expect(document.body.classList.contains('dark')).toBe(true);

    // 再度クリックしてライトモードに戻す
    fireEvent.click(toggleButton);

    expect(document.body.classList.contains('dark')).toBe(false);
  });

  test('should retain theme after reload', () => {
    // 初回レンダリングでダークモードに設定
    window.localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);

    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
