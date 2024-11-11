export type ApiResponse<T> = {
	data?: T;
	error?: string;
	retryAfter?: number;
};
