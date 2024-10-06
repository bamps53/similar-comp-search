// src/components/Home.tsx
import React, { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import ToggleSwitch from "../components/ToggleSwitch";
import SearchResults from "../components/SearchResults";

export interface ResultItem {
  id: number;
  title: string;
  domain: string;
  // 他のフィールド
}

const Home: React.FC = () => {
  const [isSolutionSearch, setIsSolutionSearch] = useState(false);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (isSolution: boolean) => {
    setIsSolutionSearch(isSolution);
    console.log(isSolutionSearch); // TODO: ここに処理を追加
  };

  return (
    <Box p={6}>
      <VStack spacing={6} align="stretch">
        <Heading textAlign="center">ようこそ、類似コンペ検索サイトへ</Heading>
        <ToggleSwitch onToggle={handleToggle} />
        <SearchBar setIsLoading={setIsLoading} setResults={setResults} />
        <SearchResults results={results} isLoading={isLoading} />
      </VStack>
    </Box>
  );
};

export default Home;
