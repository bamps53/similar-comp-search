// src/components/Header/Logo.tsx
import React from "react";
import { Box } from "@chakra-ui/react";

const Logo: React.FC = () => {
  return (
    <Box fontSize="xl" fontWeight="bold" aria-label="サイトロゴ">
      類似コンペ検索サイト
    </Box>
  );
};

export default Logo;
