import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { type RiotAPIResponse, request } from '@/lib/api';
import { SUMMONER_REGIONS } from '@/types/regions';
import type { Summoner } from '@/types/summoner';

const getSummoner = () => {
	return defineAction({
		input: z.object({
			puuid: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<RiotAPIResponse<Summoner>> => {
			const endpoint = '/lol/summoner/v4/summoners/by-puuid';
			const url = `https://${input.region}.api.riotgames.com${endpoint}/${input.puuid}`;

			return request<Summoner>(endpoint, url);
		},
	});
};

export default getSummoner();
