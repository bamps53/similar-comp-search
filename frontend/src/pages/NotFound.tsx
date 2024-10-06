// src/components/NotFound.tsx
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const NotFound: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h1" size="2xl" mb={4}>
        ページが見つかりません
      </Heading>
      <Text fontSize="lg" mb={6}>
        申し訳ありませんが、お探しのページは存在しません。
      </Text>
      <Button colorScheme="teal" as={RouterLink} to="/">
        ホームページに戻る
      </Button>
    </Box>
  );
};

export default NotFound;
