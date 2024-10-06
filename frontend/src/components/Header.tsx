// src/components/Header.tsx
import React from 'react';
import { Flex, Box, Spacer } from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <Flex as="header" p={4} alignItems="center">
      <Box fontSize="xl" fontWeight="bold">
        類似コンペ検索サイト
      </Box>
      <Spacer />
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
