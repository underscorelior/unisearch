'use client';
import { capitalizeFirstLetter } from '@/lib/utils';
import React, { useState } from 'react';

export default function StackedBarChart({
	data,
	colors,
	proportion = false,
}: {
	data: { [key: string]: number };
	colors: string[];
	proportion?: boolean;
}) {
	const [hover, setHover] = useState<string>('');
	const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
		null
	);

	function generateGridCols(): string {
		const out = [] as string[];
		if (proportion) {
			let num = 0;
			Object.keys(data).map((cat) => (num += data[cat]));
			Object.keys(data).map((cat) =>
				out.push((data[cat] / num) * 100 + '%')
			);
		} else {
			Object.keys(data).map((cat) => out.push(data[cat] * 100 + '%'));
		}

		return out.join(' ');
	}

	function lightenColor(color: string, percent: number): string {
		const num = parseInt(color.slice(1), 16),
			r = (num >> 16) + percent,
			b = ((num >> 8) & 0x00ff) + percent,
			g = (num & 0x0000ff) + percent;
		return `#${(
			0x1000000 +
			(r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
			(b < 255 ? (b < 1 ? 0 : b) : 255) * 0x100 +
			(g < 255 ? (g < 1 ? 0 : g) : 255)
		)
			.toString(16)
			.slice(1)}`;
	}
	function propSum(): number {
		return Object.keys(data).reduce((a, b) => a + data[b], 0);
	}

	return (
		<div className='flex flex-col gap-4'>
			<div
				className='grid max-w-lg'
				style={{ gridTemplateColumns: generateGridCols() }}
			>
				{Object.keys(data).map((category, idx) => {
					const color =
						hover === category
							? lightenColor(colors[idx], 20)
							: colors[idx];
					return (
						<div
							key={category}
							style={{
								backgroundColor: color,
							}}
							onMouseMove={(e) => {
								setMousePos({ x: e.clientX, y: e.clientY });
								setHover(category);
							}}
							onMouseLeave={() => setHover('')}
							className='relative border-background border-[0.5px] w-full min-w-1 h-8 hover:border transition-all'
						></div>
					);
				})}

				{hover && mousePos && (
					<div
						id='tooltip'
						className='fixed z-50 bg-white p-2 rounded-sm drop-shadow min-w-20'
						style={{
							left: mousePos.x + 10,
							top: mousePos.y + 10,
						}}
					>
						<h1 className='text-lg font-semibold'>
							{capitalizeFirstLetter(hover)}
						</h1>
						<span>
							{(
								(proportion
									? data[hover] / propSum()
									: data[hover]) * 100
							).toFixed(1)}
							%
						</span>
					</div>
				)}
			</div>
			<div className='flex flex-row gap-4'>
				{Object.keys(data).map((category, idx) => {
					return (
						<span
							key={category}
							className='flex flex-row items-center text-sm font-sans text-neutral-700 dark:text-neutral-300'
						>
							<div
								style={{
									backgroundColor: colors[idx],
								}}
								className='w-4 h-4 rounded-md min-w-1'
							></div>
							<span className='font-medium pl-2'>
								{capitalizeFirstLetter(category)}
							</span>
							<span className='font-bold pl-1'>
								{proportion
									? data[category].toLocaleString()
									: (data[category] * 100).toFixed(1)}
								{!proportion && '%'}
							</span>
						</span>
					);
				})}
			</div>
		</div>
	);
}
