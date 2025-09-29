import React from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';


// TODO: Disable ring when pressing on this
export default function AdmissionsGraph({
	num,
	className = '',
}: {
	num: number;
	className?: string;
}) {
	const colors = [
		'hsl(var(--text-700))', '#a3a3a3'
	]

	const data = [
		{
			name: 'Accepted',
			value: num,
		},
		{
			name: 'Rejected',
			value: 100 - num,
		},
	]

	return (
		<ResponsiveContainer width='100%' height='100%' className={className}>
			<PieChart width={400} height={400} >
				<Pie
					cx='50%'
					cy='50%'
					innerRadius={50}
					outerRadius={80}
					dataKey='value'
					data={data}
				>
					<Label
						value={`${num.toFixed(1)}%`}
						position='center'
						className='text-bold font-mono text-2xl fill-text-800'
					/>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colors[index % colors.length]}
							className='outline-none stroke-none'
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
