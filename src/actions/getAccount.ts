import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { type RiotAPIResponse, request } from '@/lib/api';
import type { Account } from '@/types/account';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getAccount = () => {
	return defineAction({
		input: z.object({
			gameName: z.string(),
			tagLine: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<RiotAPIResponse<Account>> => {
			const mappedRegion = REGION_MAPPING[input.region];
			const endpoint = '/riot/account/v1/accounts/by-riot-id';
			const url = `https://${mappedRegion}.api.riotgames.com${endpoint}/${input.gameName}/${input.tagLine}`;

			return request<Account>(endpoint, url);
		},
	});
};

export default getAccount();
