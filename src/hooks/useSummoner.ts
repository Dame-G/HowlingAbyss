import { actions } from 'astro:actions';
import { createApiHook } from '@/lib/hooks';
import type { SummonerRegion } from '@/types/regions';
import type { Summoner } from '@/types/summoner';

export function useSummoner() {
	const hook = createApiHook<Summoner, [string, SummonerRegion]>();
	const {
		data: summoner,
		error,
		isLoading,
		execute,
	} = hook((puuid, region) =>
		actions
			.getSummoner({ puuid, region })
			.then((r) => r?.data ?? { error: 'No data' }),
	);

	return {
		summoner,
		error,
		isLoading,
		getSummoner: execute,
	};
}
