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

export async function getUniversityInfo(slug: string) {
	const response = await fetch(`/api/getinfo?id=${slug}`);

	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}

	const data = await response.json();

	return data;
}
