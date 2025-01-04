import { useMatchQueue } from '@/hooks/use-match-queue';
import type { SummonerRegion } from '@/types/regions';
import type { SummonerData } from '@/types/summoner';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { StatsView } from './stats-view';

interface AccountProps {
	data: SummonerData;
	region: SummonerRegion;
}

const INITIAL_MATCHES = 1;
const LOAD_MORE_INCREMENT = 5;

export const SummonerView: React.FC<AccountProps> = ({ data, region }) => {
	const {
		loadMatches,
		reset,
		matches,
		progress,
		isLoading,
		retryAfter,
		error,
	} = useMatchQueue();
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		reset();
		loadMatches(data.matchIds, region, {
			startIndex: 0,
			maxMatches: INITIAL_MATCHES,
		});
		setCurrentIndex(INITIAL_MATCHES);
	}, [data.matchIds, region, loadMatches, reset]);

	const handleLoadMore = () => {
		if (currentIndex >= data.matchIds.length) return;

		loadMatches(data.matchIds, region, {
			startIndex: currentIndex,
			maxMatches: LOAD_MORE_INCREMENT,
		});
		setCurrentIndex((prev) => prev + LOAD_MORE_INCREMENT);
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="text-gold-300">
					Fetched {progress.loaded} of {progress.available} matches
				</div>
				{currentIndex < data.matchIds.length && (
					<Button
						onClick={handleLoadMore}
						disabled={isLoading || retryAfter > 0}
						className="h-14 border-gold-300/30 border-b-2 text-gold-300 hover:border-gold-400/50 hover:text-gold-400"
					>
						{isLoading
							? 'Loading...'
							: retryAfter > 0
								? 'Retrying...'
								: 'Load More'}
					</Button>
				)}
			</div>
			{error && <div className="text-red-500">{error}</div>}
			{matches.length > 0 && (
				<StatsView matches={matches} puuid={data.account.puuid} />
			)}
			<div className="space-y-2">
				{/* Your match list rendering code here */}
			</div>
		</div>
	);
};

export default SummonerView;
