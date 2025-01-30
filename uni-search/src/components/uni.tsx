'use client';

import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	MapPin,
	Users,
	BookOpen,
	Link2,
	TowerControl,
	GraduationCap,
	TreeDeciduous,
	Building,
	ExternalLink,
} from 'lucide-react';
import StackedBarChart from './bar-chart-stacked';
import LabelPieChart from './pie-chart';
import { sortPieChartArray } from '@/lib/utils';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { SearchBar } from './search-bar';

import locale_conv from '@/assets/locale_conv.json';
import control_conv from '@/assets/control_conv.json';
import high_deg_conv from '@/assets/high_deg_conv.json';
import TestScoreRange from './test-range';
import Admissions from './admissions';
import Head from 'next/head';

export default function UniversityInfo({
	general,
	academics,
	enrollment,
	admissions,
	financial,
}: UniversityInfoProps) {
	const locale = (locale_conv as { [key: string]: string })[
		general.location.campusLocale
	];
	const controlOfInst = (control_conv as { [key: string]: string })[
		general.controlOfInst
	];
	const highestDegreeOffered = (high_deg_conv as { [key: string]: string })[
		academics.highestDegreeOffered
	];

	const demographics = enrollment?.demographics;
	const genderData = demographics?.gender
		? demographics.gender
		: ([] as never as UniversityInfoProps['enrollment']['demographics']['gender']);

	const raceData = demographics?.race
		? Object.entries(demographics.race).map(([name, value]) => ({
				name,
				value: value.percent / 100,
		  }))
		: [];

	const COLORS = [
		'#0088FE',
		'#00C49F',
		'#FFBB28',
		'#FF8042',
		'#8884D8',
		'#82ca9d',
		'#5A5A99',
		'#6B8E23',
		'#FFD700',
		'#FF6347',
		'#6A5ACD',
		'#32CD32',
		'#A52A2A',
		'#6495ED',
		'#D2691E',
	];

	const USD = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return (
		<div className='container mx-auto p-4 space-y-8'>
			<Head>
				<title>{general.name} - Information</title>
			</Head>
			<SearchBar />
			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<div className='flex flex-col md:flex-row items-center gap-4'>
						<Image
							src={
								`https://img.logo.dev/${general.URLs.general
									.replace('https://', '')
									.replace(
										'http://',
										''
									)}?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
								`${general.URLs.general}${
									general.URLs.general.endsWith('/')
										? ''
										: '/'
								}favicon.ico`
							}
							alt={`${general.name} campus`}
							width={200}
							height={200}
							className='rounded-lg object-cover'
						/>
						<div className='flex-grow'>
							<CardTitle className='text-2xl md:text-3xl'>
								{general.name}
							</CardTitle>
							<CardDescription className='flex items-center mt-2'>
								<MapPin className='w-4 h-4 mr-2' />
								{general.location !== null
									? `${general.location.city}, ${general.location.state}`
									: 'N/A'}
								{locale ? (
									<>
										<TowerControl className='w-4 h-4 ml-6 mr-2' />
										<span>{controlOfInst}</span>
										<Building className='w-4 h-4 ml-6 mr-2' />
										<span>{locale.split(': ')[0]}</span>
										<TreeDeciduous className='w-4 h-4 ml-6 mr-2' />
										<span>{locale.split(': ')[1]}</span>
									</>
								) : (
									<></>
								)}
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					{/* <p className='text-muted-foreground mb-4'>
						{general.description}
					</p> */}

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
						{/* <div className='flex items-center'>
							<School className='w-5 h-5 mr-2' />
							<span className='font-semibold'>
								Founded:{' '}
								<span className='font-medium'>
									{general.foundedYear || 'N/A'}
								</span>
							</span>
						</div> */}
						<div className='flex items-center w-max justify-center'>
							<GraduationCap className='w-5 h-5 mr-2' />
							<span className='font-semibold'>
								Highest Degree Offered:{' '}
								<span className='font-medium'>
									{highestDegreeOffered}{' '}
								</span>
							</span>
						</div>
					</div>
					<Link href={general.URLs.general}>
						<Badge
							variant={'outline'}
							className='flex gap-2 flex-row w-max text-sm'
						>
							<Link2 /> School Homepage
						</Badge>
					</Link>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-2xl flex flex-row justify-between'>
						Admission Information
						<Link href={general.URLs.admissions}>
							<Badge
								variant={'outline'}
								className='flex gap-2 flex-row w-max text-sm'
							>
								<Link2 /> Admissions Homepage
							</Badge>
						</Link>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
						<div className='w-full col-span-2 h-64'>
							<div className='w-full grid grid-cols-3 items-center justify-center h-full font-sans'>
								<div className='flex flex-col items-center'>
									<p className='text-3xl font-medium'>
										{(+admissions.applicants
											.total).toLocaleString()}
									</p>
									<p>Applied</p>
								</div>
								<div className='flex flex-col items-center'>
									<p className='text-3xl font-medium'>
										{(+admissions.admitted
											.total).toLocaleString()}
									</p>
									<p>Admitted</p>
								</div>
								<div className='flex flex-col items-center'>
									<p className='text-3xl font-medium'>
										{(+admissions.enrolled
											.total).toLocaleString()}
									</p>
									<p>Enrolled</p>
								</div>
							</div>
						</div>
						<Admissions
							className='col-span-1'
							data={[
								{
									name: 'Accepted',
									value:
										admissions.acceptanceRate.overall * 100,
								},
								{
									name: 'Rejected',
									value:
										100 -
										admissions.acceptanceRate.overall * 100,
								},
							]}
							colors={['#00c950', '#ababab']}
						/>{' '}
						{/* TODO: MAKE THE COLORS MORE TASTEFUL */}
						<StackedBarChart
							data={Object.entries(admissions.applicants).reduce(
								(data, [key, value]) => {
									if (key !== 'total') {
										data[key] = {
											total: value as number,
											percent:
												((value as number) /
													admissions.applicants
														.total) *
												100,
										};
									}
									return data;
								},
								{} as {
									[key: string]: {
										percent: number;
										total: number;
									};
								}
							)}
							colors={COLORS}
							className='col-span-2'
							tooltips={false}
						/>
						<div>
							{/* TODO: MOVE THIS SOMEWHERE MORE REASONABLE */}
							<div className='flex flex-col items-center'>
								<p className='text-3xl font-medium'>
									${admissions.applicationFee}
								</p>
								<p>Application Fee</p>
							</div>
						</div>
						<h2 className='col-start-1 col-span-2 text-xl font-semibold'>
							Test Scores
						</h2>
						{admissions.testScores.sat.math['50th'] ? (
							<div className='col-span-3 flex flex-col gap-8'>
								<TestScoreRange
									data={admissions.testScores.sat.math}
									title='SAT Math'
								/>
								<TestScoreRange
									data={admissions.testScores.sat.reading}
									title='SAT Reading and Writing'
								/>
								<TestScoreRange
									data={admissions.testScores.act}
									title='ACT'
									type='act'
								/>
							</div>
						) : (
							<div className='col-span-3 flex flex-col gap-8'>
								<p className='text-muted-foreground'>
									This school does not require test scores for
									admission or does not report them.
								</p>
							</div>
						)}
					</div>
				</CardContent>
				<CardFooter className='flex flex-row justify-between'>
					{/* <Button>Admissions Considerations</Button> */}
					<Link href={general.URLs.application} className='ml-auto'>
						<Badge
							variant={'outline'}
							className='flex gap-2 flex-row w-max text-sm'
						>
							<ExternalLink /> More Application Information
						</Badge>
					</Link>
				</CardFooter>
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
								{financial.costs.inState.tuition
									? `${USD.format(
											financial.costs.inState.tuition
									  )}`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Out-of-State Tuition:</p>
							<p>
								{financial.costs.outOfState.tuition
									? `${USD.format(
											financial.costs.outOfState.tuition
									  )}`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>% Receiving Aid:</p>
							<p>
								{financial.aid.general.percentage
									? `${financial.aid.general.percentage}%`
									: 'N/A'}
							</p>
						</div>
						<div>
							<p className='font-medium'>Average Aid Package:</p>
							<p>
								{financial.aid.general.average
									? `${USD.format(
											financial.aid.general.average
									  )}`
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
				<CardContent className='grid grid-cols-3 gap-y-8'>
					<div className='flex items-center'>
						<Users className='w-5 h-5 mr-2' />
						<span>
							Students: {(+enrollment.total).toLocaleString()}
						</span>
					</div>
					<div className='flex items-center'>
						<BookOpen className='w-5 h-5 mr-2' />
						<span>
							Student-Faculty Ratio:{' '}
							{academics.studentFacultyRatio || 'N/A'}
						</span>
					</div>
				</CardContent>
			</Card>

			<Card className='w-full max-w-4xl mx-auto'>
				<CardHeader>
					<CardTitle className='text-xl'>Demographics</CardTitle>
				</CardHeader>
				<CardContent className='flex flex-col md:grid md:grid-cols-2 gap-8'>
					<div className='flex flex-col gap-8 '>
						<div className='w-full'>
							<h4 className='text-lg font-semibold'>
								Gender Distribution
							</h4>
							<StackedBarChart
								data={genderData}
								colors={COLORS}
							/>
						</div>
						<div className='w-full col-span-3'>
							<h4 className='text-lg font-semibold mb-2'>
								Undergraduate v. Graduate Distribution
							</h4>
							<StackedBarChart
								data={{
									undergraduate: {
										total: enrollment.undergraduate,
										percent:
											enrollment.undergraduate /
											enrollment.total,
									},
									graduate: {
										total: enrollment.graduate,
										percent:
											enrollment.graduate /
											enrollment.total,
									},
								}}
								colors={COLORS.slice(4, 6)}
								proportion
							/>
						</div>
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
				</CardContent>
			</Card>
		</div>
	);
}
