'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoaderIcon, Search, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface SearchResult {
	id: string;
	name: string;
	location: string;
}

export function SearchBar() {
	const [searchTerm, setSearchTerm] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [tooMany, setTooMany] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

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

	async function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		setTooMany(false);
		setIsLoading(true);
		setErrorMessage('');

		try {
			const response = await fetch(
				`/api/search?search=${encodeURIComponent(searchTerm)}`
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			if (data.success === true) {
				const parsedResults = data.parsedHTML.map((item: string) => {
					const [id, rest] = item.split(': ');
					const split = rest.split(', ');
					return {
						id,
						name: split[0],
						location: split.slice(1).join(', '),
					};
				});
				setResults(parsedResults);
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

	return (
		<Card id='search-bar' className='w-full max-w-4xl mx-auto'>
			<CardContent className='pt-6 relative'>
				<form onSubmit={handleSearch} className='flex gap-2'>
					<div className='relative flex-grow'>
						<Input
							type='text'
							placeholder='Search for universities...'
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								if (!e.target.value) {
									setShowDropdown(false);
								}
							}}
							className='w-full pr-10'
						/>
						{searchTerm && (
							<X
								className='absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 cursor-pointer'
								onClick={() => {
									setSearchTerm('');
									setResults([]);
									setShowDropdown(false);
								}}
							/>
						)}
					</div>
					<Button
						type='submit'
						disabled={isLoading}
						variant={'outline'}
					>
						{isLoading ? (
							<LoaderIcon className='animate-spin h-4 w-4' />
						) : (
							<Search className='h-4 w-4' />
						)}
					</Button>
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
												{result.name}
											</p>
											<p className='text-sm text-muted-foreground'>
												{result.location}
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
