import { SearchBar } from '@/components/search-bar';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='flex flex-col items-center h-screen min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)] justify-between'>
			<SearchBar />
			<div className='text-2xl text-center'>
				Use the searchbar above to look for universities.{' '}
				<div>
					If you are struggling to find a university, here are a few
					links to colleges:{' '}
					<div className='flex flex-col gap-2'>
						<Link
							href={'/info/110662'}
							className='font-semibold text-blue-600 underline'
						>
							UCLA
						</Link>
						<Link
							href={'/info/110653'}
							className='font-semibold text-blue-600 underline'
						>
							UCI
						</Link>
						<div className='flex flex-col'>
							<Link
								href={'/info/166683'}
								className='font-semibold text-blue-600 underline'
							>
								MIT{' '}
							</Link>
						</div>
					</div>
				</div>
			</div>
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
