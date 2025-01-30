'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { LoaderIcon, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResult {
	id: string;
	inst_name: string;
	city: string;
	state: string;
}

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
			console.log(results[0].id);
			router.push(`/info/${results[0].id}`);
		}
	}
	return (
		<Card id='search-bar' className='w-full max-w-4xl mx-auto'>
			<CardContent className='pt-6 relative'>
				<form
					onChange={() => {}}
					onSubmit={(e) => {
						e.preventDefault();
						redir();
					}}
					className='flex gap-2'
				>
					<div className='relative flex-grow'>
						<Input
							type='text'
							placeholder='Search for universities...'
							value={searchTerm}
							onChange={(e) => {
								handleSearch(e, e.target.value);
								setSearchTerm(e.target.value);
							}}
							className='w-full pr-10'
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
						className='absolute top-full left-0 w-full -mt-2 bg-background border-b border-x border-border shadow-md max-h-60 overflow-y-auto z-50 p-4 border-t rounded-b-md'
					>
						<h2 className='text-lg font-semibold p-2'>
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
									<li
										key={result.id}
										className='p-2 rounded-md bg-secondary h-16 flex items-center justify-between'
									>
										<Link href={`/info/${result.id}`}>
											<p className='font-medium'>
												{result.inst_name}
											</p>
											<p className='text-sm text-muted-foreground'>
												{result.city}, {result.state}
											</p>
										</Link>
									</li>
								))
							)}
						</ul>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
