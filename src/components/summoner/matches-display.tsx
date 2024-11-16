import { useMatch } from '@/hooks/useMatch';
import type { MatchIds } from '@/types/matches';
import type { SUMMONER_REGIONS } from '@/types/regions';
import { Button } from '../ui/button';

interface MatchesDisplayProps {
	matches?: MatchIds;
	region: (typeof SUMMONER_REGIONS)[number];
	error?: string;
}

export function MatchesDisplay({
	matches,
	region,
	error,
}: MatchesDisplayProps) {
	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
	if (!matches) return null;

	return (
		<div>
			{matches.map((matchId) => {
				const {
					fetch: fetchMatch,
					data: match,
					isLoading,
					error: matchError,
				} = useMatch();
				return (
					<div key={matchId}>
						{isLoading ? (
							<p>Loading...</p>
						) : matchError ? (
							<pre>{JSON.stringify(matchError, null, 2)}</pre>
						) : (
							<Button onClick={() => fetchMatch(matchId, region)}>
								{matchId}
							</Button>
						)}
					</div>
				);
			})}
		</div>
	);
}
