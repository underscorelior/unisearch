'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { state_conv } from '@/utils/conversion';
import { fixURL, formatCurrency, formatNumber, formatPhoneNumber } from '@/utils/utils';
import {
    BookOpen,
    Calendar,
    // CircleQuestionMark,
    ExternalLink,
    Globe,
    GraduationCap,
    MapPin,
    Phone,
    Volleyball,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    { ssr: false }
)
const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    { ssr: false }
)
const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    { ssr: false }
)
const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    { ssr: false }
)
export default function Header({ university }: { university: UniversityInfo }) {
    const [isClient, setIsClient] = useState(false)


    useEffect(() => {
        import('leaflet').then((L) => {
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            })
            setIsClient(true)
        })
    }, [])

    return (
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
                <Card className='col-span-2'>
                    <CardHeader className='pb-3'>
                        <CardTitle className='flex flex-row justify-between font-semibold'>
                            Rankings{' '}
                            {/* <HoverCard>
                                <HoverCardTrigger href='/blog/ranking'>
                                    <CircleQuestionMark className='size-6 stroke-text-700' />
                                </HoverCardTrigger>
                                <HoverCardContent side='top' align='start'>
                                    <p className='text-base font-normal'>
                                        Rankings are calculated based on a combination of factors, for more information
                                        see{' '}
                                        <Link

                                            href={'/blog/ranking'}
                                            className='underline'
                                        >
                                            this article
                                        </Link>.
                                    </p>
                                    <div className='flex items-end justify-end mt-2 text-sm text-secondary-700'>
                                        <span className='text-xs'>Score: {(university.rankings.score || 0).toFixed(2)}</span>
                                    </div>
                                </HoverCardContent>
                            </HoverCard> */} {/* TODO: Add back in when blog is done */}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col md:grid md:grid-cols-2'>
                        <div className='text-lg font-bold font-mono text-text-600'>
                            {university.rankings.overall
                                ? `#${university.rankings.overall}`
                                : 'N/A'}
                            <span className='text-base font-sans font-medium text-text-'>
                                {' '}
                                - Overall National Rank
                            </span>
                        </div>

                        <div className='text-lg font-bold font-mono text-text-600'>
                            {university.rankings.control
                                ? `#${university.rankings.control}`
                                : 'N/A'}
                            <span className='text-base font-sans font-medium text-text-'>
                                {' '}
                                - {university.core.inst_control?.split(' ')[0]} College Rank
                            </span>
                        </div>

                        <div className='text-lg font-bold font-mono text-text-600'>
                            {university.rankings.state
                                ? `#${university.rankings.state}`
                                : 'N/A'}
                            <span className='text-base text-text- font-sans font-medium'>
                                {' '}
                                - {state_conv[university.core.state as keyof typeof state_conv]} Rank
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='pb-3'>
                        <CardTitle className='text-base text-text-800 font-medium'>
                            Total Students
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>
                            {formatNumber(university.enrollment.total_pop)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='pb-3'>
                        <CardTitle className='text-base text-text-800 font-medium'>
                            Tuition<span className='text-xs font-normal items-center ml-1'>{university.costs.tuit_vary ? '(In-State)' : ''}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-3xl font-bold'>
                            {formatCurrency(university.costs.tuit_vary ? university.costs.in.tuition : university.costs.out.tuition)}
                        </div>
                    </CardContent>
                </Card>
            </div >
            <div className='flex flex-col md:grid md:grid-cols-[5fr_3fr] mb-8 gap-4 h-full items-stretch'>
                {university.description && (
                    <Card className='justify-between flex flex-col'>
                        <div>
                            <CardHeader>
                                <CardTitle>About</CardTitle>
                                <CardDescription className='flex flex-col md:flex-row md:items-center gap-2 w-max pt-1'>
                                    {university.core.relig_control && (
                                        <div className='text-sm flex items-center gap-2 border px-2 py-0.5 rounded-sm bg-background- border-primary-400 w-fit'>
                                            <BookOpen className='size-4 stroke-2' />{' '}
                                            Affiliation: {university.core.relig_control}
                                        </div>
                                    )}
                                    <div className='text-sm flex items-center gap-2 border px-2 py-0.5 rounded-sm bg-background- border-primary-400 w-fit'>
                                        <Calendar className='size-4 stroke-2' />{' '}
                                        Calendar System: {university.core.cal_sys}
                                    </div>
                                    <div className='text-sm flex items-center gap-2 border px-2 py-0.5 rounded-sm bg-background- border-primary-400 w-fit'>
                                        <Volleyball className='size-4 stroke-2' /> NCAA:{' '}
                                        {university.core.ncaa_div
                                            ? `Division ${university.core.ncaa_div}`
                                            : 'N/A'}
                                    </div>
                                    {university.core.hgh_deg && (
                                        <div className='text-sm flex items-center gap-2 border px-2 py-0.5 rounded-sm bg-background- border-primary-400 w-fit'>
                                            <GraduationCap className='size-4 stroke-2' />{' '}
                                            Highest Degree: {university.core.hgh_deg}
                                        </div>
                                    )}

                                    {university.enrollment.online && (
                                        <div className='text-sm flex items-center gap-2 border px-2 py-0.5 rounded-sm bg-background- border-primary-400 w-fit'>
                                            <Globe className='size-4 stroke-2' /> Online University
                                        </div>
                                    )}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className='leading-relaxed'>
                                    {university.description}
                                </p>
                            </CardContent>
                        </div>
                        <CardFooter className='flex flex-col md:flex-row gap-2 md:gap-4 mt-4 md:mt-0 items-start md:items-center'>
                            {university.core.url && (
                                <Link
                                    href={fixURL(university.core.url)}
                                    target='_blank'
                                >
                                    <button className='link-btn'>
                                        <ExternalLink className='size-4' />
                                        Visit Website ({fixURL(university.core.url).replace('https://', '')})
                                    </button>
                                </Link>
                            )}
                            {university.core.phone && (
                                <div className="link-btn flex items-center gap-3 hover:bg-background-">
                                    <Phone className="h-5 w-5" />
                                    <span>{formatPhoneNumber(university.core.phone)}</span>
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                )
                }
                <Card className='flex flex-col justify-between'>
                    <div className="flex-grow flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Location
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isClient && (
                                <div className="aspect-video rounded-lg overflow-hidden border [&_.leaflet-control-attribution]:hidden md:w-[350px] lg:w-[400px] xl:w-[450px] 2xl:w-[500px]">
                                    <MapContainer
                                        center={[university.core.latitude || 0, university.core.longitude || 0]}
                                        zoom={15}
                                        style={{ width: '100%', height: '100%' }}
                                        className="z-0"
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[university.core.latitude || 0, university.core.longitude || 0]}>
                                            <Popup>
                                                <div className="font-semibold">{university.core.name}</div>
                                                <div className="text-sm">
                                                    {university.core.address}<br />
                                                    {university.core.city}, {university.core.state}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            )}
                        </CardContent>
                    </div>
                    <CardFooter className="flex flex-col items-start">
                        <div className="font-semibold">{university.core.address}</div>
                        <div className="text-sm">
                            {university.core.city}, {university.core.state}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
