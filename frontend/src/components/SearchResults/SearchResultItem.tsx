// src/components/SearchResults/SearchResultItem.tsx
import React from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { ResultItem } from "../../pages/Home";

interface SearchResultItemProps {
  item: ResultItem;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  return (
    <GridItem
      w="100%"
      bg="white"
      shadow="md"
      borderRadius="md"
      p={4}
      aria-label={`検索結果アイテム ${item.title}`}
    >
      <Text fontSize="xl" fontWeight="bold">
        {item.title}
      </Text>
      <Text>{item.domain}</Text>
      {/* 他の情報 */}
    </GridItem>
  );
};

export default SearchResultItem;
