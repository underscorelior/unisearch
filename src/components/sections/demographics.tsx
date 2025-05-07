import { COLORS, sortPieChartArray } from '@/utils/utils';
import StackedBarChart from '../bar-chart-stacked';
import LabelPieChart from '../pie-chart';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function Demographics({
	enrollment,
}: {
	enrollment: UniversityInfoProps['enrollment'];
}) {
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

	return (
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
						<StackedBarChart data={genderData} colors={COLORS} />
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
										enrollment.graduate / enrollment.total,
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
	);
}
