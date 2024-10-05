// src/components/CompetitionDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`/api/competitions/${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Competition not found');
                }
                return res.json();
            })
            .then((data) => setCompetition(data))
            .catch(() => setError('コンペティションが見つかりませんでした'));
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!competition) {
        return <div>読み込み中...</div>;
    }

    return (
        <div>
            <h1>{competition.title}</h1>
            <p>{competition.subtitle}</p>
            <p>{competition.domain}</p>
            {/* 他の情報を表示 */}
        </div>
    );
};

export default CompetitionDetail;

