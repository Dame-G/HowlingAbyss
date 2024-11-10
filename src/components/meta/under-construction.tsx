import { motion } from 'framer-motion';
import { FaWrench } from 'react-icons/fa';

export default function UnderConstruction() {
	return (
		<div className="flex h-full flex-col items-center justify-center gap-8 p-4">
			<motion.div
				whileHover={{ rotate: 180 }}
				transition={{ type: 'spring', stiffness: 260, damping: 20 }}
				className="cursor-pointer"
			>
				<FaWrench className="text-7xl" />
			</motion.div>

			<div className="max-w-md text-center">
				<h1 className="mb-2 font-bold text-4xl">Under Construction</h1>
				<p className="text-gray-600 dark:text-gray-400">
					Check back soon for updates!
				</p>
			</div>
		</div>
	);
}
