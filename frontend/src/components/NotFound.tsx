// src/components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>ページが見つかりません</h1>
      <p>申し訳ありませんが、お探しのページは存在しません。</p>
      <Link to="/">ホームページに戻る</Link>
    </div>
  );
};

export default NotFound;
