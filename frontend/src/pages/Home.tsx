// src/pages/Home.tsx
import React, { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import ToggleSwitch from "../components/ToggleSwitch";
import SearchResults from "../components/SearchResults/SearchResults";
import { useSearch } from "../hooks/useSearch";

export interface ResultItem {
  id: number;
  title: string;
  domain: string;
  // 他のフィールド
}

const Home: React.FC = () => {
  const [isSolutionSearch, setIsSolutionSearch] = useState(false);
  const { results, isLoading, handleSearch } = useSearch(isSolutionSearch);

  const handleToggle = (isSolution: boolean) => {
    setIsSolutionSearch(isSolution);
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center">ようこそ、類似コンペ検索サイトへ</Heading>
        <ToggleSwitch onToggle={handleToggle} />
        <SearchBar onSearch={handleSearch} />
        <SearchResults results={results} isLoading={isLoading} />
      </VStack>
    </Box>
  );
};

export default Home;
