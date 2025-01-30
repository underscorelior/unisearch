import React from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from 'recharts';

export default function Admissions({
	data,
	className = '',
	colors,
}: {
	data: { name: string; value: number }[];
	className?: string;
	colors: string[];
}) {
	return (
		<ResponsiveContainer width='100%' height='100%' className={className}>
			<PieChart width={400} height={400}>
				<Pie
					cx='50%'
					cy='50%'
					innerRadius={50}
					outerRadius={80}
					fill='#8884d8'
					dataKey='value'
					data={data}
				>
					<Label
						value={`${data[0].value.toFixed(1)}%`}
						position='center'
						className='text-bold font-mono text-2xl fill-foreground'
					/>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colors[index % colors.length]}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	);
}
