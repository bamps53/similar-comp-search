// src/components/Home.tsx
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ToggleSwitch from './ToggleSwitch';
import SearchResults from './SearchResults';

const Home: React.FC = () => {
    const [isSolutionSearch, setIsSolutionSearch] = useState(false);
    const [searchParams, setSearchParams] = useState<any>(null);

    const handleToggle = (isSolution: boolean) => {
        setIsSolutionSearch(isSolution);
    };

    const handleSearch = (params: any) => {
        setSearchParams(params);
    };

    return (
        <div>
            <h1>ようこそ、類似コンペ検索サイトへ</h1>
            <ToggleSwitch onToggle={handleToggle} />
            <SearchBar onSearch={handleSearch} />
            {searchParams && (
                <SearchResults
                    isSolutionSearch={isSolutionSearch}
                    searchParams={searchParams}
                />
            )}
        </div>
    );
};

export default Home;
