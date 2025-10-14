'use client'
import TestScoreRange from '@/components/charts/test-range'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { fixURL, formatCurrency, formatNumber, formatPercent } from '@/utils/utils'
import { Award, ExternalLink, GraduationCap, Search } from 'lucide-react'
import React from 'react'
import Breakdown from './elements/breakdown'
import Link from 'next/link'
import AdmissionsConsiderations from './elements/considerations'

export function ApplicationStats({ admissions }: { admissions: Admissions }) {
    return (
        <Card className='flex flex-col justify-between'>
            <div className='flex flex-col'>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex flex-row justify-between gap-2 w-full items-center">
                            <span className='flex items-center gap-2 text-xl md:text-2xl flex-row'>
                                <GraduationCap className="size-6" />
                                Application Statistics
                            </span>
                            <Breakdown className="hidden md:flex" admissions={admissions} />

                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Applications</span>
                            <span className="font-semibold">{formatNumber(admissions.appl.total)}</span>
                        </div>

                        <div className="flex justify-between text-sm mb-1">
                            <span>Admitted</span>
                            <span className="font-semibold">{formatNumber(admissions.adm.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Enrolled</span>
                            <span className="font-semibold">{formatNumber(admissions.enrl.total)}</span>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex justify-between flex-row text-sm mb-1">
                            <span>Acceptance Rate</span>
                            <span className="font-semibold text-emerald-600">
                                {formatPercent(admissions.acc_rate)}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Yield Rate</span>
                            <span className="font-semibold">{formatPercent(admissions.yield_rate)}</span>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span>Application Fee</span>
                            <span className="font-semibold">{formatCurrency(admissions.ug_app_fee)}</span>
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {admissions.appl_url && (
                    <Link
                        href={fixURL(admissions.appl_url)}
                        target='_blank'
                    >
                        <button className='btn text-base'><ExternalLink className='size-4' /> Apply Now</button>
                    </Link>
                )}
                <Breakdown className="flex md:hidden ml-auto" admissions={admissions} />
            </CardFooter>
        </Card>
    )
}

export function TestScores({ admissions }: { admissions: Admissions }) {
    return (
        <Card className='flex flex-col justify-between'>
            <div className='flex flex-col'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                        <Award className="size-6" />
                        Test Scores
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">SAT</span>
                            <div className='sub-badge border-accent-400'>{formatPercent(admissions.sat.pct)} submit</div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Reading & Writing</span>
                                    <span>
                                        {admissions.sat.rw_25} - {admissions.sat.rw_75}
                                    </span>
                                </div>
                                {admissions.sat.rw_25 && admissions.sat.rw_75 &&
                                    <TestScoreRange min={200} max={800} q1={admissions.sat.rw_25} q3={admissions.sat.rw_75} />
                                }
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Math</span>
                                    <span>
                                        {admissions.sat.math_25} - {admissions.sat.math_75}
                                    </span>
                                </div>
                                {admissions.sat.math_25 && admissions.sat.math_75 &&
                                    <TestScoreRange min={200} max={800} q1={admissions.sat.math_25} q3={admissions.sat.math_75} />
                                }
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold">ACT</span>
                            <div className='sub-badge border-accent-400'>{formatPercent(admissions.act.pct)} submit</div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>Composite</span>
                                    <span>
                                        {admissions.act.comp_25} - {admissions.act.comp_75}
                                    </span>
                                </div>
                                {admissions.act.comp_25 && admissions.act.comp_75 &&
                                    <TestScoreRange min={1} max={36} q1={admissions.act.comp_25} q3={admissions.act.comp_75} />
                                }
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                <div className={`inline-flex items-center justify-center rounded-md bg-background- border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 ${admissions.ap_credit ? "border-emerald-500/50 text-emerald-600" : "border-rose-500/50 text-rose-600"}`}>
                    AP Credit {admissions.ap_credit ? "Accepted" : "Not Accepted"}
                </div>
                <AdmissionsConsiderations admissions={admissions} className="flex md:hidden ml-auto" />
            </CardFooter>
        </Card>
    )
}