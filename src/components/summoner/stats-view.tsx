import { useMatchStats } from '@/hooks/use-match-stats';
import type { Match } from '@/types/match';
import { useState } from 'react';
import { ChampionFilter } from './champion-filter';

interface StatsViewProps {
	matches: Match[];
	puuid: string;
	statIds?: string[];
}

export const StatsView: React.FC<StatsViewProps> = ({
	matches,
	puuid,
	statIds,
}) => {
	const [selectedChampions, setSelectedChampions] = useState<string[]>([]);

	const filteredMatches = matches.filter((match) => {
		if (selectedChampions.length === 0) return true;
		const player = match.info.participants.find((p) => p.puuid === puuid);
		return player && selectedChampions.includes(player.championId.toString());
	});

	const stats = useMatchStats(filteredMatches, puuid, statIds);

	if (!stats) return null;

	const handleChampionToggle = (championId: string) => {
		setSelectedChampions((prev) =>
			prev.includes(championId)
				? prev.filter((id) => id !== championId)
				: [...prev, championId],
		);
	};

	return (
		<div className="space-y-4">
			<ChampionFilter
				matches={matches}
				puuid={puuid}
				selectedChampions={selectedChampions}
				onChampionToggle={handleChampionToggle}
			/>
			<div className="grid grid-cols-2 gap-4">
				{Object.values(stats).map((stat) => (
					<StatsCard key={stat.label} label={stat.label} value={stat.value} />
				))}
			</div>
		</div>
	);
};

interface StatsCardProps {
	label: string;
	value: string | number;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => (
	<div className="text-center">
		<div className="text-gold-400 text-xl">{value}</div>
		<div className="text-gold-300">{label}</div>
	</div>
);
