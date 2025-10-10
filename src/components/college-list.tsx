// TODO: Redo the query system
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import CollegeFilter from './college-filter';
import CollegeListItem from './list-item';
import { useInView } from "react-intersection-observer";
import { Loader2Icon } from 'lucide-react';

export default function CollegeList() {
	const [listed, setListed] = useState<ListItem[]>([]);
	const [queries, setQueries] = useState<{ [key: string]: string | number }>({});
	const [states, setStates] = useState<string[]>([]);
	const [uniCount, setUniCount] = useState<number>(1);
	const [page, setPage] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const { ref, inView } = useInView({
		threshold: 0.5,
	});

	function queriesToString(queries: { [key: string]: string | number }) {
		const out = [] as string[]

		for (const [k, v] of Object.entries(queries)) {
			if (v)
				out.push(`${k}=${v}`)
		}

		return out.join(':')
	}

	const loadMore = useCallback(async () => {
		if (listed && listed.length < uniCount) {
			const response = await fetch(
				`/api/list?page=${page}${queriesToString(queries).length > 0 ? `&filter=${queriesToString(queries)}` : ''}`);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setListed([...listed, ...data.data['list']]);
			setUniCount(data.data['count']);
			setPage(page + 1)
			setLoading(false);
		}
	}, [page, queries, listed, uniCount]);


	useEffect(() => {
		if (inView && !loading) {
			setLoading(true);
			loadMore();
		}
	}, [inView, loading, loadMore]);


	useEffect(() => {
		setLoading(true);
		setListed([]);
		setPage(0);

		const fetchData = async () => {
			const response = await fetch(
				`/api/list?page=${0}${queriesToString(queries).length > 0 ? `&filter=${queriesToString(queries)}` : ''}`);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			setListed(data.data['list']);
			setUniCount(data.data['count']);
			setPage(1);
			setLoading(false);
		};
		fetchData();
	}, [queries]);


	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`/api/values?col=state&table=core`);

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			const states = await res.json();
			setStates(states.data);
		};
		fetchData();
	}, []);



	return (
		<section className='flex flex-col md:grid md:grid-cols-[25%,75%] w-full'>
			<CollegeFilter setQueries={setQueries} states={states} />
			{listed && listed.length > 0 ? (
				<div className='flex flex-col gap-4 p-2 w-full mt-3' >
					{
						listed && listed.length > 0 && listed.map((i, idx) => (
							<CollegeListItem college={i} index={idx} key={idx} />
						))
					}
					{!loading && listed && listed.length < uniCount ?
						(
							<div ref={ref} className='flex flex-row gap-2 justify-center items-center font-semibold md:max-w-3xl'>
								<Loader2Icon className={`animate-spin size-6`} />
								Loading... ({listed.length} / {uniCount})
							</div>
						) : (
							<p className='text-center text-sm md:max-w-3xl'>No more results</p>
						)}
				</div>
			) : (
				<div className='flex flex-col gap-4 mt-3 p-2 justify-center items-center font-semibold md:max-w-3xl '>
					{[...Array(50)].map((_, i) => (
						<div
							className='p-4 bg-primary-100/90 hover:bg-primary-200 min-h-10 transition rounded-lg w-[95%] md:w-full mx-auto md:mx-0 md:max-w-3xl content-[""] animate-pulse'
							key={i}
						>
							<div className='flex items-center gap-4'>
								<div className='content-[""] size-10 rounded-lg bg-primary-300/90' />
								<div className='flex flex-col gap-3'>
									<span className='font-semibold text-lg'>
										<div className='content-[""] w-32 h-4 rounded-md bg-primary-300/90' />
									</span>
									<span className='text-sm flex items-center gap-1'>
										<div className='content-[""] w-24 h-3 rounded-md bg-primary-300/90' />
									</span>
									<span className='text-sm flex items-center gap-1 opacity-100'>
										#{i + 1}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}


		</section >

	);
}