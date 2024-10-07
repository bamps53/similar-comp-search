// src/components/SearchBar.tsx
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

export interface SearchParams {
  keyword: string;
  filter: string;
  similarity: string;
}

interface SearchBarProps {
  onSearch: (params: SearchParams) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");
  const [similarity, setSimilarity] = useState("");

  const handleSearchClick = () => {
    onSearch({ keyword, filter, similarity });
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" shadow="sm">
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel htmlFor="keyword">検索キーワード</FormLabel>
          <Input
            id="keyword"
            placeholder="検索キーワードを入力"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            aria-label="検索キーワード入力"
          />
        </FormControl>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="filter">フィルター</FormLabel>
            <Select
              id="filter"
              placeholder="選択してください"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="フィルター選択"
            >
              <option value="NLP">NLP</option>
              <option value="Computer Vision">Computer Vision</option>
              {/* 他のオプション */}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="similarity">類似性の観点</FormLabel>
            <Select
              id="similarity"
              placeholder="選択してください"
              value={similarity}
              onChange={(e) => setSimilarity(e.target.value)}
              aria-label="類似性の観点選択"
            >
              <option value="ドメイン">ドメイン</option>
              <option value="タグ">タグ</option>
              {/* 他のオプション */}
            </Select>
          </FormControl>
        </HStack>
        <Button
          colorScheme="teal"
          onClick={handleSearchClick}
          aria-label="検索ボタン"
        >
          検索
        </Button>
      </VStack>
    </Box>
  );
};

export default SearchBar;
