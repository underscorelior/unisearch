import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(s: string): string {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

export async function getUniversityInfo(id: string): Promise<UniversityInfo> {
	const response = await fetch(
		`${
			process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:42107'
		}/api/get?id=${id}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}

	const data = await response.json();

	return data;
}

export function fixURL(url: string) {
	if (url.startsWith('http')) {
		return url;
	}

	if (url.endsWith('/')) {
		return 'https://' + url.slice(0, -1);
	}

	return 'https://' + url;
}

export function formatPhoneNumber(phone: string | number) {
	const cleaned = ('' + phone).replace(/\D/g, '');
	const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
	if (match) {
		return '(' + match[1] + ') ' + match[2] + '-' + match[3];
	}
	return null;
}

export function formatCurrency(value: number | null) {
	if (value === null) return 'N/A';
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	}).format(value);
}

export function formatPercent(value: number | null) {
	if (value === null) return 'N/A';
	return `${(value * 100).toFixed(1)}%`;
}

export function formatNumber(value: number | null) {
	if (value === null) return 'N/A';
	return new Intl.NumberFormat('en-US').format(value);
}

export const COLORS = [
	'#2B67B1',
	'#9EE094',
	'#74ACCD',
	'#6D659F',
	'#A13F06',
	'#3F4832',
	'#F15F08',
	'#5A787C',
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
