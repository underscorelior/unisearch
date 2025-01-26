'use client';

import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { School, MapPin, Users, BookOpen, Link2 } from 'lucide-react';
import StackedBarChart from './bar-chart-stacked';
import LabelPieChart from './pie-chart';
import { sortPieChartArray } from '@/lib/utils';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { SearchBar } from './search-bar';

export default function UniversityInfo({
	basicInfo,
	studentCount = 0,
	admissionInfo,
	tuition,
	demographics,
	enrollment,
	otherStats,
}: UniversityInfoProps) {
	const genderData = demographics?.gender
		? demographics.gender
		: ([] as never as { [key: string]: number });

	const raceData = demographics?.race
		? Object.entries(demographics.race).map(([name, value]) => ({
				name,
				value: value * 100,
		  }))
		: [];

	const COLORS = [
		'#0088FE',
		'#00C49F',
		'#FFBB28',
		'#FF8042',
		'#8884D8',
		'#82ca9d',
	];

	return (
		<div className='container mx-auto p-4 space-y-8'>
			<SearchBar />
			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<div className='flex flex-col md:flex-row items-center gap-4'>
						<Image
							src={
								`https://img.logo.dev/${basicInfo.url
									.replace('https://', '')
									.replace(
										'http://',
										''
									)}?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
								'/placeholder.svg'
							}
							alt={`${basicInfo.name} campus`}
							width={200}
							height={200}
							className='rounded-lg object-cover'
						/>
						<div className='flex-grow'>
							<CardTitle className='text-2xl md:text-3xl'>
								{basicInfo.name}
							</CardTitle>
							<CardDescription className='flex items-center mt-2'>
								<MapPin className='w-4 h-4 mr-1' />
								{basicInfo.location !== null
									? `${basicInfo.location.city}, ${basicInfo.location.state}`
									: 'N/A'}
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<p className='text-muted-foreground mb-4'>
						{basicInfo.description}
					</p>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
						<div className='flex items-center'>
							<School className='w-5 h-5 mr-2' />
							<span>
								Founded: {basicInfo.foundedYear || 'N/A'}
							</span>
						</div>
					</div>
					<Link href={basicInfo.url}>
						<Badge variant={'outline'}>
							<Link2 /> School Homepage
						</Badge>
					</Link>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>
						Admission Information
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						<div>
							<p className='font-medium'>Admission Rate:</p>
							<p>
								{admissionInfo.rate
									? `${(admissionInfo.rate * 100).toFixed(
											1
									  )}%`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Average GPA:</p>
							<p>{admissionInfo.averageGPA || 'N/A'}</p>
						</div>
						<div>
							<p className='font-medium'>Average SAT:</p>
							<p>
								{admissionInfo.testScores.sat.math['50th'] +
									admissionInfo.testScores.sat.reading[
										'50th'
									] || 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Average ACT:</p>
							<p>
								{admissionInfo.testScores.act['50th'] || 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Application Deadline:</p>
							<p>{admissionInfo.applicationDeadline || 'N/A'}</p>
						</div>
						<div>
							<p className='font-medium'>Acceptance Date:</p>
							<p>{admissionInfo.acceptanceDate || 'N/A'}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>
						Tuition and Financial Aid (Annual)
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						<div>
							<p className='font-medium'>In-State Tuition:</p>
							<p>
								{tuition?.inState
									? `$${tuition.inState.toLocaleString()}`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Out-of-State Tuition:</p>
							<p>
								{tuition?.outOfState
									? `$${tuition.outOfState.toLocaleString()}`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>% Receiving Aid:</p>
							<p>
								{financialAid?.percentReceivingAid
									? `${financialAid.percentReceivingAid}%`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Average Aid Package:</p>
							<p>
								{financialAid?.averagePackage
									? `$${financialAid.averagePackage.toLocaleString()}`
									: 'N/A'}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>Enrollment</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center'>
						<Users className='w-5 h-5 mr-2' />
						<span>Students: {studentCount.toLocaleString()}</span>
					</div>
					<div className='flex items-center'>
						<BookOpen className='w-5 h-5 mr-2' />
						<span>
							Student-Faculty Ratio:{' '}
							{enrollment?.studentFacultyRatio || 'N/A'}
						</span>
					</div>
					<StackedBarChart
						data={
							enrollment?.students as unknown as {
								[key: string]: number;
							}
						}
						colors={COLORS}
						proportion
					/>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>Demographics</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col gap-8'>
						<div className='w-full'>
							<h4 className='text-lg font-semibold mb-2'>
								Gender Distribution
							</h4>
							<StackedBarChart
								data={genderData}
								colors={COLORS}
							/>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-2'>
								Racial Distribution
							</h4>
							<LabelPieChart
								data={sortPieChartArray(raceData)}
								colors={COLORS}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>Other Statistics</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						{otherStats ? (
							Object.entries(otherStats).map(([stat, value]) => (
								<div key={stat}>
									<p className='font-medium'>{stat}:</p>
									<p>{value}</p>
								</div>
							))
						) : (
							<p>No additional statistics available</p>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
