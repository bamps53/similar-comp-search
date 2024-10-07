// src/hooks/useSearch.ts
import { useState } from "react";
import { ResultItem } from "../pages/Home";

export interface SearchParams {
  keyword: string;
  filter: string;
  similarity: string;
}

export const useSearch = (isSolutionSearch: boolean) => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    try {
      const endpoint = isSolutionSearch
        ? "/api/solutions/search"
        : "/api/competitions/search";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // エラーハンドリングを追加できます
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, handleSearch };
};
