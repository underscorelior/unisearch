import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export function sortChartArray(ipt: { [key: string]: number }): {
	[key: string]: number;
} {
	const out = {} as {
		[key: string]: number;
	};
	const sorted_keys = Object.keys(ipt).toSorted((a, b) => ipt[b] - ipt[a]);
	sorted_keys.forEach((key) => {
		out[key] = ipt[key];
	});

	return out;
}

export function sortPieChartArray(
	ipt: {
		name: string;
		value: number;
	}[]
): {
	name: string;
	value: number;
}[] {
	return ipt.toSorted((a, b) => b.value - a.value);
}

export async function getUniversityInfo(id: string) {
	const response = await fetch(`/api/getinfo?id=${id}`);

	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}

	const data = await response.json();

	return data;
}

export const COLORS = [
	'#0088FE',
	'#00C49F',
	'#FFBB28',
	'#FF8042',
	'#8884D8',
	'#82ca9d',
	'#5A5A99',
	'#6B8E23',
	'#FFD700',
	'#FF6347',
	'#6A5ACD',
	'#32CD32',
	'#A52A2A',
	'#6495ED',
	'#D2691E',
];
