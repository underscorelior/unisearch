import UniversityInfo from '@/components/uni';
import type { Metadata } from 'next';

export default async function UniversityPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	return <>{<UniversityInfo id={(await params).id} />}</>;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const id = (await params).id;

	// TODO: Find way of just using the prexisting API route instead of directly fetching from server.
	const response = await fetch(
		`https://lior.hackclub.app/api/get-inst-data?id=${id}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}
	const university = await response.json();

	return {
		title: `${university.general.name} - Information`,
		description: `Information about ${university.general.name}`,
	};
}
