import type { StatCalculator } from '@/types/stats';

export const winRateCalculator: StatCalculator = {
	id: 'winRate',
	label: 'Win Rate',
	calculate: (matches, puuid) => {
		const stats = matches.reduce(
			(acc, match) => {
				const participant = match.info.participants.find(
					(p) => p.puuid === puuid,
				);
				if (!participant) return acc;
				return {
					wins: acc.wins + (participant.win ? 1 : 0),
					total: acc.total + 1,
				};
			},
			{ wins: 0, total: 0 },
		);

		const winRate = (stats.wins / stats.total) * 100;

		return {
			value: `${winRate.toFixed(1)}%`,
			label: 'Win Rate',
		};
	},
};
