import type { Match } from './match';

export interface StatCalculator {
	id: string;
	label: string;
	calculate: (matches: Match[], puuid: string) => StatResult;
}

export interface StatResult {
	value: string | number;
	label: string;
}

export type StatRegistry = Record<string, StatCalculator>;
