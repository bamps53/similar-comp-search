// src/components/Header/Header.tsx
import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import Logo from "./Logo";
import ThemeToggle from "../ThemeToggle";

const Header: React.FC = () => {
  return (
    <Flex as="header" p={4} alignItems="center">
      <Logo />
      <Spacer />
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
