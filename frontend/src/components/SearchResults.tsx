// components/SearchResults/SearchResults.tsx
import React from "react";
import { Box, Text, Grid, GridItem, Spinner, Center } from "@chakra-ui/react";
import { ResultItem } from "../pages/Home";

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
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (results.length === 0) {
    return (
      <Box p={4}>
        <Text>結果が見つかりませんでした</Text>
      </Box>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={4}>
      {results.map((item) => (
        <GridItem
          key={item.id}
          w="100%"
          bg="white"
          shadow="md"
          borderRadius="md"
          p={4}
        >
          <Text fontSize="xl" fontWeight="bold">
            {item.title}
          </Text>
          <Text>{item.domain}</Text>
          {/* 他の情報 */}
        </GridItem>
      ))}
    </Grid>
  );
};

export default SearchResults;
