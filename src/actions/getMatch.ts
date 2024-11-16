import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { type RiotAPIResponse, request } from '@/lib/api';
import type { Match } from '@/types/match';
import { REGION_MAPPING, SUMMONER_REGIONS } from '@/types/regions';

const getMatch = () => {
	return defineAction({
		input: z.object({
			matchId: z.string(),
			region: z.enum(SUMMONER_REGIONS),
		}),
		handler: async (input): Promise<RiotAPIResponse<Match>> => {
			const mappedRegion = REGION_MAPPING[input.region];
			const endpoint = '/lol/match/v5/matches';
			const url = `https://${mappedRegion}.api.riotgames.com${endpoint}/${input.matchId}`;

			return await request<Match>(endpoint, url);
		},
	});
};

export default getMatch();
