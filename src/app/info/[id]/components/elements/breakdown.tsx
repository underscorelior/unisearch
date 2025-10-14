import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { BarChart3, ChartColumnBig } from 'lucide-react'
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
            </DialogContent>
        </Dialog>
    )
}