export default function TestScoreRange({
	q1,
	q3,
	min,
	max,
}: {
	q1: number;
	q3: number;
	min: number
	max: number;
}) {
	const scaleRange = max - min;

	return (
		<div className='box-border relative'>
			<div className='relative h-[10px] bg-background-50 rounded-[2px] border border-primary-400 text-sm'>
				<div
					style={{
						left: `${((q1 - min) / scaleRange) * 100
							}%`,
						width: `${((q3 - q1) / scaleRange) * 100
							}%`,
					}}
					className='absolute top-0 bottom-0 bg-secondary-600 rounded-[1px]'
				/>
			</div>
			<div className='text-text-700 text-[10px] font-light justify-between flex'>
				<span>{min}</span>
				<span>{max}</span>
			</div>
		</div>
	);
}
