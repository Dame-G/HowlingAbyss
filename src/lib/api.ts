export const createFetch = (setRetryAfter?: (value: number) => void) => {
	const fetchWithRetry = async (
		url: string,
		attempts = 3,
	): Promise<Response> => {
		const response = await fetch(url);

		if (response.status === 429 && attempts > 1) {
			const retryAfter = response.headers.get('Retry-After') || '1';
			const delay = Number.parseInt(retryAfter) * 1000;
			setRetryAfter?.(Number.parseInt(retryAfter));

			await new Promise((resolve) => setTimeout(resolve, delay));
			return fetchWithRetry(url, attempts - 1);
		}

		setRetryAfter?.(0);
		return response;
	};

	return fetchWithRetry;
};

export const createApiState = () => {
	return {
		isLoading: false,
		retryAfter: 0,
		error: null as string | null,
	};
};
