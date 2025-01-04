import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useSummonerData } from '@/hooks/use-summoner-data';
import { getStored, setStored } from '@/lib/storage';
import { SUMMONER_REGIONS, type SummonerRegion } from '@/types/regions';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { LoadingState } from './loading-state';
import SummonerView from './summoner-view';

export function SummonerSearch() {
	const [summonerName, setSummonerName] = useState('');
	const [selectedRegion, setSelectedRegion] = useState<SummonerRegion>('na1');
	const [searchRegion, setSearchRegion] = useState<SummonerRegion>('na1');

	const handleRegionChange = (value: SummonerRegion) => {
		setSelectedRegion(value);
		setStored('region', value);
	};

	const { fetchSummonerData, reset, data, error, isLoading, retryAfter } =
		useSummonerData();

	const handleSearch = useCallback(async () => {
		if (!summonerName) return;
		setStored('name', summonerName);
		const [gameName, tagLine] = summonerName.split('#');

		if (data) {
			reset();
		}

		setSearchRegion(selectedRegion);
		fetchSummonerData(gameName, tagLine, selectedRegion, 450);
	}, [summonerName, selectedRegion, fetchSummonerData, reset, data]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleSearch();
	};

	useEffect(() => {
		const storedRegion = getStored<SummonerRegion>('region');
		if (storedRegion) setSelectedRegion(storedRegion);
		const storedName = getStored<string>('name');
		if (storedName) setSummonerName(storedName);
	}, []);

	return (
		<motion.div
			className="flex flex-col gap-1"
			animate={{
				y: data ? 0 : '40vh',
			}}
			transition={{
				duration: 0.5,
				ease: 'easeInOut',
			}}
		>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<div className="flex flex-col gap-1 sm:flex-row">
					<div className="flex w-full gap-1">
						<Select value={selectedRegion} onValueChange={handleRegionChange}>
							<SelectTrigger
								aria-label="Region"
								className="h-14 w-32 border-gold-300/30 border-b-2 bg-blue-600 px-2 font-light text-gold-300 text-xl transition-all hover:border-gold-400/50 hover:text-gold-400 focus:border-gold-400 focus:outline-0 focus:ring-0 focus:ring-offset-0 sm:w-[220px] [&>span]:text-gold-300 hover:[&>span]:text-gold-400 focus:[&>span]:text-gold-400"
							>
								<SelectValue placeholder="Region" />
							</SelectTrigger>
							<SelectContent className="rounded-sm border-gold-400/30 bg-blue-600 text-gold-300">
								{SUMMONER_REGIONS.map((region) => (
									<SelectItem
										key={region}
										value={region}
										className={`mb-1 font-light text-lg tracking-wide last:mb-0 hover:bg-gold-400/10 hover:text-gold-400 focus:bg-gold-400/10 ${
											selectedRegion === region ? 'bg-gold-400/10' : ''
										}`}
									>
										{region.toUpperCase()}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<div className="relative flex w-full items-center">
							<Input
								aria-label="Summoner name"
								type="text"
								placeholder=""
								value={summonerName}
								autoComplete="off"
								spellCheck={false}
								onChange={(e) => setSummonerName(e.target.value)}
								className="h-14 w-full select-none border-gold-300/30 border-b-2 bg-transparent px-2 font-light text-gold-300 text-xl tracking-wide caret-gold-400 transition-all selection:bg-gold-400/30 hover:border-gold-400/50 focus:border-gold-400 focus-visible:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&::placeholder]:text-transparent"
								role="search"
							/>
							<div className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 select-none text-xl">
								{!summonerName && (
									<span className="text-gold-300 opacity-50">
										Name
										<span className="ml-1 rounded bg-gold-300/30 p-1">
											#TAG
										</span>
									</span>
								)}
							</div>
						</div>
					</div>
					<Button
						type="submit"
						aria-label="Search"
						disabled={isLoading}
						className="h-14 border-gold-300/30 border-b-2 bg-transparent px-4 text-gold-300 transition-colors hover:border-gold-400/50 hover:text-gold-400 disabled:opacity-50"
					>
						{retryAfter > 0 ? (
							'Retrying...'
						) : isLoading ? (
							'Loading...'
						) : (
							<Search className="h-6 w-6" />
						)}
					</Button>
				</div>
			</form>

			{data ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					<SummonerView data={data} region={searchRegion} />
				</motion.div>
			) : (
				<>
					{(isLoading || retryAfter > 0 || error) && (
						<LoadingState
							error={error}
							retryAfter={retryAfter}
							isLoading={isLoading}
						/>
					)}
				</>
			)}
		</motion.div>
	);
}
