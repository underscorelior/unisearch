import { getUniversityInfo } from "@/utils/utils"
import {
    Loader2,
    MapPin,
} from "lucide-react"
import Image from "next/image"

import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { ApplicationStats, TestScores } from "./components/admissions"
import { FinancialAid, ResearchEndowment, TuitionFeesCosts } from "./components/costs"
import { EnrollmentOverview, EthnicityBreakdown } from "./components/enrollment"
import Header from "./components/header"
import { RetGradRate, Services } from "./components/other"


export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const id = (await params).id

    const university = await getUniversityInfo(id);

    const headersList = await headers();
    const host = headersList.get('host');

    return {
        title: `${university.core.name} - Information`,
        description: `Information about ${university.core.name}`, // TODO: Later use a snippet of the AI overview or smth.
        openGraph: {
            images: [
                {
                    url: `https://${host}/info/${id}/opengraph-image`,
                    width: 1200,
                    height: 630,
                    alt: university.core.name,
                },
            ],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const university = await getUniversityInfo(id);

    return (
        <main className='w-full bg-background-50'>{university ? (
            <div className="min-h-screen pb-4">
                <div className="relative h-[400px] overflow-hidden">
                    <Image src={`/header-images/${id}.webp`} alt={university.core.name} className="w-full h-full object-cover" fill={true} />
                    {/* <img src={`/header-images/${id}.webp`} alt={university.core.name} className="w-full h-full object-cover" fill={true} /> */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 container mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white text-balance mb-2">{university.core.name}</h1>
                        <div className="flex items-center gap-3 text-white/90 text-sm md:text-lg">
                            <div className="flex items-center gap-1 md:gap-2">
                                <MapPin className="size-4 md:h-5 md:w-5" />
                                <span>
                                    {university.core.city}, {university.core.state}
                                </span>
                            </div>
                            <span>•</span>
                            <span>{university.core.inst_control}</span>
                            {university.core.year ? <span>•</span> : <></>}
                            <span>{university.core.year}</span>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 space-y-4">
                    <Header university={university} />

                    <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                        <EnrollmentOverview enrollment={university.enrollment} />

                        <EthnicityBreakdown enrollment={university.enrollment} />
                    </div>

                    <div className="flex flex-col md:grid md:grid-cols-[6fr_5fr_5fr] gap-4">
                        <ApplicationStats admissions={university.admissions} />
                        <TestScores admissions={university.admissions} />
                        <RetGradRate outcomes={university.outcomes} />
                    </div>

                    <TuitionFeesCosts costs={university.costs} />

                    <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-4">
                        <Services services={university.services} />
                        <div className="flex flex-col gap-4" >
                            <FinancialAid costs={university.costs} />
                            <ResearchEndowment core={university.core} enrollment={university.enrollment} />
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-96">
                <Loader2 className="h-10 w-10 text-primary-500 animate-spin mb-4" />
                <p className="text-zinc-400">Loading college information...</p>
            </div>
        )}
        </main>
    )
}