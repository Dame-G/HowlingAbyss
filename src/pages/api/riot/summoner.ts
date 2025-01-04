import { REGION_MAPPING, type SummonerRegion } from '@/types/regions';
import type { APIRoute } from 'astro';
import { rateLimiter } from '../../../lib/rate-limiter';

async function fetchWithRateLimit(url: string, apiKey: string) {
	const waitTime = await rateLimiter.shouldWait();
	if (waitTime > 0) {
		await new Promise((resolve) => setTimeout(resolve, waitTime));
	}

	const response = await fetch(url, {
		headers: {
			'X-Riot-Token': apiKey,
		},
	});

	rateLimiter.parseHeaders(response.headers);
	if (response.ok) {
		rateLimiter.incrementCount();
	}

	return response;
}

async function fetchMatchIds(
	region: string,
	puuid: string,
	queue: string | null,
	apiKey: string,
	start: number,
	count: number,
) {
	const matchesUrl = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}${queue ? `&queue=${queue}` : ''}`;
	const matchesResponse = await fetchWithRateLimit(matchesUrl, apiKey);
	if (!matchesResponse.ok) {
		throw new Error(`Matches fetch failed: ${matchesResponse.status}`);
	}
	return await matchesResponse.json();
}

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const region = searchParams.get('region') as SummonerRegion;
	const gameName = searchParams.get('gameName');
	const tagLine = searchParams.get('tagLine');
	const queue = searchParams.get('queue');
	const apiKey = import.meta.env.RIOT_API_KEY;

	if (!region || !gameName || !tagLine) {
		return new Response('Missing required parameters', { status: 400 });
	}

	try {
		// 1. Fetch account data
		const mappedRegion = REGION_MAPPING[region];
		const accountUrl = `https://${mappedRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
		const accountResponse = await fetchWithRateLimit(accountUrl, apiKey);
		if (!accountResponse.ok) {
			throw new Error(`Account fetch failed: ${accountResponse.status}`);
		}
		const accountData = await accountResponse.json();

		// 2. Fetch summoner data using PUUID
		const summonerUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${accountData.puuid}`;
		const summonerResponse = await fetchWithRateLimit(summonerUrl, apiKey);
		if (!summonerResponse.ok) {
			throw new Error(`Summoner fetch failed: ${summonerResponse.status}`);
		}
		const summonerData = await summonerResponse.json();

		// 3. Fetch match IDs in batches
		const allMatchIds = [];
		const batchSize = 100;
		const maxMatches = 1000;

		for (let start = 0; start < maxMatches; start += batchSize) {
			const batchMatchIds = await fetchMatchIds(
				mappedRegion,
				accountData.puuid,
				queue,
				apiKey,
				start,
				batchSize,
			);

			if (batchMatchIds.length === 0) break;
			allMatchIds.push(...batchMatchIds);
		}

		// 4. TODO: Fetch match data for each match ID stored in db only if it exists

		return new Response(
			JSON.stringify({
				account: accountData,
				summoner: summonerData,
				matchIds: allMatchIds,
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				error:
					error instanceof Error ? error.message : 'An unknown error occurred',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}
};
