import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BarChart3, ChartColumnBig, Search } from 'lucide-react'
import React from 'react'
import { COLORS } from '@/utils/utils'
import MultiBarChart from '@/components/charts/multi-bar-chart'
import Comparisons from './comparisons'



export default function Breakdown({ admissions, className }: { admissions: Admissions, className?: string }) {
    /* eslint-disable */
    const { total: applTotal, ...appl } = admissions.appl;
    const { total: admTotal, ...adm } = admissions.adm;
    const { total: enrlTotal, ...enrl } = admissions.enrl;
    /* eslint-enable */

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`btn text-base ${className}`}>
                    <ChartColumnBig className="h-4 w-4" />
                    Breakdown
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-xs md:max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className='hidden'>
                    <DialogTitle>Admissions Breakdown</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 grid">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                                <BarChart3 className="size-6" />
                                Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col lg:grid lg:grid-cols-[40%,60%] gap-4 text-sm'>
                            <Comparisons admissions={admissions} />

                            <MultiBarChart data={[
                                { name: 'Applied', data: appl },
                                { name: 'Admitted', data: adm },
                                { name: 'Enrolled', data: enrl }
                            ]} colors={COLORS} className="hidden lg:flex" />

                            <MultiBarChart data={[
                                { name: 'Applied', data: appl },
                                { name: 'Admitted', data: adm },
                                { name: 'Enrolled', data: enrl }
                            ]} colors={COLORS} className="flex lg:hidden" margin={0} height={300} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                                <Search className="size-6" />
                                Admissions Considerations
                            </CardTitle>
                            <CardDescription>Factors considered in the admission process</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Considerations admissions={admissions} />
                        </CardContent>
                    </Card>
                </div>
            </DialogContent>
        </Dialog >)
}



function Considerations({ admissions }: { admissions: Admissions }) {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(admissions.considerations).map(([key, value]) => {
                if (!value.name || !value.value) return null
                const importance = value.value.toLowerCase()
                const color = importance.includes("required")
                    ? "text-emerald-600"
                    : importance.includes("not considered")
                        ? "text-rose-600"
                        : importance.includes("considered")
                            ? "text-sky-600"
                            : "text-zinc-600"

                return (
                    <div key={key} className="flex flex-col md:flex-row justify-between md:items-center gap-y-1">
                        <span className="text-sm">{value.name}</span>
                        <div className={`sub-badge ${color} border-current`}>
                            {value.value}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}