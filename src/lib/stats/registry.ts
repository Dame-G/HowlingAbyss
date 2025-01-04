import type { StatRegistry } from '@/types/stats';
import { kdaCalculator } from './calculators/kda';
import { winRateCalculator } from './calculators/win-rate';

export const AVAILABLE_STATS = [winRateCalculator, kdaCalculator] as const;

export const statsRegistry: StatRegistry = AVAILABLE_STATS.reduce(
	(acc, calculator) =>
		Object.assign(acc, {
			[calculator.id]: calculator,
		}),
	{},
);

export const DEFAULT_STATS = AVAILABLE_STATS.map((calc) => calc.id);
