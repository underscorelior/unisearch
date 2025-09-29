import { University } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { SearchBar } from './search-bar'

export default function Navbar() {
    return (
        <nav className='flex flex-col bg-background- w-full pt-5 gap-y-5 shadow-sm'>
            <div className='grid grid-cols-[2fr,5fr,2fr] w-full items-center max-w-[90%] justify-center gap-10 mx-auto'>
                <Link href="/" className='mx-auto flex flex-row gap-2 items-center justify-center text-2xl font-bold text-primary-700'>
                    <University className='size-8 stroke-primary-700' /> Unisearch
                </Link>
                <div className='mx-auto w-full'>
                    <SearchBar />
                </div>
            </div>
            <div className='content-[""] w-full h-[2px] bg-background-600/50 mx-auto' />
        </nav>
    )
}
