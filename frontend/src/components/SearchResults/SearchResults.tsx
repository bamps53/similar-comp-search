// src/components/SearchResults/SearchResults.tsx
import React from "react";
import { Box, Text, Grid, Spinner, Center } from "@chakra-ui/react";
import SearchResultItem from "./SearchResultItem";
import { ResultItem } from "../../pages/Home";

export interface SearchResultsProps {
  results: ResultItem[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Center aria-live="polite">
        <Spinner size="xl" aria-label="読み込み中" />
      </Center>
    );
  }

  if (results.length === 0) {
    return (
      <Box p={4} aria-live="polite">
        <Text>結果が見つかりませんでした</Text>
      </Box>
    );
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      p={4}
      aria-label="検索結果一覧"
    >
      {results.map((item) => (
        <SearchResultItem key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default SearchResults;
