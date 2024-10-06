// components/SearchBar.tsx
import React, { useState } from "react";
import {
  Box,
  Input,
  Select,
  Button,
  HStack,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ResultItem } from "../pages/Home";

export interface SearchParams {
  keyword: string;
  filter: string;
  similarity: string;
}

interface SearchBarProps {
  setIsLoading: (isLoading: boolean) => void;
  setResults: (results: ResultItem[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setIsLoading, setResults }) => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [similarity, setSimilarity] = useState("");

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/search", {
        // Replace with actual API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error, e.g., display error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>検索キーワード</FormLabel>
          <Input
            placeholder="検索キーワードを入力"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </FormControl>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel>フィルター</FormLabel>
            <Select
              placeholder="選択してください"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="NLP">NLP</option>
              <option value="Computer Vision">Computer Vision</option>
              {/* 他のオプション */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>類似性の観点</FormLabel>
            <Select
              placeholder="選択してください"
              value={similarity}
              onChange={(e) => setSimilarity(e.target.value)}
            >
              <option value="ドメイン">ドメイン</option>
              <option value="タグ">タグ</option>
              {/* 他のオプション */}
            </Select>
          </FormControl>
        </HStack>
        <Button
          colorScheme="teal"
          onClick={() => handleSearch({ keyword, filter, similarity })}
        >
          検索
        </Button>
      </VStack>
    </Box>
  );
};

export default SearchBar;
