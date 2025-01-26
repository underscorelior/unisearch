import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

export default function LabelPieChart({
	data,
	colors,
}: {
	data: {
		name: string;
		value: number;
	}[];
	colors: string[];
}) {
	return (
		<div className='flex flex-row w-full'>
			<ResponsiveContainer
				width={300}
				height={200}
				className='flex flex-row'
			>
				<PieChart
					margin={{
						top: 5,
						right: 5,
						bottom: 5,
						left: 5,
					}}
				>
					<Pie
						data={data}
						cx='50%'
						cy='50%'
						labelLine={false}
						outerRadius={80}
						fill='#8884d8'
						dataKey='value'
					>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={colors[index % colors.length]}
							/>
						))}
					</Pie>
					<Tooltip
						content={({ active, payload }) => {
							if (active && payload && payload.length) {
								const { name, value } = payload[0];
								return (
									<div className='bg-white p-2 border border-gray-200 rounded-md'>
										<h1 className='text-lg font-semibold'>
											{name}
										</h1>
										<p>{`${(value as number)?.toPrecision(
											3
										)}%`}</p>
									</div>
								);
							}
							return null;
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
			<div className='flex flex-col gap-2 w-full items-center h-full my-auto'>
				{data.map((category, idx) => {
					return (
						<span
							key={category.name}
							className='grid grid-cols-[18px,40px,1fr] items-center text-sm font-sans text-neutral-700 dark:text-neutral-300 w-full'
						>
							<div
								style={{
									backgroundColor: colors[idx],
								}}
								className='w-4 h-4 rounded-md min-w-1'
							></div>
							<span className='font-bold pl-1 text-end'>
								{category.value.toPrecision(2)}%
							</span>
							<span className='font-medium pl-2'>
								{category.name}
							</span>
						</span>
					);
				})}
			</div>
		</div>
	);
}
