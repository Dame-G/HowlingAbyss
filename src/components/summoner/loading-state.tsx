import { AlertCircle, Loader2 } from 'lucide-react';

interface LoadingStateProps {
	error: string | null;
	retryAfter: number;
	isLoading: boolean;
}

export function LoadingState({
	error,
	retryAfter,
	isLoading,
}: LoadingStateProps) {
	if (!error && retryAfter <= 0 && !isLoading) return null;

	return (
		<div className="mt-8 flex flex-col items-center justify-center gap-4">
			{error ? (
				<div className="flex items-center gap-3 text-red-400">
					<AlertCircle className="h-5 w-5" />
					<span className="font-light tracking-wide">{error}</span>
				</div>
			) : retryAfter > 0 ? (
				<div className="flex items-center gap-3 text-gold-300/70">
					<Loader2 className="h-5 w-5 animate-spin" />
					<span className="font-light tracking-wide">
						Retrying in {retryAfter}s...
					</span>
				</div>
			) : (
				isLoading && (
					<div className="flex items-center gap-3 text-gold-300/70">
						<div className="flex gap-2">
							{[1, 2, 3].map((i) => (
								<div key={i} className="h-2 w-2 rounded-full bg-gold-400" />
							))}
						</div>
					</div>
				)
			)}
		</div>
	);
}
