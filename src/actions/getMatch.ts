import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { ApiResponse } from '@/types/api';
import type { Match } from '@/types/match';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getMatch = () => {
	return defineAction({
		input: z.object({
			matchId: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<ApiResponse<Match>> => {
			const mappedRegion = REGION_MAPPING[input.region];
			const url = `https://${mappedRegion}.api.riotgames.com/lol/match/v5/matches/${input.matchId}`;

			const response = await fetch(url, {
				headers: {
					'X-Riot-Token': import.meta.env.RIOT_API_KEY,
				},
			});

			if (response.status === 429) {
				const retryAfter = Number.parseInt(
					response.headers.get('retry-after') || '60',
				);
				return {
					error: 'Rate limit exceeded',
					retryAfter,
				};
			}

			if (!response.ok) {
				return {
					error: `API error: ${response.status}`,
				};
			}

			const data = await response.json();
			return { data };
		},
	});
};

export default getMatch();
