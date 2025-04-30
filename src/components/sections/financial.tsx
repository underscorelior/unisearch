import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function Financial({
	financial,
}: {
	financial: UniversityInfoProps['financial'];
}) {
	const USD = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return (
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
								? `${USD.format(financial.aid.general.average)}`
								: 'N/A'}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
