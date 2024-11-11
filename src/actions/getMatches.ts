import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { ApiResponse } from '@/types/api';
import type { MatchIds } from '@/types/matches';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getMatches = () => {
	return defineAction({
		input: z.object({
			puuid: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<ApiResponse<MatchIds>> => {
			try {
				const mappedRegion = REGION_MAPPING[input.region];
				const allMatches: string[] = [];
				let start = 0;
				const count = 100;

				while (true) {
					const queryParams = new URLSearchParams({
						start: start.toString(),
						count: count.toString(),
					});

					const url = `https://${mappedRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${input.puuid}/ids?${queryParams}`;

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

					const matches = await response.json();
					if (matches.length === 0) break;

					allMatches.push(...matches);
					start += count;

					await new Promise((resolve) => setTimeout(resolve, 100));
				}

				return { data: allMatches };
			} catch (error) {
				return {
					error: error instanceof Error ? error.message : 'Unknown error',
				};
			}
		},
	});
};

export default getMatches();
