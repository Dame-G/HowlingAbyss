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
import { useEffect, useState } from 'react';
import { MatchesDisplay } from './matches-display';
import { SummonerDisplay } from './summoner-display';

export function SummonerSearch() {
	const [summonerName, setSummonerName] = useState('');
	const [selectedRegion, setSelectedRegion] = useState<
		(typeof SUMMONER_REGIONS)[number]
	>(SUMMONER_REGIONS[7]);

	const {
		fetch: fetchAccount,
		data: account,
		setData: setAccount,
		isLoading: accountIsLoading,
		error: accountError,
	} = useAccount();

	const {
		fetch: fetchSummoner,
		data: summoner,
		setData: setSummoner,
		isLoading: summonerIsLoading,
		error: summonerError,
	} = useSummoner();

	const {
		fetch: fetchMatches,
		data: matches,
		setData: setMatches,
		isLoading: matchesIsLoading,
		error: matchesError,
	} = useMatches();

	const handleSearch = async () => {
		if (account) setAccount(undefined);
		if (summoner) setSummoner(undefined);
		if (matches) setMatches(undefined);
		if (!summonerName) return;
		const [gameName, tagLine] = summonerName.split('#');
		await fetchAccount(gameName, tagLine, selectedRegion);
		setSummonerName('');
	};

	useEffect(() => {
		if (account && !summoner) {
			fetchSummoner(account.puuid, selectedRegion);
			fetchMatches(account.puuid, selectedRegion);
		}
	}, [account, summoner, fetchSummoner, fetchMatches, selectedRegion]);

	const isLoading = accountIsLoading || summonerIsLoading || matchesIsLoading;
	const error = accountError || summonerError || matchesError;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	return (
		<div className="mx-auto w-full max-w-2xl space-y-2">
			<form onSubmit={handleSubmit} className="flex flex-col gap-2">
				<div className="flex gap-2 rounded-md">
					<Select
						value={selectedRegion}
						onValueChange={(value: string) =>
							setSelectedRegion(value as typeof selectedRegion)
						}
						disabled={isLoading}
					>
						<SelectTrigger
							aria-label="Region"
							className={
								'w-1/4 min-w-[100px] justify-between rounded-none border-0 border-gold-300 border-b bg-transparent px-1 text-gold-300 transition-all hover:border-gold-400 hover:text-gold-400 focus:outline-0 focus:ring-0 focus:ring-offset-0 data-[state=open]:border-gold-400 sm:w-[180px] [&>span]:text-primary-foreground'
							}
						>
							<SelectValue placeholder="Select region" />
						</SelectTrigger>
						<SelectContent className="w-full rounded-sm border-gold-400 bg-blue-700 text-gold-400">
							{SUMMONER_REGIONS.map((region) => (
								<SelectItem
									key={region}
									value={region}
									className={`mb-1 rounded-sm last:mb-0 focus:bg-gold-400 ${
										selectedRegion === region ? 'bg-gold-400 text-primary' : ''
									}`}
								>
									{region.toUpperCase()}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex w-3/4 items-center">
						<Input
							aria-label="Summoner name"
							type="text"
							placeholder="Summoner#TAG"
							value={summonerName}
							onChange={(e) => setSummonerName(e.target.value)}
							className={
								'w-full rounded-none border-0 border-gold-300 border-b bg-transparent px-1 py-0 font-thin transition-all placeholder:text-muted-foreground/60 hover:border-gold-400 focus:border-gold-400 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0'
							}
							disabled={isLoading}
							role="search"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-2">
					<Button type="submit" aria-label="Search" disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Search'}
					</Button>
				</div>
			</form>
			<SummonerDisplay
				account={account}
				summoner={summoner}
				error={accountError || summonerError}
			/>
			<MatchesDisplay
				matches={matches}
				error={matchesError}
				region={selectedRegion}
			/>
		</div>
	);
}
