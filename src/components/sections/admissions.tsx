import { ExternalLink, Link2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import StackedBarChart from '../bar-chart-stacked';
import TestScoreRange from '../test-range';
import AdmissionsGraph from '../admissions-graph';
import { COLORS, fixURL } from '@/utils/utils';

export default function Admissions({
	general,
	admissions,
}: {
	general: UniversityInfoProps['general'];
	admissions: UniversityInfoProps['admissions'];
}) {
	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl flex flex-row justify-between'>
					Admission Information
					<a href={fixURL(general.URLs.admissions)}>
						<Badge
							variant={'outline'}
							className='flex gap-2 flex-row w-max text-sm'
						>
							<Link2 /> Admissions Homepage
						</Badge>
					</a>
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
					<AdmissionsGraph
						className='col-span-1'
						data={[
							{
								name: 'Accepted',
								value: admissions.acceptanceRate.overall * 100,
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
												admissions.applicants.total) *
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
				<a
					href={fixURL(general.URLs.application)}
					className='ml-auto'
					target='_blank'
				>
					<Badge
						variant={'outline'}
						className='flex gap-2 flex-row w-max text-sm'
					>
						<ExternalLink /> More Application Information
					</Badge>
				</a>
			</CardFooter>
		</Card>
	);
}
