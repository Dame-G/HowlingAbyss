import { DEFAULT_STATS, statsRegistry } from '@/lib/stats/registry';
import type { Match } from '@/types/match';
import type { StatResult } from '@/types/stats';
import { useMemo } from 'react';

export const useMatchStats = (
	matches: Match[],
	puuid: string,
	statIds: string[] = DEFAULT_STATS,
) => {
	return useMemo(() => {
		if (!matches.length) return null;

		return statIds.reduce<Record<string, StatResult>>((acc, id) => {
			const calculator = statsRegistry[id];
			if (!calculator) return acc;

			acc[id] = calculator.calculate(matches, puuid);
			return acc;
		}, {});
	}, [matches, puuid, statIds]);
};
