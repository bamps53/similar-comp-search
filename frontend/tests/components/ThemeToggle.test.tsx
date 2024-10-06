// tests/components/ThemeToggle.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../../src/components/ThemeToggle";
import { ChakraProvider } from "@chakra-ui/react";

describe("ThemeToggle Component", () => {
  test("should toggle theme on click", () => {
    render(
      <ChakraProvider>
        <ThemeToggle />
      </ChakraProvider>
    );

    const toggleButton = screen.getByRole("button", { name: "テーマ切り替え" });

    // デフォルトはライトモード
    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    // トグルをクリックしてダークモードに切り替え
    fireEvent.click(toggleButton);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");

    // 再度クリックしてライトモードに戻す
    fireEvent.click(toggleButton);

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });
});
