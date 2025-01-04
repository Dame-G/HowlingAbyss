import { createApiState, createFetch } from '@/lib/api';
import type { SummonerRegion } from '@/types/regions';
import type { SummonerData } from '@/types/summoner';
import { useCallback, useState } from 'react';

export const useSummonerData = () => {
	const [data, setData] = useState<SummonerData | null>(null);
	const { isLoading, retryAfter, error } = createApiState();
	const [state, setState] = useState({ isLoading, retryAfter, error });

	const fetchWithRetry = useCallback(
		createFetch((value) =>
			setState((prev) => ({ ...prev, retryAfter: value })),
		),
		[],
	);

	const fetchSummonerData = useCallback(
		async (
			gameName: string,
			tagLine: string,
			region: SummonerRegion,
			queue?: number,
		) => {
			setState((prev) => ({ ...prev, isLoading: true, error: null }));

			try {
				const queryParams = new URLSearchParams({
					region,
					gameName,
					tagLine,
					...(queue && { queue: queue.toString() }),
				});

				const response = await fetchWithRetry(
					`/api/riot/summoner?${queryParams}`,
					3,
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch data (${response.status})`);
				}

				const responseData = await response.json();
				setData(responseData);
				return responseData;
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'An unknown error occurred';
				setState((prev) => ({ ...prev, error: errorMessage }));
				throw err;
			} finally {
				setState((prev) => ({ ...prev, isLoading: false }));
			}
		},
		[fetchWithRetry],
	);

	const reset = useCallback(() => {
		setData(null);
		setState({ isLoading: false, retryAfter: 0, error: null });
	}, []);

	return {
		fetchSummonerData,
		data,
		reset,
		...state,
	};
};
