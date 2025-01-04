import type { Match } from '@/types/match';
import { useMemo } from 'react';
import { Button } from '../ui/button';

interface ChampionFilterProps {
	matches: Match[];
	puuid: string;
	selectedChampions: string[];
	onChampionToggle: (championId: string) => void;
}

export const ChampionFilter: React.FC<ChampionFilterProps> = ({
	matches,
	puuid,
	selectedChampions,
	onChampionToggle,
}) => {
	const champions = useMemo(() => {
		const champMap = new Map<string, { games: number; name: string }>();

		for (const match of matches) {
			const player = match.info.participants.find((p) => p.puuid === puuid);
			if (!player) continue;

			const champId = player.championId.toString();
			const current = champMap.get(champId) || {
				games: 0,
				name: player.championName,
			};
			champMap.set(champId, { ...current, games: current.games + 1 });
		}

		return Array.from(champMap.entries());
	}, [matches, puuid]);

	return (
		<div className="mb-4 flex flex-wrap gap-2">
			{champions.map(([champId, { name, games }]) => (
				<Button
					key={champId}
					onClick={() => onChampionToggle(champId)}
					className={`rounded px-3 py-1 ${
						selectedChampions.includes(champId)
							? 'bg-gold-400 text-black'
							: 'bg-gray-800 text-gold-300'
					}`}
				>
					{name} ({games})
				</Button>
			))}
		</div>
	);
};
