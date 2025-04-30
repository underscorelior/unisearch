import { BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function Enrollment({
	enrollment,
	academics,
}: {
	enrollment: UniversityInfoProps['enrollment'];
	academics: UniversityInfoProps['academics'];
}) {
	return (
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
	);
}
