import type { Account } from '@/types/account';
import type { Summoner } from '@/types/summoner';

interface SummonerDisplayProps {
	account?: Account;
	summoner?: Summoner;
	error?: string;
}

export function SummonerDisplay({
	account,
	summoner,
	error,
}: SummonerDisplayProps) {
	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	return (
		<div className="space-y-2">
			{summoner && (
				<div>
					<img
						src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${summoner.profileIconId}.webp`}
						alt="Profile Icon"
					/>
					<div>
						{account?.gameName}#{account?.tagLine}
						{account?.puuid}
					</div>
				</div>
			)}
		</div>
	);
}
