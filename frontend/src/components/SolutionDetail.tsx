// src/components/SolutionDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/solutions/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Solution not found');
                }
                return res.json();
            })
            .then((data) => setSolution(data))
            .catch(() => setError('ソリューションが見つかりませんでした'));
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!solution) {
        return <div>読み込み中...</div>;
    }

    return (
        <div>
            <h1>ソリューション詳細</h1>
            <p>{solution.description}</p>
            <a href={solution.link} target="_blank" rel="noopener noreferrer">
                ソリューションリンク
            </a>
            <a
                href={solution.repository_link}
                target="_blank"
                rel="noopener noreferrer"
            >
                リポジトリリンク
            </a>
            {/* 他の情報を表示 */}
        </div>
    );
};

export default SolutionDetail;
