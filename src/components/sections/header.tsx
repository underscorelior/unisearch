import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {
	Building,
	Church,
	GraduationCap,
	Link2,
	LucideCalendarDays,
	LucideNetwork,
	MapPin,
	Phone,
	TowerControl,
	TreeDeciduous,
} from 'lucide-react';
import Image from 'next/image';
import { fixURL, formatPhoneNumber } from '@/utils/utils';

export default function Header({
	core,
	description,
}: {
	core: CoreInfo;
	description: string;
}) {
	return (
		<Card className='w-full max-w-4xl mx-auto'>
			<CardHeader>
				<div className='flex flex-col md:flex-row items-center gap-4'>
					{/* <Image
						src={
							`https://img.logo.dev/${('web.mit.edu/' ==
							general.URLs.general
								? 'https://www.utdallas.edu'
								: general.URLs.general
							)
								.replace('https://', '')
								.replace(
									'http://',
									''
								)}?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
							`${
								'web.mit.edu/' == general.URLs.general
									? 'https://www.utdallas.edu'
									: general.URLs.general
							}${
								general.URLs.general.endsWith('/') ? '' : '/'
							}favicon.ico`
						}
						alt={`${general.name} campus`}
						width={200}
						height={200}
						className='rounded-lg object-cover'
					/> */}
					<Image
						src={
							`https://img.logo.dev/${core.url
								.replace('https://', '')
								.replace(
									'http://',
									''
								)}?token=pk_SlnGUaGiQEClf4KEK7bUwA&retina=true` ||
							`${core.url}${core.url.endsWith('/') ? '' : '/'
							}favicon.ico`
						}
						alt={`${core.name} campus`}
						width={200}
						height={200}
						className='rounded-lg object-cover'
					/>
					<div className='flex-grow'>
						<CardTitle className='text-2xl md:text-3xl'>
							{core.name}
						</CardTitle>
						<CardDescription className='flex items-center mt-2'>
							<MapPin className='w-4 h-4 mr-2' />
							{core.city}, {core.state}
							<TowerControl className='w-4 h-4 ml-6 mr-2' />
							<span>{core.inst_control}</span>
							<Church className='w-4 h-4 ml-6 mr-2' />
							{core.urban && (
								<>
									<Building className='w-4 h-4 ml-6 mr-2' />
									<span>{core.urban.split(': ')[0]}</span>
									<TreeDeciduous className='w-4 h-4 ml-6 mr-2' />
									<span>{core.urban.split(': ')[1]}</span>
								</>
							)}
							{core.mc_sys && (
								<>
									<LucideNetwork className='w-4 h-4 ml-6 mr-2' />{' '}
									{core.mc_sys_nm}
								</>
							)}
							<LucideCalendarDays className='size-4 ml-6 mr-2' />{' '}
							{core.cal_sys}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<p className='text-muted-foreground mb-4'>{description}</p>

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
							<span className='font-medium'>{core.hgh_deg} </span>
						</span>
					</div>
				</div>
				<a href={fixURL(core.url)} target='_blank'>
					{/* className='flex gap-2 flex-row w-max text-sm' */}
					<Link2 /> School Homepage
				</a>
				{core.phone && (
					<a href={`tel:${core.phone}`} target='_blank'>
						{/* className='flex gap-2 flex-row w-max text-sm' */}
						<Phone /> {formatPhoneNumber(core.phone)}
					</a>
				)}
			</CardContent>
		</Card>
	);
}
