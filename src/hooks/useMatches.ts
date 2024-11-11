import { actions } from 'astro:actions';
import { createApiHook } from '@/lib/hooks';
import type { MatchIds } from '@/types/matches';
import type { SummonerRegion } from '@/types/regions';

export function useMatches() {
	const hook = createApiHook<MatchIds, [string, SummonerRegion]>();
	const {
		data: matches,
		error,
		isLoading,
		execute,
	} = hook((puuid, region) =>
		actions
			.getMatches({ puuid, region })
			.then((r) => r?.data ?? { error: 'No data' }),
	);

	return {
		matches,
		error,
		isLoading,
		getMatches: execute,
	};
}
