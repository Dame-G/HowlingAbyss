type RateLimit = {
	limit: number;
	interval: number;
	count: number;
	lastReset: number;
};

class RateLimiter {
	private limits: Map<string, RateLimit> = new Map();

	parseHeaders(headers: Headers) {
		const parseLimits = (header: string | null) =>
			header?.split(',').map((limit) => {
				const [max, interval] = limit.split(':').map(Number);
				return { max, interval };
			}) ?? [];

		const parseCount = (header: string | null) =>
			header?.split(',').map((count) => {
				const [current, interval] = count.split(':').map(Number);
				return { current, interval };
			}) ?? [];

		const appLimits = parseLimits(headers.get('x-app-rate-limit'));
		const appCounts = parseCount(headers.get('x-app-rate-limit-count'));
		const methodLimits = parseLimits(headers.get('x-method-rate-limit'));
		const methodCounts = parseCount(headers.get('x-method-rate-limit-count'));

		const now = Date.now();

		[...appLimits, ...methodLimits].forEach((limit, index) => {
			const count = [...appCounts, ...methodCounts][index]?.current ?? 0;
			const key = `${limit.max}:${limit.interval}`;

			this.limits.set(key, {
				limit: limit.max,
				interval: limit.interval * 1000, // Convert to ms
				count,
				lastReset: now,
			});
		});
	}

	async shouldWait(): Promise<number> {
		const now = Date.now();
		let maxWait = 0;

		for (const [_, limit] of this.limits) {
			const timeSinceReset = now - limit.lastReset;

			// Reset counter if interval has elapsed
			if (timeSinceReset >= limit.interval) {
				limit.count = 0;
				limit.lastReset = now;
				continue;
			}

			// If we've hit the limit, calculate remaining time in current interval
			if (limit.count >= limit.limit) {
				const remainingTime = Math.max(0, limit.interval - timeSinceReset);
				maxWait = Math.max(maxWait, remainingTime);
			}
		}

		return maxWait;
	}

	incrementCount() {
		for (const limit of this.limits.values()) {
			limit.count++;
		}
	}
}

// Export as singleton to ensure rate limiting is shared across all requests
export const rateLimiter = new RateLimiter();

// Prevent multiple instances
export default rateLimiter;
