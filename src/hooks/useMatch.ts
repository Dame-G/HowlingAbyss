import { actions } from 'astro:actions';
import { createApiHook } from '@/lib/hooks';
import type { Match } from '@/types/match';
import type { SummonerRegion } from '@/types/regions';

export function useMatch() {
	const hook = createApiHook<Match, [string, SummonerRegion]>();
	const {
		data: match,
		error,
		isLoading,
		execute,
	} = hook((matchId, region) =>
		actions
			.getMatch({ matchId, region })
			.then((r) => r?.data ?? { error: 'No data' }),
	);

	return {
		match,
		error,
		isLoading,
		getMatch: execute,
	};
}
