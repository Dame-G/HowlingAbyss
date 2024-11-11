import { actions } from 'astro:actions';
import { createApiHook } from '@/lib/hooks';
import type { Account } from '@/types/account';
import type { SummonerRegion } from '@/types/regions';

export function useAccount() {
	const hook = createApiHook<Account, [string, string, SummonerRegion]>();
	const {
		data: account,
		error,
		isLoading,
		execute,
	} = hook((summonerName, tagline, region) =>
		actions
			.getAccount({ summonerName, tagline, region })
			.then((r) => r?.data ?? { error: 'No data' }),
	);

	return {
		account,
		error,
		isLoading,
		getAccount: execute,
	};
}
