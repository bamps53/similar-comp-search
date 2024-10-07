// src/pages/SolutionDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Spinner,
  Center,
  VStack,
} from "@chakra-ui/react";
import { useSolutionDetail } from "../hooks/useSolutionDetail";

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { solution, error } = useSolutionDetail(id);

  if (error) {
    return (
      <Center>
        <Text color="red.500" aria-label="エラーメッセージ">
          {error}
        </Text>
      </Center>
    );
  }

  if (!solution) {
    return (
      <Center>
        <Spinner size="xl" aria-label="読み込み中" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4} aria-label="ソリューション詳細">
        ソリューション詳細
      </Heading>
      <VStack align="start" spacing={4}>
        <Text aria-label="ソリューション説明">{solution.description}</Text>
        <ChakraLink
          href={solution.link}
          isExternal
          color="teal.500"
          aria-label="ソリューションリンク"
        >
          ソリューションリンク
        </ChakraLink>
        <ChakraLink
          href={solution.repository_link}
          isExternal
          color="teal.500"
          aria-label="リポジトリリンク"
        >
          リポジトリリンク
        </ChakraLink>
        {/* 他の情報を表示 */}
      </VStack>
    </Box>
  );
};

export default SolutionDetail;
