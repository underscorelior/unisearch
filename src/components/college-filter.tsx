// TODO: Redo the queries
'use client'
import React, { useCallback, useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from 'next/link';
import { CircleQuestionMark } from 'lucide-react';


export default function CollegeFilter({ setQueries, states }: {
    setQueries: React.Dispatch<React.SetStateAction<{
        [key: string]: string | number;
    }>>;
    states: string[];
}) {
    const [control, setControl] = useState({
        priv: true, // priv = 2 (forprofit), 3, 4
        pub: true  // pub = 1
    });
    const [state, setState] = useState<string>('INIT')

    useEffect(() => {
        if (state === 'INIT') return


        const out = {} as { [key: string]: string };
        let controlStr = '';

        if (control.priv === control.pub) { controlStr = ''; }
        else if (control.priv) controlStr = '2,3,4';
        else controlStr = '1';

        out['inst_control'] = controlStr;

        out['state'] = state
        setQueries(p => ({
            ...p,
            ...out,
        }));

    }, [control, state, setQueries]);


    const handleControl = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setControl(p => ({
            ...p,
            [name]: checked
        }));

        if (state === 'INIT') setState('');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleSelect = useCallback((value: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setState(value == 'all' ? '' : value);
        console.log(value);
    }, []);

    return (
        <div className='md:sticky flex w-full justify-between md:min-h-[85vh] flex-col md:mx-auto h-full md:max-h-[100vh] md:left-0 md:top-0 md:m-6'>
            <div className='m-2 md:m-6 p-4'>
                <div className='flex flex-col'>
                    <span className='text-text-800 text-xl font-semibold'>University Control</span>
                    <div className='flex flex-row gap-1 accent-primary- items-center'>
                        <input className="size-4" type="checkbox" name="priv" value="Private" checked={control.priv} onChange={handleControl} />
                        <span>Private</span>

                    </div>
                    <div className='flex flex-row gap-1 accent-primary- items-center'>
                        <input className="size-4" type="checkbox" name="pub" value="Public" checked={control.pub} onChange={handleControl} />
                        <span>Public</span>
                    </div>
                </div>
                <div className='content-[""] w-full bg-accent-300 h-[1px] opacity-35 my-3'></div>
                <div className='flex flex-col'>
                    <span className='text-text-800 text-xl font-semibold'>State</span>
                    <Select defaultValue='all' value={state === 'INIT' ? 'all' : state} onValueChange={handleSelect}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All states" />
                        </SelectTrigger>
                        <SelectContent defaultValue={'all'}>
                            <SelectItem value="all">All States</SelectItem>
                            <div className='content-[""] w-[85%] mx-auto bg-accent-300 h-[1px] opacity-35 my-1' />
                            {states && states.length > 0 && states.map((state, idx) => (
                                <SelectItem key={idx} value={state} id={`state_${state}`}>{state}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                </div>
            </div >

            <Link href="/blog/ranking" className='text-text-600 m-2 p-4 text-sm flex-row items-center justify-center gap-2 hidden md:flex'>
                <CircleQuestionMark className='size-4' /> Ranking Methodology
            </Link>
        </div>
    );
}
