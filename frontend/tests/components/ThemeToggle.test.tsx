// tests/components/ThemeToggle.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../../src/components/ThemeToggle";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

describe("ThemeToggle Component", () => {
  test("should toggle theme on click", () => {
    render(
      <ChakraProvider>
        <ColorModeProvider
          options={{ initialColorMode: "light", useSystemColorMode: false }}
        >
          <ThemeToggle />
        </ColorModeProvider>
      </ChakraProvider>
    );

    const toggleButton = screen.getByRole("button", {
      name: "ダークモードに切り替え",
    });

    // 初期状態はライトモード
    expect(toggleButton).toHaveAttribute(
      "aria-label",
      "ダークモードに切り替え"
    );

    // トグルをクリックしてダークモードに切り替え
    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveAttribute(
      "aria-label",
      "ライトモードに切り替え"
    );
  });
});
