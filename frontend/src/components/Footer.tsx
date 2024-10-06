// src/components/common/Footer/Footer.tsx
import React from "react";
import { Box, Text, Link, Stack } from "@chakra-ui/react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="gray.800" color="gray.200" py={4}>
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
        <Stack direction="row" spacing={4}>
          <Link href="/privacy-policy" fontSize="sm">
            プライバシーポリシー
          </Link>
          <Link href="/terms-of-service" fontSize="sm">
            利用規約
          </Link>
          <Link href="/contact" fontSize="sm">
            お問い合わせ
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
