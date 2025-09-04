import UniversityInfo from '@/components/uni';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

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
		// `https://lior.hackclub.app/api/get-inst-data?id=${id}`
		`http://localhost:42107/api/get?id=${id}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch university data');
	}

	const university = await response.json();

	const headersList = await headers();
	const host = headersList.get('host');

	return {
		title: `${university.core.name} - Information`,
		description: `Information about ${university.core.name}`, // TODO: Later use a snippet of the AI overview or smth.
		openGraph: {
			images: [
				{
					url: `https://${host}/info/${id}/opengraph-image`,
					width: 1200,
					height: 630,
					alt: university.core.name,
				},
			],
		},
	};
}
