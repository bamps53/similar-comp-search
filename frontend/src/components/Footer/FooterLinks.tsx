// src/components/Footer/FooterLinks.tsx
import React from "react";
import { Stack, Link } from "@chakra-ui/react";

const FooterLinks: React.FC = () => {
  return (
    <Stack direction="row" spacing={4}>
      <Link
        href="/privacy-policy"
        fontSize="sm"
        aria-label="プライバシーポリシー"
      >
        プライバシーポリシー
      </Link>
      <Link href="/terms-of-service" fontSize="sm" aria-label="利用規約">
        利用規約
      </Link>
      <Link href="/contact" fontSize="sm" aria-label="お問い合わせ">
        お問い合わせ
      </Link>
    </Stack>
  );
};

export default FooterLinks;
