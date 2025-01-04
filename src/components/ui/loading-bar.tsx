import { motion } from 'framer-motion';

interface LoadingBarProps {
	progress: number;
	total: number;
}

export function LoadingBar({ progress, total }: LoadingBarProps) {
	const percentage = (progress / total) * 100;

	return (
		<div className="relative h-1 w-full overflow-hidden rounded-full bg-blue-900/20">
			<motion.div
				className="absolute inset-y-0 left-0 bg-gold-400"
				initial={{ width: 0 }}
				animate={{ width: `${percentage}%` }}
				transition={{ duration: 0.3 }}
			/>
		</div>
	);
}
