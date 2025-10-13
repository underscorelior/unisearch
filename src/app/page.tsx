import CollegeList from '@/components/college-list';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col items-center h-screen min-h-screen w-full min-w-screen font-[family-name:var(--font-geist-sans)] justify-between'>
			<CollegeList />
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
