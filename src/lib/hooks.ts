import type { ApiResponse } from '@/types/api';
import { useState } from 'react';
import { sleep } from './api';

export function createApiHook<TData, TParams extends unknown[]>() {
	return (apiCall: (...args: TParams) => Promise<ApiResponse<TData>>) => {
		const [data, setData] = useState<TData | null>(null);
		const [error, setError] = useState<string | null>(null);
		const [isLoading, setIsLoading] = useState(false);

		const execute = async (...args: TParams) => {
			setIsLoading(true);
			setError(null);

			try {
				const response = await apiCall(...args);

				if (!response) {
					throw new Error('API error');
				}

				if (response.error && response.retryAfter) {
					setError(
						`Rate limited. Retrying in ${response.retryAfter} seconds...`,
					);
					await sleep(response.retryAfter * 1000);
					return execute(...args);
				}

				if (response.error) {
					throw new Error(response.error);
				}

				setData(response.data || null);
				setError(null);
				setIsLoading(false);
				return response;
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error');
				setData(null);
				setIsLoading(false);
				return { error: err instanceof Error ? err.message : 'Unknown error' };
			}
		};

		return {
			data,
			error,
			isLoading,
			execute,
		};
	};
}
