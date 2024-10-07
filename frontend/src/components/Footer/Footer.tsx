// src/components/Footer/Footer.tsx
import React from "react";
import { Box, Text, Stack } from "@chakra-ui/react";
import FooterLinks from "./FooterLinks";

const Footer: React.FC = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="gray.200"
      py={4}
      aria-label="フッター"
    >
      <Stack
        direction={["column", "row"]}
        spacing={4}
        align="center"
        justify="center"
      >
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} 類似コンペ検索サイト. All rights
          reserved.
        </Text>
        <FooterLinks />
      </Stack>
    </Box>
  );
};

export default Footer;
