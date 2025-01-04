import { createApiState, createFetch } from '@/lib/api';
import type { Match } from '@/types/match';
import type { SummonerRegion } from '@/types/regions';
import { useCallback, useState } from 'react';

export const useMatchQueue = () => {
	const [matches, setMatches] = useState<Match[]>([]);
	const [progress, setProgress] = useState({
		loaded: 0,
		total: 0,
		available: 0,
	});
	const { isLoading, retryAfter, error } = createApiState();
	const [state, setState] = useState({ isLoading, retryAfter, error });

	const fetchWithRetry = useCallback(
		createFetch((value) =>
			setState((prev) => ({ ...prev, retryAfter: value })),
		),
		[],
	);

	const loadMatches = useCallback(
		async (
			matchIds: string[],
			region: SummonerRegion,
			options?: {
				startIndex?: number;
				batchSize?: number;
				maxMatches?: number;
			},
		) => {
			const {
				startIndex = 0,
				batchSize = 20,
				maxMatches = batchSize,
			} = options || {};

			setState((prev) => ({ ...prev, isLoading: true, error: null }));
			const endIndex = Math.min(startIndex + maxMatches, matchIds.length);
			const targetIds = matchIds.slice(startIndex, endIndex);

			setProgress((prev) => ({
				...prev,
				loaded: prev.loaded,
				total: endIndex - startIndex,
				available: matchIds.length,
			}));

			try {
				const loadedMatches: Match[] = [];

				for (let i = 0; i < targetIds.length; i += batchSize) {
					const batch = targetIds.slice(i, i + batchSize);
					const queryParams = new URLSearchParams({
						region,
						ids: batch.join(','),
					});

					const response = await fetchWithRetry(
						`/api/riot/matches?${queryParams}`,
					);
					if (!response.ok) {
						throw new Error(`Failed to fetch matches (${response.status})`);
					}

					const batchMatches = await response.json();
					loadedMatches.push(...batchMatches);

					setProgress((prev) => ({
						...prev,
						loaded: prev.loaded + batch.length,
					}));

					if (i + batchSize < targetIds.length) {
						await new Promise((resolve) => setTimeout(resolve, 1000));
					}
				}

				setMatches((prev) => [...prev, ...loadedMatches]);
				return loadedMatches;
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
		setMatches([]);
		setProgress({ loaded: 0, total: 0, available: 0 });
		setState({ isLoading: false, retryAfter: 0, error: null });
	}, []);

	return {
		loadMatches,
		reset,
		matches,
		progress,
		...state,
	};
};
