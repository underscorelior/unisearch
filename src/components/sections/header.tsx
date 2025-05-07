import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import {
	Building,
	GraduationCap,
	Link2,
	MapPin,
	TowerControl,
	TreeDeciduous,
} from 'lucide-react';
import Image from 'next/image';
import { locale_conv, control_conv, high_deg_conv } from '@/utils/conversion';
import { fixURL } from '@/utils/utils';

export default function Header({
	general,
	academics,
}: {
	general: UniversityInfoProps['general'];
	academics: UniversityInfoProps['academics'];
}) {
	const locale = (locale_conv as { [key: string]: string })[
		general.location.campusLocale
	];
	const controlOfInst = (control_conv as { [key: string]: string })[
		general.controlOfInst
	];
	const highestDegreeOffered = (high_deg_conv as { [key: string]: string })[
		academics.highestDegreeOffered
	];

	return (
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
								general.URLs.general.endsWith('/') ? '' : '/'
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
				<a href={fixURL(general.URLs.general)} target='_blank'>
					<Badge
						variant={'outline'}
						className='flex gap-2 flex-row w-max text-sm'
					>
						<Link2 /> School Homepage
					</Badge>
				</a>
			</CardContent>
		</Card>
	);
}
