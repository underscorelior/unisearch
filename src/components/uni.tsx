'use client';

import { getUniversityInfo } from '@/lib/utils';
import { SearchBar } from './search-bar';

import { useEffect, useState } from 'react';
import Admissions from './sections/admissions';
import Enrollment from './sections/enrollment';
import Financial from './sections/financial';
import Header from './sections/header';
import Demographics from './sections/demographics';

export default function UniversityInfo({ id }: { id: string }) {
	const [university, setUniversity] = useState<UniversityInfoProps | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getUniversityInfo(id);
			setUniversity(data.data);
		};

		fetchData();
	}, [id]);

	return (
		<div className='container mx-auto p-4 space-y-8'>
			{/* <Head>
				<title>{university.general.name} - Information</title>
			</Head> */}
			<SearchBar />

			{university ? (
				<>
					<Header
						general={university.general}
						academics={university.academics}
					/>

					<Admissions
						general={university.general}
						admissions={university.admissions}
					/>
					<Financial financial={university.financial} />

					<Enrollment
						enrollment={university.enrollment}
						academics={university.academics}
					/>

					<Demographics
						enrollment={university.enrollment}
					/>
				</>
			) : (
				<h1>Loading...</h1>
			)}
		</div>
	);
}
