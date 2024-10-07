// src/pages/CompetitionDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Spinner, Center, VStack } from "@chakra-ui/react";

interface Competition {
  id: number;
  title: string;
  subtitle: string;
  domain: string;
  // 他のフィールド
}

const CompetitionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/competitions/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Competition not found");
        }
        return res.json();
      })
      .then((data) => setCompetition(data))
      .catch(() => setError("コンペティションが見つかりませんでした"));
  }, [id]);

  if (error) {
    return (
      <Center>
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!competition) {
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack align="start" spacing={4}>
        <Heading>{competition.title}</Heading>
        <Text fontSize="lg">{competition.subtitle}</Text>
        <Text>ドメイン: {competition.domain}</Text>
        {/* 他の情報を表示 */}
      </VStack>
    </Box>
  );
};

export default CompetitionDetail;
