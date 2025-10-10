import { capitalizeFirstLetter } from '@/utils/utils';

export default function SimpleStackedBarChart({
	data,
	total,
	colors,
	hideNames
}: {
	data: { [key: string]: number | null };
	total: number;
	colors: string[];
	hideNames?: boolean;
}) {
	function generateGridCols(): string {
		const out = [] as string[];
		Object.keys(data).map((cat) => {
			if (!data[cat]) return;
			out.push((data[cat] / total * 100 + '%'));
		});
		return out.join(' ');
	}

	return (
		<div className={`flex flex-col gap-1`}>
			<div
				className='grid'
				style={{ gridTemplateColumns: generateGridCols() }}
			>
				{Object.keys(data).map((category, idx) => {
					if (!data[category]) return;
					return (
						<div
							key={category}
							style={{
								backgroundColor: colors[idx],
							}}
							className='relative w-full min-w-1 h-2'
						></div>
					);
				})}
			</div>
			{!hideNames && <div className='flex flex-col md:flex-row gap-2 mb-4 md:gap-4 md:justify-between'>
				{Object.keys(data).map((category, idx) => {
					if (!data[category]) return;
					return (
						<span
							key={category}
							className='flex flex-row items-center text-xs font-sans text-neutral-700 dark:text-neutral-300'
						>
							<div
								style={{
									backgroundColor: colors[idx],
								}}
								className='size-3 rounded-sm min-w-1'
							></div>
							<span className='font-medium pl-2'>
								{capitalizeFirstLetter(category)}
							</span>
							<span className='font-bold pl-1'>
								{((data[category] / total) * 100).toFixed(0)}%
							</span>
						</span>
					);
				})}
			</div>}
		</div>
	);
}
