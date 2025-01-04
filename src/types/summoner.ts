import type { Account } from './account';

export interface Summoner {
	id: string;
	accountId: string;
	puuid: string;
	name: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number;
}

export interface SummonerData {
	account: Account;
	summoner: Summoner;
	matchIds: string[];
}
