interface RateLimit {
	used: string;
	limit: string;
	interval: string;
	resetsAt: number;
}

export interface Limits {
	app: RateLimit[];
	methods: {
		[key: string]: RateLimit;
	};
}

export interface RiotAPIResponse<T> {
	data?: T;
	error?: string;
	limits?: Limits;
}

const parseRateLimit = (header: string | null) =>
	header?.split(',').map((limit) => limit.split(':')) ?? [];

export const limits: Limits = {
	app: [],
	methods: {},
};

const updateLimits = (response: Response, endpoint: string) => {
	const headers = response.headers;

	const appLimits = parseRateLimit(headers.get('X-App-Rate-Limit'));
	const appLimitsCount = parseRateLimit(headers.get('X-App-Rate-Limit-Count'));
	const numberOfAppLimits = appLimits.map((limit) => limit[0]).length;
	const app = Array.from({ length: numberOfAppLimits }, (_, i) => {
		const [limit, interval] = appLimits[i];
		const [used] = appLimitsCount[i];

		if (Number(used) === 1) {
			const resetsAt = new Date(Date.now() + Number(interval) * 1000).getTime();
			return {
				used,
				limit,
				interval,
				resetsAt,
			};
		}
		return {
			used,
			limit,
			interval,
			resetsAt: limits.app[i]?.resetsAt || 0,
		};
	});

	limits.app = app;

	const [methodLimit = ''] = parseRateLimit(headers.get('X-Method-Rate-Limit'));
	const [methodLimitCount = ''] = parseRateLimit(
		headers.get('X-Method-Rate-Limit-Count'),
	);
	const method = {
		used: methodLimitCount[0],
		limit: methodLimit[0],
		interval: methodLimit[1],
		resetsAt:
			methodLimitCount[0] === '1'
				? new Date(Date.now() + Number(methodLimit[1]) * 1000).getTime()
				: limits.methods[endpoint]?.resetsAt || 0,
	};

	limits.methods[endpoint] = method;

	for (const methodData of Object.values(limits.methods)) {
		if (methodData.resetsAt < new Date().getTime()) {
			methodData.used = '0';
		}
	}

	const retryAfter = headers.get('Retry-After');

	if (retryAfter) {
		return { app, method, retryAfter };
	}

	return { app, method };
};

export const request = <T>(
	endpoint: string,
	url: string,
): Promise<RiotAPIResponse<T>> => {
	return new Promise((resolve, reject) => {
		fetch(url, {
			headers: { 'X-Riot-Token': import.meta.env.RIOT_API_KEY },
		})
			.then(async (response) => {
				if (!response.ok) {
					resolve({ error: response.statusText });
					return;
				}

				updateLimits(response, endpoint);

				const data = await response.json();
				resolve({ data, limits });
			})
			.catch(reject);
	});
};
