// src/pages/SolutionDetail.tsx
import React, { useEffect, useState } from "react";
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

interface Solution {
  id: number;
  description: string;
  link: string;
  repository_link: string;
  // 他のフィールド
}

const SolutionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/solutions/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Solution not found");
        }
        return res.json();
      })
      .then((data) => setSolution(data))
      .catch(() => setError("ソリューションが見つかりませんでした"));
  }, [id]);

  if (error) {
    return (
      <Center>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!solution) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>ソリューション詳細</Heading>
      <VStack align="start" spacing={4}>
        <Text>{solution.description}</Text>
        <ChakraLink href={solution.link} isExternal color="teal.500">
          ソリューションリンク
        </ChakraLink>
        <ChakraLink href={solution.repository_link} isExternal color="teal.500">
          リポジトリリンク
        </ChakraLink>
        {/* 他の情報を表示 */}
      </VStack>
    </Box>
  );
};

export default SolutionDetail;
