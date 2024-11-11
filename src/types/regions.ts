export const SUMMONER_REGIONS = [
	'br1',
	'eun1',
	'euw1',
	'jp1',
	'kr',
	'la1',
	'la2',
	'na1',
	'oc1',
	'ph2',
	'ru',
	'sg2',
	'th2',
	'tr1',
	'tw2',
	'vn2',
] as const;

export type SummonerRegion = (typeof SUMMONER_REGIONS)[number];

export const REGION_MAPPING: Record<
	SummonerRegion,
	'americas' | 'asia' | 'europe' | 'esports'
> = {
	na1: 'americas',
	br1: 'americas',
	la1: 'americas',
	la2: 'americas',
	kr: 'asia',
	jp1: 'asia',
	ph2: 'asia',
	sg2: 'asia',
	th2: 'asia',
	tw2: 'asia',
	vn2: 'asia',
	eun1: 'europe',
	euw1: 'europe',
	tr1: 'europe',
	ru: 'europe',
	oc1: 'americas',
};
