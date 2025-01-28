export default function TestScoreRange({
	data,
	title,
	type = 'sat',
}: {
	data: { '25th': number; '50th': number; '75th': number };
	title: string;
	type?: 'act' | 'sat';
}) {
	const scaleMin = type === 'act' ? 1 : 200;
	const scaleMax = type === 'act' ? 36 : 800;
	const scaleRange = scaleMax - scaleMin;

	return (
		<div className='box-border relative'>
			<h4 className='text-lg font-medium mb-4'>{title} Middle 50%:</h4>
			<div className='relative h-6 bg-neutral-300 dark:bg-secondary-foreground rounded-sm text-stone-100 text-sm'>
				<div
					style={{
						left: `${
							((data['25th'] - scaleMin) / scaleRange) * 100
						}%`,
						width: `${
							((data['75th'] - data['25th']) / scaleRange) * 100
						}%`,
					}}
					className='absolute top-0 bottom-0 bg-blue-500 rounded-sm'
				/>
				<div
					className='absolute transform -translate-x-1/2 bg-blue-500 p-1.5 rounded'
					style={{
						top: '-1.5rem',
						left: `${
							((data['25th'] - scaleMin) / scaleRange) * 100
						}%`,
					}}
				>
					{data['25th']}
				</div>
				<div
					className='absolute transform -translate-x-1/2 bg-blue-500 p-1.5 rounded'
					style={{
						top: '-1.5rem',
						left: `${
							((data['75th'] - scaleMin) / scaleRange) * 100
						}%`,
					}}
				>
					{data['75th']}
				</div>
			</div>
			<div className='text-muted-foreground text-sm font-medium mt-2 justify-between flex'>
				<span>{scaleMin}</span>
				<span>{scaleMax}</span>
			</div>
		</div>
	);
}
