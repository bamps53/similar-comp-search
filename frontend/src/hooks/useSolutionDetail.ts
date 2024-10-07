// src/hooks/useSolutionDetail.ts
import { useState, useEffect } from "react";

interface Solution {
  id: number;
  description: string;
  link: string;
  repository_link: string;
  // 他のフィールド
}

export const useSolutionDetail = (id: string | undefined) => {
  const [solution, setSolution] = useState<Solution | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("無効なIDです");
      return;
    }

    const fetchSolution = async () => {
      try {
        const res = await fetch(`/api/solutions/${id}`);
        if (!res.ok) {
          throw new Error("Solution not found");
        }
        const data = await res.json();
        setSolution(data);
      } catch {
        setError("ソリューションが見つかりませんでした");
      }
    };

    fetchSolution();
  }, [id]);

  return { solution, error };
};
