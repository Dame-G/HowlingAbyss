import type { Match } from '@/types/match';
import { REGION_MAPPING, type SummonerRegion } from '@/types/regions';
import type { APIRoute } from 'astro';
import { rateLimiter } from '../../../lib/rate-limiter';

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const region = searchParams.get('region') as SummonerRegion;
	const matchIds = searchParams.get('ids')?.split(',') || [];
	const apiKey = import.meta.env.RIOT_API_KEY;

	if (!region || matchIds.length === 0) {
		return new Response('Missing required parameters', { status: 400 });
	}

	try {
		const mappedRegion = REGION_MAPPING[region];
		const matches: Match[] = [];

		for (const matchId of matchIds) {
			const waitTime = await rateLimiter.shouldWait();
			if (waitTime > 0) {
				await new Promise((resolve) => setTimeout(resolve, waitTime));
			}

			const matchUrl = `https://${mappedRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
			const response = await fetch(matchUrl, {
				headers: { 'X-Riot-Token': apiKey },
			});

			rateLimiter.parseHeaders(response.headers);
			if (response.ok) {
				rateLimiter.incrementCount();
				const match = await response.json();

				matches.push(match);
			}
		}

		return new Response(JSON.stringify(matches), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				error:
					error instanceof Error ? error.message : 'An unknown error occurred',
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		);
	}
};
