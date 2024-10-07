// src/pages/CompetitionDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, Spinner, Center, VStack } from "@chakra-ui/react";
import { useCompetitionDetail } from "../hooks/useCompetitionDetail";

const CompetitionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { competition, error } = useCompetitionDetail(id);

  if (error) {
    return (
      <Center>
        <Text color="red.500" aria-label="エラーメッセージ">
          {error}
        </Text>
      </Center>
    );
  }

  if (!competition) {
    return (
      <Center>
        <Spinner size="xl" aria-label="読み込み中" />
      </Center>
    );
  }

  return (
    <Box p={6}>
      <VStack align="start" spacing={4}>
        <Heading aria-label="コンペタイトル">{competition.title}</Heading>
        <Text fontSize="lg" aria-label="コンペサブタイトル">
          {competition.subtitle}
        </Text>
        <Text aria-label="ドメイン">ドメイン: {competition.domain}</Text>
        {/* 他の情報を表示 */}
      </VStack>
    </Box>
  );
};

export default CompetitionDetail;
