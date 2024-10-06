// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // デフォルトのカラーモード
    useSystemColorMode: false, // システムのカラーモードを使用するかどうか
  },
  colors: {
    brand: {
      50: "#e6f7ff",
      100: "#b3e5ff",
      200: "#80d4ff",
      300: "#4dc2ff",
      400: "#1ab0ff",
      500: "#0096e6",
      600: "#0073b4",
      700: "#005082",
      800: "#002d51",
      900: "#000a20",
    },
  },
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Inter, sans-serif",
  },
});

export default theme;
