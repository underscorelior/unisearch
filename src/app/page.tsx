import CollegeList from '@/components/college-list';
import Link from 'next/link';
import { BACKEND_URL } from '@/utils/utils';

export const revalidate = 3600;

async function getInitialList(): Promise<{
	count: number;
	list: ListItem[];
} | null> {
	try {
		const response = await fetch(`${BACKEND_URL}/list?page=0&limit=50`, {
			next: { revalidate: 3600 },
		});

		if (!response.ok) return null;

		return await response.json();
	} catch {
		return null;
	}
}

export default async function Home() {
	const initial = await getInitialList();

	return (
		<div className='flex flex-col items-center h-screen min-h-screen w-full min-w-screen font-[family-name:var(--font-geist-sans)] justify-between'>
			<CollegeList
				initialList={initial?.list ?? []}
				initialCount={initial?.count ?? 0}
			/>
			<div className='w-full text-end'>
				<Link
					href='https://logo.dev'
					className='mt-auto text-neutral-500 text-sm font-medium'
				>
					Logos provided by Logo.dev
				</Link>
			</div>
		</div>
	);
}
