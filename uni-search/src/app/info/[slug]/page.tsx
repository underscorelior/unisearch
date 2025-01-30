'use client';

import UniversityInfo from '@/components/uni';
import { getUniversityInfo } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function UniversityPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const [university, setUniversity] = useState<UniversityInfoProps | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUniversityInfo((await params).slug);
			setUniversity(data.data);
		};
		fetchData();
	}, [params]);

	return (
		<>
			{!university ? (
				<h1>Loading...</h1>
			) : (
				<UniversityInfo {...university} />
			)}
		</>
	);
}
