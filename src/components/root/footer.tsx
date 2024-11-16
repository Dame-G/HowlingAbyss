import { SiGithub } from 'react-icons/si';

export default function Footer() {
	return (
		<footer className="p-2">
			<div className="flex h-full flex-col items-center justify-between gap-2 sm:flex-row">
				<div className="flex items-center gap-x-4">
					<a
						href="https://github.com/Dame-G/HowlingAbyss"
						target="_blank"
						rel="noopener noreferrer"
						className="text-xl"
						aria-label='GitHub repository for "Howling Abyss"'
					>
						<SiGithub className="transition-opacity hover:opacity-50" />
					</a>
				</div>
				<div className="flex items-start gap-1 text-center text-xs sm:text-right">
					<p className="truncate">This website is under construction...</p>
				</div>
			</div>
		</footer>
	);
}
