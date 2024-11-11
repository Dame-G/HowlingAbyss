import type { Account } from '@/types/account';
import type { MatchIds } from '@/types/matches';
import type { Summoner } from '@/types/summoner';
import { MatchList } from './match-list';

interface SummonerProfileProps {
	account: Account | null;
	summoner: Summoner | null;
	matches: MatchIds | null;
}

export function SummonerProfile({
	account,
	summoner,
	matches,
}: SummonerProfileProps) {
	if (!summoner) return null;

	return (
		<div className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 p-2 transition-colors">
			<div className="flex gap-4">
				<img
					src={`https://ddragon-webp.lolmath.net/latest/img/profileicon/${summoner.profileIconId}.webp`}
					alt="profile icon"
					className="h-[64px] w-[64px] rounded-sm border border-gold-300/50 lg:h-[128px] lg:w-[128px]"
				/>
				<div className="flex flex-col justify-center">
					<h2 className="truncate font-bold text-lg lg:text-2xl">
						{account?.gameName}#{account?.tagLine}
					</h2>
					<p className="text-sm lg:text-lg">Level: {summoner.summonerLevel}</p>
				</div>
			</div>

			{matches && <MatchList matches={matches} />}
		</div>
	);
}
