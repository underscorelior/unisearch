// TODO: Switch away from using shadcn
'use client';

import { getUniversityInfo } from '@/utils/utils';

import { useEffect, useState } from 'react';
import Header from './sections/header';
import Admissions from './sections/admissions';

export default function UniversityInfo({ id }: { id: string }) {
	const [university, setUniversity] = useState<UniversityInfo | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUniversityInfo(id);
			setUniversity(data.data);
		};

		fetchData();
	}, [id]);

	return (
		<div className='container mx-auto p-4 space-y-8'>
			{university ? (
				<>
					<Header
						core={university.core}
						description={university.description || ''}
					/>
					<Admissions
						admissions={university.admissions}
					/>
				</>
			) : (
				<h1>Loading...</h1> // TODO: Add better loading indicator
			)}
		</div>
	);
}
