import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import type { Account } from '@/types/account';
import type { ApiResponse } from '@/types/api';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getAccount = () => {
	return defineAction({
		input: z.object({
			summonerName: z.string(),
			tagline: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<ApiResponse<Account>> => {
			const mappedRegion = REGION_MAPPING[input.region];
			const url = `https://${mappedRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${input.summonerName}/${input.tagline}`;

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

export default getAccount();
