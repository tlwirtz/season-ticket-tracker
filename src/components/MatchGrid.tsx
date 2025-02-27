import React from 'react';
import { Match } from '../../types/match';
import MatchCard from './MatchCard';

interface MatchGridProps {
    matches: Match[];
    useAdminLayout?: boolean;
}

const MatchGrid: React.FC<MatchGridProps> = ({ matches, useAdminLayout = false }) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 p-6 sm:p-6">
            {matches.map(match => (
                <MatchCard key={match.id} match={match} useAdminLayout={useAdminLayout} />
            ))}
        </div>
    );
};

export default MatchGrid;
