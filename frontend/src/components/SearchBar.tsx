// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (params: {
        keyword: string;
        filters: any;
        similarity: string;
    }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('');
    const [filter, setFilter] = useState('');
    const [similarity, setSimilarity] = useState('');

    const handleSearch = () => {
        onSearch({
            keyword,
            filters: { filter },
            similarity,
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="検索キーワードを入力"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <label htmlFor="filter-select">フィルター</label>
            <select
                id="filter-select"
                aria-label="フィルター"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="">選択してください</option>
                <option value="NLP">NLP</option>
                <option value="Computer Vision">Computer Vision</option>
                {/* 他のオプション */}
            </select>
            <label htmlFor="similarity-select">類似性の観点</label>
            <select
                id="similarity-select"
                aria-label="類似性の観点"
                value={similarity}
                onChange={(e) => setSimilarity(e.target.value)}
            >
                <option value="">選択してください</option>
                <option value="ドメイン">ドメイン</option>
                <option value="タグ">タグ</option>
                {/* 他のオプション */}
            </select>
            <button onClick={handleSearch}>検索</button>
        </div>
    );
};

export default SearchBar;
