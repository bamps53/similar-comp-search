// src/hooks/useCompetitionDetail.ts
import { useState, useEffect } from "react";
import apiClient from "../utils/apiClient";

interface Competition {
  id: number;
  title: string;
  subtitle: string;
  domain: string;
  // 他のフィールド
}

export const useCompetitionDetail = (id: string | undefined) => {
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("無効なIDです");
      return;
    }

    const fetchCompetition = async () => {
      try {
        const response = await apiClient.get(`/api/competitions/${id}`);
        setCompetition(response.data);
      } catch {
        setError("コンペティションが見つかりませんでした");
      }
    };

    fetchCompetition();
  }, [id]);

  return { competition, error };
};
