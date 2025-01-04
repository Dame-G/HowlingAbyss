import type { StatCalculator } from '@/types/stats';

export const kdaCalculator: StatCalculator = {
	id: 'kda',
	label: 'KDA',
	calculate: (matches, puuid) => {
		const stats = matches.reduce(
			(acc, match) => {
				const participant = match.info.participants.find(
					(p) => p.puuid === puuid,
				);
				if (!participant) return acc;
				return {
					kills: acc.kills + participant.kills,
					deaths: acc.deaths + participant.deaths,
					assists: acc.assists + participant.assists,
					total: acc.total + 1,
				};
			},
			{ kills: 0, deaths: 0, assists: 0, total: 0 },
		);

		const avgK = stats.kills / stats.total;
		const avgD = stats.deaths / stats.total;
		const avgA = stats.assists / stats.total;
		const kda = avgD === 0 ? avgK + avgA : (avgK + avgA) / avgD;

		return {
			value: kda.toFixed(2),
			label: 'KDA',
		};
	},
};
