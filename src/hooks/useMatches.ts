import { actions } from 'astro:actions';
import type { Limits } from '@/lib/api';
import type { MatchIds } from '@/types/matches';
import type { SUMMONER_REGIONS } from '@/types/regions';
import { useCallback, useState } from 'react';

export const useMatches = () => {
	const [data, setData] = useState<MatchIds | undefined>();
	const [limits, setLimits] = useState<Limits | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	const fetch = useCallback(
		async (puuid: string, region: (typeof SUMMONER_REGIONS)[number]) => {
			setIsLoading(true);
			setError(undefined);

			try {
				const { data: result, error } = await actions.getMatches({
					puuid,
					region,
				});

				if (error) {
					setError(error.message);
					return;
				}

				if (result?.error) {
					setError(result.error);
					return;
				}

				setLimits(result.limits);
				setData(result?.data);
			} catch (e) {
				setError(e instanceof Error ? e.message : 'Unknown error occurred');
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	return {
		fetch,
		data,
		limits,
		setData,
		error,
		isLoading,
	};
};
