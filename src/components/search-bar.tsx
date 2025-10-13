// TODO: Clean this up

'use client';

import { useState, useRef, useEffect } from 'react';
import { LoaderIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SearchBar() {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [tooMany, setTooMany] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowDropdown(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	async function handleSearch(e: React.FormEvent, value: string) {
		e.preventDefault();
		setTooMany(false);
		setIsLoading(true);
		setErrorMessage('');

		try {
			const response = await fetch(
				`/api/search?search=${encodeURIComponent(value.toLowerCase())}`
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			if (data.success === true) {
				setResults(data.data);
				setShowDropdown(true);
			} else {
				setTooMany(true);
				setErrorMessage(data.message);
				setShowDropdown(true);
			}
		} catch (error) {
			console.error('Error fetching search results:', error);
			setResults([]);
		} finally {
			setIsLoading(false);
		}
	}

	function redir() {
		if (results.length > 0) {
			router.push(`/info/${results[0].id}`);
		}
	}
	return (
		<div className='relative w-full max-w-3xl'>
			<form
				onChange={() => { }}
				onSubmit={(e) => {
					e.preventDefault();
					setShowDropdown(false);
					e.currentTarget.blur();
					redir();
				}}
				className='flex gap-2'
			>
				<div className='relative flex-grow'>
					<input
						type='text'
						placeholder='Search for universities...'
						value={searchTerm}
						onChange={(e) => {
							handleSearch(e, e.target.value);
							setSearchTerm(e.target.value);
						}}
						onFocusCapture={() => {
							if (searchTerm) {
								setShowDropdown(true)
							}
						}
						}
						className='w-full pl-4 pr-10 flex h-12 rounded-md border-2 border-primary-300 bg-background-50 px-3 py-2 text-text-900 placeholder:text-text-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
					/>
					<div className='absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer'>
						{searchTerm ? (
							isLoading ? (
								<LoaderIcon className='animate-spin h-4 w-4' />
							) : (
								<X
									className='h-4 w-4'
									onClick={() => {
										setSearchTerm('');
										setResults([]);
										setShowDropdown(false);
									}}
								/>
							)
						) : (
							<></>
						)}
					</div>
				</div>
			</form>
			{showDropdown && (results.length > 0 || tooMany) && (
				<div
					ref={dropdownRef}
					className='absolute top-full left-0 w-full -mt-1.5 bg-background-50 border-b-2 border-x-2 border-primary-300 max-h-60 overflow-y-auto z-50 p-4 border-t border-t-background-200 rounded-b-md'
				>
					<h2 className='text-lg font-semibold pb-2'>
						Search Results:
					</h2>
					<ul className='space-y-2 p-2 w-full'>
						{tooMany ? (
							<li className='p-2 bg-secondary rounded-md'>
								<p className='font-medium'>
									{errorMessage
										.toLowerCase()
										.includes('too many')
										? 'Your search returned too many results, try to be more specific.'
										: 'No results found.'}
								</p>
							</li>
						) : (
							results.map((result) => (
								<Link href={`/info/${result.id}`} key={result.id}
									className='p-2 rounded-md bg-primary-100 hover:bg-primary-200 min-h-16 flex flex-col justify-between'
									onClick={() => { setShowDropdown(false) }}
								>
									<p className='font-medium'>
										{result.name}
									</p>
									<p className='text-sm'>
										{result.city}, {result.state}
									</p>
								</Link>
							))
						)}
					</ul>
				</div>
			)}
		</div>
	)
}
