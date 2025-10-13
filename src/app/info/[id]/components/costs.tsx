import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { fixURL, formatCurrency, formatNumber, formatPercent } from '@/utils/utils'
import { BadgeDollarSignIcon, Calculator, ExternalLink, Microscope, Receipt } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function TuitionFeesCosts({ costs }: { costs: Costs }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Receipt className="size-6" />
                    Tuition, Fees & Other Costs
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:grid md:grid-cols-[50%_1%_45%] gap-4">
                <div className='h-full flex flex-col-reverse md:flex-col justify-between gap-4'>
                    <div>
                        <div className="text-base font-bold">Cost of Attendance</div>
                        {costs.supp_cost !== null && (
                            <div className='flex justify-between text-sm'>
                                <span>Books & Supplies</span>
                                <span className="font-semibold">{formatCurrency(costs.supp_cost)}</span>
                            </div>
                        )}
                        {costs.on_dorm_mls_cost !== null && (
                            <div className='flex justify-between text-sm'>
                                <span>Room & Board <span className='text-xs'>(On-Campus)</span></span>
                                <span className="font-semibold">{formatCurrency(costs.on_dorm_mls_cost)}</span>
                            </div>
                        )}
                        {costs.on_other_cost !== null && (
                            <div className='flex justify-between text-sm mb-1'>
                                <span>Other Expenses <span className='text-xs'>(On-Campus)</span></span>
                                <span className="font-semibold">{formatCurrency(costs.on_other_cost)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm items-center">
                            <span className='flex flex-col'>
                                <span className="font-semibold">Total</span>
                            </span>
                            <span className="font-bold text-[1.1rem]">{formatCurrency((costs.supp_cost || 0) + (costs.on_dorm_mls_cost || 0) + (costs.on_other_cost || 0))}</span>
                        </div>
                    </div>
                    <div className='w-[99%] h-0.5 content-[""] bg-primary-400/90 mx-auto md:my-1.5' />
                    <div>
                        <div className="text-base justify-between flex mt-2">
                            <span className="font-semibold">
                                Housing
                            </span>
                            {costs.offers_housing && (
                                <div className={`inline-flex items-center justify-center bg-background-50 rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 ${costs.offers_housing ? "border-emerald-500/50 text-emerald-600" : "border-rose-500/50 text-rose-600"}`}>
                                    Housing {costs.offers_housing ? "Available" : "Not Available"}
                                </div>
                            )}
                        </div>

                        {costs.housing_capacity && (
                            <div className="flex justify-between text-sm mt-1">
                                Housing Capacity
                                <span className="text-sm font-semibold">
                                    {formatNumber(costs.housing_capacity)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div className='h-[99%] w-0.5 content-[""] bg-primary-400/90 my-auto hidden md:block' />
                <div className='flex justify-between flex-col gap-1'>
                    <div className='font-bold text-base'>Total Costs</div>
                    <div>
                        {costs.tuit_vary && costs.in.total !== costs.out.total && costs.in.pct !== null && (
                            <div className="flex justify-between text-sm font-semibold mb-0.5">
                                {costs.tuit_vary ? "In-State" : "Percent of Students Paying"}
                                <span className='font-semibold'>{formatPercent(costs.in.pct)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-sm">
                            <span>Tuition</span>
                            <span className="font-medium">{formatCurrency(costs.in.tuition)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Fees</span>
                            <span className="font-medium">{formatCurrency(costs.in.fees)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold">Total<span className='pl-1 text-xs'>(On-Campus)</span></span>
                            <span className="font-bold text-[1.05rem]">{formatCurrency(costs.in.total)}</span>
                        </div>
                    </div>
                    <Separator />
                    {costs.tuit_vary && costs.in.total !== costs.out.total && (<div>
                        <div className="flex justify-between text-sm font-semibold mb-0.5">
                            Out-of-State
                            <span className='font-semibold'>{formatPercent(costs.out.pct)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Tuition</span>
                            <span className="font-medium">{formatCurrency(costs.out.tuition)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Fees</span>
                            <span className="font-medium">{formatCurrency(costs.out.fees)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-sm">
                            <span className="font-semibold text-[15px]">Total<span className='pl-1 text-xs'>(On-Campus)</span></span>
                            <span className="font-bold text-lg">{formatCurrency(costs.out.total)}</span>
                        </div>
                    </div>)}
                </div>
            </CardContent>
        </Card>
    )
}

export function FinancialAid({ costs }: { costs: Costs }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BadgeDollarSignIcon className="size-6" />
                    Financial Aid
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <div className="text-sm mb-1">Students Receiving Grant Aid</div>
                        <div className="text-2xl font-bold">
                            {formatPercent(costs.pct_grant_aid)}
                        </div>
                    </div>
                    <div>
                        <div className="text-sm mb-1">Average Grant Aid Amount</div>
                        <div className="text-2xl font-bold">{formatCurrency(costs.avg_grant_aid_amt)}</div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0'>
                {costs.faid_url && (
                    <Link href={fixURL(costs.faid_url)} target="_blank">
                        <button className='link-btn md:px-2 md:py-1 md:text-base'>
                            <ExternalLink className="size-5" />
                            Financial Aid Information
                        </button>
                    </Link>
                )}
                {costs.net_calc_url && (
                    <Link href={fixURL(costs.net_calc_url)} target="_blank">
                        <button className='link-btn md:px-2 md:py-1 md:text-base'>
                            <Calculator className="size-5" />
                            Net Price Calculator
                        </button>
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}

export function ResearchEndowment({ core, enrollment }: { core: CoreInfo, enrollment: EnrollmentInfo }) {
    return (core.rnd_spend || core.endow_fte) && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Microscope className='size-6' /> Research & Financial Strength
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                    {core.rnd_spend && (
                        <div>
                            <div className="text-sm mb-1">Research Spending</div>
                            <div className="text-2xl font-bold">{formatCurrency(core.rnd_spend * 1000)}</div>
                        </div>
                    )}
                    {core.endow_fte && (
                        <div>
                            <div className="text-sm mb-1">Endowment</div>
                            <div className="text-2xl font-bold flex flex-col">{formatCurrency(core.endow_fte * enrollment.fte_pop)}
                                <span className="text-sm font-medium">({formatCurrency(core.endow_fte)}/ FTE)</span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}