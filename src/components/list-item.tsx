import { MapPin } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function CollegeListItem({ college, index }: { college: ListItem, index: number }) {
    return (
        <Link
            href={`/info/${college.id}`}
            className='p-4 bg-primary-100/90 hover:bg-primary-200 transition rounded-md w-[95%] md:w-full mx-auto md:mx-0 md:max-w-3xl'
        >
            <div className='flex items-center gap-4'>
                <Image
                    src={
                        `https://img.logo.dev/${college.url // TODO: Implement proper logo fallback
                            .replace('https://', '')
                            .replace(
                                'http://',
                                ''
                            )}?token=${process.env.NEXT_PUBLIC_LOGO_KEY}&retina=true` ||
                        `${college.url}${college.url.endsWith('/') ? '' : '/'
                        }favicon.ico`
                    }
                    alt={`${college.name} campus`}
                    width={48}
                    height={48}
                    className='rounded-lg object-cover'
                />
                <div className='flex flex-col'>
                    <span className='font-semibold text-lg'>
                        {college.name}
                    </span>
                    <span className='text-sm flex items-center gap-1'>
                        <MapPin className='inline-block size-3' />{college.city}, {college.state} <div className='inline-block content-[""]' /> {college.inst_control === 1 ? '(Public)' : '(Private)'}
                    </span>
                    <span className='text-sm flex items-center gap-1'>
                        #{index + 1}
                    </span>
                </div>
            </div>
        </Link>
    )
}
