export default function TestScoreRange({
	title,
	q1,
	q3,
	min,
	max,
}: {
	title: string;
	q1: number;
	q3: number;
	min: number
	max: number;
}) {
	const scaleRange = max - min;

	return (
		<div className='box-border relative'>
			<h4 className='text-lg font-medium mb-4'>{title} Middle 50%:</h4>
			<div className='relative h-6 bg-neutral-300 dark:bg-secondary-foreground rounded-sm text-stone-100 text-sm'>
				<div
					style={{
						left: `${((q1 - min) / scaleRange) * 100
							}%`,
						width: `${((q3 - q1) / scaleRange) * 100
							}%`,
					}}
					className='absolute top-0 bottom-0 bg-blue-500 rounded-sm'
				/>
				<div
					className='absolute transform -translate-x-1/2 bg-blue-500 p-1.5 rounded'
					style={{
						top: '-1.5rem',
						left: `${((q1 - min) / scaleRange) * 100
							}%`,
					}}
				>
					{q1}
				</div>
				<div
					className='absolute transform -translate-x-1/2 bg-blue-500 p-1.5 rounded'
					style={{
						top: '-1.5rem',
						left: `${((q3 - min) / scaleRange) * 100
							}%`,
					}}
				>
					{q3}
				</div>
			</div>
			<div className='text-muted-foreground text-sm font-medium mt-2 justify-between flex'>
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);
}
