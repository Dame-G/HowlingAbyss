import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { ApiResponse } from '@/types/api';
import { SUMMONER_REGIONS } from '@/types/regions';
import type { Summoner } from '@/types/summoner';

const getSummoner = () => {
	return defineAction({
		input: z.object({
			puuid: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<ApiResponse<Summoner>> => {
			const url = `https://${input.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${input.puuid}`;

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

export default getSummoner();
