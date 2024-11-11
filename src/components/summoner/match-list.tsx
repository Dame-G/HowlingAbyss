import type { MatchIds } from '@/types/matches';
import { useMemo, useState } from 'react';
import { Button } from '../ui/button';

interface MatchListProps {
	matches: MatchIds;
}

export function MatchList({ matches }: MatchListProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const { totalPages, currentMatches, visiblePages } = useMemo(() => {
		const total = Math.ceil(matches.length / itemsPerPage);
		const start = (currentPage - 1) * itemsPerPage;
		const current = matches.slice(start, start + itemsPerPage);

		// Calculate visible page numbers (show 5 pages max)
		let startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(total, startPage + 4);

		// Adjust start if we're near the end
		if (endPage - startPage < 4) {
			startPage = Math.max(1, endPage - 4);
		}

		const visible = Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i,
		);

		return {
			totalPages: total,
			currentMatches: current,
			visiblePages: visible,
		};
	}, [matches.length, matches.slice, currentPage]);

	return (
		<div>
			<ul className="mt-2 space-y-1">
				{currentMatches.map((match) => (
					<li key={match} className="rounded border border-gold-300/20 p-2">
						{match}
					</li>
				))}
			</ul>

			<div className="mt-2 flex flex-wrap items-center gap-2">
				<Button
					onClick={() => setCurrentPage(1)}
					disabled={currentPage === 1}
					className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 transition-colors hover:to-blue-700/50"
				>
					First
				</Button>
				<Button
					onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
					disabled={currentPage === 1}
					className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 transition-colors hover:to-blue-700/50"
				>
					Previous
				</Button>

				{visiblePages.map((page) => (
					<Button
						key={page}
						onClick={() => setCurrentPage(page)}
						className={`rounded-sm border ${
							currentPage === page
								? 'border-gold-300 bg-gold-300 text-primary'
								: 'border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700'
						} min-w-[40px] transition-colors hover:to-blue-700/50`}
					>
						{page}
					</Button>
				))}

				<Button
					onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
					disabled={currentPage === totalPages}
					className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 transition-colors hover:to-blue-700/50"
				>
					Next
				</Button>
				<Button
					onClick={() => setCurrentPage(totalPages)}
					disabled={currentPage === totalPages}
					className="rounded-sm border border-gold-300 bg-gradient-to-r from-blue-600 to-blue-700 transition-colors hover:to-blue-700/50"
				>
					Last
				</Button>
			</div>
		</div>
	);
}
