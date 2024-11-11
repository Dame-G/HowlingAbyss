import { SummonerProfile } from '@/components/summoner/summoner-profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAccount } from '@/hooks/useAccount';
import { useMatches } from '@/hooks/useMatches';
import { useSummoner } from '@/hooks/useSummoner';
import { SUMMONER_REGIONS } from '@/types/regions';
import { useState } from 'react';

export function SummonerSearch() {
	const [summonerName, setSummonerName] = useState('');
	const [selectedRegion, setSelectedRegion] = useState<
		(typeof SUMMONER_REGIONS)[number]
	>(SUMMONER_REGIONS[7]);
	const {
		account,
		error: accountError,
		isLoading: accountLoading,
		getAccount,
	} = useAccount();
	const {
		summoner,
		error: summonerError,
		isLoading: summonerLoading,
		getSummoner,
	} = useSummoner();
	const {
		matches,
		error: matchesError,
		isLoading: matchesLoading,
		getMatches,
	} = useMatches();

	const handleSearch = async () => {
		if (!summonerName) return;
		const accountResponse = await getAccount(
			summonerName.split('#')[0],
			summonerName.split('#')[1] || '',
			selectedRegion,
		);

		if (accountResponse?.data?.puuid) {
			await getSummoner(accountResponse.data.puuid, selectedRegion);
			await getMatches(accountResponse.data.puuid, selectedRegion);
		}
	};

	const isLoading = accountLoading || summonerLoading || matchesLoading;
	const error = accountError || summonerError || matchesError;

	return (
		<div className="mx-auto w-full max-w-2xl space-y-2">
			<div className="flex gap-2 rounded-md">
				<Select
					value={selectedRegion}
					onValueChange={(value: string) =>
						setSelectedRegion(value as typeof selectedRegion)
					}
					disabled={isLoading}
				>
					<SelectTrigger
						className={
							'w-1/4 min-w-[100px] justify-between rounded-none border-0 border-gold-300 border-b bg-transparent px-1 text-gold-300 transition-all duration-75 focus:outline-0 focus:ring-0 focus:ring-offset-0 sm:w-[180px] [&>span]:text-primary-foreground'
						}
					>
						<SelectValue placeholder="Select region" />
					</SelectTrigger>
					<SelectContent className="w-full rounded-sm border-gold-300 bg-blue-700 text-gold-300">
						{SUMMONER_REGIONS.map((region) => (
							<SelectItem
								key={region}
								value={region}
								className={`mb-1 rounded-sm last:mb-0 focus:bg-gold-300 ${
									selectedRegion === region ? 'bg-gold-300 text-primary' : ''
								}`}
							>
								{region.toUpperCase()}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<div className="flex w-3/4 items-center">
					<Input
						type="text"
						placeholder="Summoner#TAG"
						value={summonerName}
						onChange={(e) => setSummonerName(e.target.value)}
						autoComplete="off"
						className={
							'w-full rounded-none border-0 border-gold-300 border-b bg-transparent px-1 py-0 font-thin transition-all duration-75 placeholder:text-muted-foreground/60 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0'
						}
						disabled={isLoading}
					/>
				</div>
			</div>

			<div className="flex justify-end">
				<Button
					onClick={handleSearch}
					disabled={isLoading}
					className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 text-gold-300 transition-colors hover:to-blue-700/50"
				>
					{isLoading
						? `${
								accountLoading
									? 'Fetching account...'
									: summonerLoading
										? 'Fetching summoner...'
										: 'Fetching matches...'
							}`
						: 'Search'}
				</Button>
			</div>

			{error && <p className="mt-2 text-destructive text-sm">{error}</p>}
			<SummonerProfile
				account={account}
				summoner={summoner}
				matches={matches}
			/>
		</div>
	);
}
