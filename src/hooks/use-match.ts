import { createApiState, createFetch } from '@/lib/api';
import type { Match } from '@/types/match';
import { REGION_MAPPING, type SummonerRegion } from '@/types/regions';
import { useCallback, useState } from 'react';

export const useMatch = () => {
	const [match, setMatch] = useState<Match | null>(null);
	const { isLoading, retryAfter, error } = createApiState();
	const [state, setState] = useState({ isLoading, retryAfter, error });

	const fetchWithRetry = useCallback(
		createFetch((value) =>
			setState((prev) => ({ ...prev, retryAfter: value })),
		),
		[],
	);

	const fetchMatch = useCallback(
		async (matchId: string, region: SummonerRegion) => {
			setState((prev) => ({ ...prev, isLoading: true, error: null }));
			try {
				const mappedRegion = REGION_MAPPING[region];
				const path = `lol/match/v5/matches/${matchId}`;
				const response = await fetchWithRetry(
					`/api/riot/${path}?region=${mappedRegion}`,
					3,
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch match (${response.status})`);
				}

				const data = await response.json();
				setMatch(data);
				return data;
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

	return { fetchMatch, match, ...state };
};
