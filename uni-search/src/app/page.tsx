import { SearchBar } from '@/components/search-bar';
import Link from 'next/link';

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
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
							href={'/info/243744'}
							className='font-semibold text-blue-600 underline'
						>
							Stanford
						</Link>
						<div className='flex flex-col'>
							<Link
								href={'/info/166683'}
								className='font-semibold text-blue-600 underline'
							>
								MIT{' '}
							</Link>
							<span className='text-muted-foreground font-medium no-underline text-sm'>
								(In order to search it, you need to search the
								proper name, sorry.)
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
