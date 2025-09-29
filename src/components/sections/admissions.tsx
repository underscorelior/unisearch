import { ExternalLink, Link2 } from 'lucide-react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import StackedBarChart from '../bar-chart-stacked';
import TestScoreRange from '../test-range';
import AdmissionsGraph from '../admissions-graph';
import { COLORS, fixURL } from '@/utils/utils';

// TODO: Figure out what to do with schools w/o adm stats

export default function Admissions({
	admissions,
}: {
	admissions: Admissions;
}) {
	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<CardHeader>
				<CardTitle className='text-2xl flex flex-row justify-between'>
					Admission Information
					{admissions.adm_url &&
						<a href={fixURL(admissions.adm_url)}>
							{/* 
								variant={'outline'}
								className='flex gap-2 flex-row w-max text-sm' */}
							<Link2 /> Admissions Homepage
						</a>}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
					<div className='w-full col-span-2 h-64'>
						<div className='w-full grid grid-cols-3 items-center justify-center h-full font-sans'>
							<div className='flex flex-col items-center'>
								<p className='text-3xl font-medium'>
									{(+(admissions.appl.total || 0)).toLocaleString()}
								</p>
								<p>Applied</p>
							</div>
							<div className='flex flex-col items-center'>
								<p className='text-3xl font-medium'>
									{(+(admissions.adm.total || 0)).toLocaleString()}
								</p>
								<p>Admitted</p>
							</div>
							<div className='flex flex-col items-center'>
								<p className='text-3xl font-medium'>
									{(+(admissions.enrl.total || 0)).toLocaleString()}
								</p>
								<p>Enrolled</p>
							</div>
						</div>
					</div>
					<AdmissionsGraph
						className='col-span-1'
						num={(admissions.acc_rate || 0) * 100} />
					{/* TODO: MAKE THE COLORS MORE TASTEFUL */}
					<StackedBarChart
						data={Object.entries(admissions.appl).reduce(
							(data, [key, value]) => {
								if (key !== 'total') {
									data[key] = {
										total: value as number,
										percent:
											((value as number) /
												(admissions.appl.total || 0)) *
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
								${admissions.ug_app_fee}
							</p>
							<p>Application Fee</p>
						</div>
					</div>
					<h2 className='col-start-1 col-span-2 text-xl font-semibold'>
						Test Scores
					</h2>
					{admissions.sat.math_25 && admissions.sat.math_75 && admissions.sat.rw_25 && admissions.sat.rw_75 && admissions.act.comp_25 && admissions.act.comp_75 ? (
						<div className='col-span-3 flex flex-col gap-8'>
							<TestScoreRange
								title='SAT Math'
								q1={admissions.sat.math_25}
								q3={admissions.sat.math_75}
								min={200}
								max={800}
							/>
							<TestScoreRange
								title='SAT Reading and Writing'
								q1={admissions.sat.rw_25}
								q3={admissions.sat.rw_75}
								min={200}
								max={800}
							/>
							<TestScoreRange
								title='ACT (Composite)'
								q1={admissions.act.comp_25}
								q3={admissions.act.comp_75}
								min={1}
								max={36}
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
					href={fixURL(admissions.appl_url || '')}
					className='ml-auto link-btn'
					target='_blank'
				>
					{/* className='flex gap-2 flex-row w-max text-sm' */}
					<ExternalLink className='size-5 stroke-2' /> More Application Information
				</a>
			</CardFooter>
		</Card >
	);
}
