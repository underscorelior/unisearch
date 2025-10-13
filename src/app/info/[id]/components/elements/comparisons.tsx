import SimpleStackedBarChart from '@/components/charts/simple-stacked'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { COLORS, formatNumber, formatPercent } from '@/utils/utils';
import React, { useState } from 'react'

export default function Comparisons({ admissions }: { admissions: Admissions }) {
    const [selection, setSelection] = useState<'total' | 'male' | 'female' | 'other' | 'unknown'>('total');

    return (
        <div className='flex flex-col justify-between duration-200 transition-all'>
            <div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Applications{selection !== 'total' && <span className='text-xs font-light text-text-600 pl-1'>({selection})</span>}</span>
                    <span className="font-semibold">{formatNumber(admissions.appl[selection])}</span>
                </div>

                <div className="flex justify-between text-sm mb-1">
                    <span>Admitted{selection !== 'total' && <span className='text-xs font-light text-text-600 pl-1'>({selection})</span>}</span>
                    <span className="font-semibold">{formatNumber(admissions.adm[selection])}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Enrolled{selection !== 'total' && <span className='text-xs font-light text-text-600 pl-1'>({selection})</span>}</span>
                    <span className="font-semibold">{formatNumber(admissions.enrl[selection])}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Acceptance Rate{selection !== 'total' && <span className='text-xs font-light text-text-600 pl-1'>({selection})</span>}</span>
                    <span className="font-semibold text-emerald-600">
                        {formatPercent((admissions.adm[selection] ?? 0) / (admissions.appl[selection] ?? 1))}
                    </span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                    <span>Yield Rate{selection !== 'total' && <span className='text-xs font-light text-text-600 pl-1'>({selection})</span>}</span>
                    <span className="font-semibold">{formatPercent((admissions.enrl[selection] ?? 0) / (admissions.adm[selection] ?? 1))}</span>
                </div>


                <SimpleStackedBarChart
                    data={{
                        Rejected: (admissions.appl[selection] ?? 0) - (admissions.adm[selection] ?? 0),
                        Admitted: (admissions.adm[selection] ?? 0) - (admissions.enrl[selection] ?? 0),
                        Enrolled: admissions.enrl[selection] ?? 0
                    }}
                    total={admissions.appl[selection] || 0}
                    colors={[COLORS[6], COLORS[2], COLORS[1]]}
                />


                {selection == 'total' && (
                    <div className='mt-4'>
                        <SimpleStackedBarChart
                            data={{
                                Male: admissions.appl.male ?? 0,
                                Female: admissions.appl.female ?? 0
                            }}
                            total={admissions.appl.total || 0}
                            colors={[COLORS[0], COLORS[1]]}
                        />
                    </div>
                )}

            </div>

            <ToggleGroup type="single" value={selection} onValueChange={(value) => setSelection(value as 'total' | 'male' | 'female' | 'other' | 'unknown')} className="flex flex-wrap md:flex md:flex-row">
                <ToggleGroupItem className='py-1 px-2 h-fit text-base font-medium' value="total" disabled={selection === 'total'}>Overall</ToggleGroupItem>
                {admissions.appl.male && admissions.appl.male > 0 ? <ToggleGroupItem className='py-1 px-2 h-fit text-base font-medium' value="male" disabled={selection === 'male'}>Male</ToggleGroupItem> : <></>}
                {admissions.appl.female && admissions.appl.female > 0 ? <ToggleGroupItem className='py-1 px-2 h-fit text-base font-medium' value="female" disabled={selection === 'female'}>Female</ToggleGroupItem> : <></>}
                {admissions.appl.other && admissions.appl.other > 0 ? <ToggleGroupItem className='py-1 px-2 h-fit text-base font-medium' value="other" disabled={selection === 'other'}>Other</ToggleGroupItem> : <></>}
                {admissions.appl.unknown && admissions.appl.unknown > 0 ? <ToggleGroupItem className='py-1 px-2 h-fit text-base font-medium' value="unknown" disabled={selection === 'unknown'}>Unknown</ToggleGroupItem> : <></>}
            </ToggleGroup>
        </div>
    )
}
