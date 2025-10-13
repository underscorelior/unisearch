import SimpleStackedBarChart from '@/components/charts/simple-stacked'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPercent } from '@/utils/utils'
import { BookOpen, GraduationCap } from 'lucide-react'
import React from 'react'

export function RetGradRate({ outcomes }: { outcomes: Outcomes }) {
    const colors = ["hsl(var(--primary))", "hsl(var(--primary-200))"]

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="size-6" />
                    Graduation, Retention & Academic Info
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className='space-y-2'>
                    <span>Graduation Rates:</span>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span>4-Year</span>
                            <span className="font-semibold">
                                {formatPercent(outcomes.grad_rate_4_yr)}
                            </span>
                        </div>
                        <SimpleStackedBarChart
                            data={{
                                Graduated: outcomes.grad_rate_4_yr,
                                NotGraduated: 1 - outcomes.grad_rate_4_yr
                            }}
                            total={1}
                            colors={colors}
                            hideNames
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span>5-Year</span>
                            <span className="font-semibold">
                                {formatPercent(outcomes.grad_rate_5_yr)}
                            </span>
                        </div>
                        <SimpleStackedBarChart
                            data={{
                                Graduated: outcomes.grad_rate_5_yr,
                                NotGraduated: 1 - outcomes.grad_rate_5_yr
                            }}
                            total={1}
                            colors={colors}
                            hideNames
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-sm">
                            <span>6-Year</span>
                            <span className="font-semibold">
                                {formatPercent(outcomes.grad_rate_6_yr)}
                            </span>
                        </div>
                        <SimpleStackedBarChart
                            data={{
                                Graduated: outcomes.grad_rate_6_yr,
                                NotGraduated: 1 - outcomes.grad_rate_6_yr
                            }}
                            total={1}
                            colors={colors}
                            hideNames
                        />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm">
                        <span>Retention Rate (Full-Time)</span>
                        <span className="font-semibold">
                            {formatPercent(outcomes.ret_rate_ft)}
                        </span>
                    </div>
                    <SimpleStackedBarChart

                        data={{
                            Retained: outcomes.ret_rate_ft,
                            NotRetained: 1 - outcomes.ret_rate_ft
                        }}
                        total={1}
                        colors={colors}
                        hideNames
                    />
                </div>

                <Separator />
                <div className="flex justify-between text-sm">
                    <span>Student-Faculty Ratio</span>
                    <span className="font-semibold">{outcomes.stu_fac}:1</span>
                </div>
                <div>
                    <div className="flex justify-between text-sm">
                        <span>Transfer Out Rate</span>
                        <span className="font-semibold">{formatPercent(outcomes.transfer_out_rate)}</span>
                    </div>
                    <SimpleStackedBarChart
                        data={{
                            Transferred: outcomes.transfer_out_rate,
                            NotTransferred: 1 - outcomes.transfer_out_rate
                        }}
                        total={1}
                        colors={colors}
                        hideNames
                    />
                </div>

            </CardContent>
        </Card>
    )
}

export function Services({ services }: { services: Services }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Student Services & Programs
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.study_abroad ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Study Abroad</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.ug_research ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Undergraduate Research</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.career_counseling ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Career Counseling</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.employment_services ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Employment Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.placement_services ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Placement Services</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.teacher_cert ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">Teacher Certification</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`size-2 rounded-full ${services.rotc ? "bg-emerald-500" : "bg-rose-500"}`} />
                        <span className="text-sm">ROTC Programs</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}