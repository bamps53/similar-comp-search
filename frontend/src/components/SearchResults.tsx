// src/components/SearchResults.tsx
import React, { useEffect, useState } from 'react';

interface ResultItem {
  id: number;
  title: string;
  domain: string;
  // 他のフィールド
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/competitions/search')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setResults(data))
      .catch((error) => setError('データの取得に失敗しました'));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (results.length === 0) {
    return <div>結果が見つかりませんでした</div>;
  }

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.domain}</p>
          {/* 他の情報 */}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
