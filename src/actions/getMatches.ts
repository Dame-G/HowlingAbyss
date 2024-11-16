import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { type RiotAPIResponse, request } from '@/lib/api';
import type { MatchIds } from '@/types/matches';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getMatches = () => {
	return defineAction({
		input: z.object({
			puuid: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<RiotAPIResponse<MatchIds>> => {
			const mappedRegion = REGION_MAPPING[input.region];
			const endpoint = '/lol/match/v5/matches/by-puuid';
			const allMatches: string[] = [];
			let start = 0;
			const count = 100;

			while (start < 1000) {
				const queryParams = new URLSearchParams({
					start: start.toString(),
					count: count.toString(),
				});

				const url = `https://${mappedRegion}.api.riotgames.com${endpoint}/${input.puuid}/ids?${queryParams}`;
				const response = await request<string[]>(endpoint, url);

				if (!response.data || response.data.length === 0) {
					break;
				}

				allMatches.push(...response.data);
				if (response.data.length < count) {
					break;
				}

				start += count;
			}

			return {
				data: allMatches,
			};
		},
	});
};

export default getMatches();
