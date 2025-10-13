"use client"
import SimpleStackedBarChart from '@/components/charts/simple-stacked'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { capitalizeFirstLetter, COLORS, formatNumber } from '@/utils/utils'
import { Globe2, Users } from 'lucide-react'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

export function EnrollmentOverview({ enrollment }: { enrollment: EnrollmentInfo }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="size-6" />
                    Enrollment Overview
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Total Enrollment</span>
                        <span className="font-semibold">{formatNumber(enrollment.total_pop)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Undergraduate</span>
                        <span className="font-semibold">{formatNumber(enrollment.ugrd_pop)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Graduate</span>
                        <span className="font-semibold">{formatNumber(enrollment.grad_pop)}</span>
                    </div>

                    <SimpleStackedBarChart
                        data={{
                            Undergraduate: enrollment.ugrd_pop,
                            Graduate: enrollment.grad_pop
                        }}
                        total={enrollment.total_pop}
                        colors={[COLORS[2], COLORS[6]]}
                    />
                </div>
                <div>
                    <div className="flex justify-between text-sm">
                        <span>Full-Time</span>
                        <span className="font-semibold">{formatNumber(enrollment.ft_pop)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                        <span>Part-Time</span>
                        <span className="font-semibold">{formatNumber(enrollment.pt_pop)}</span>
                    </div>
                </div>
                <div className="flex justify-between flex-col text-sm">
                    <span className='mb-1'>Gender Breakdown</span>
                    <SimpleStackedBarChart
                        data={{
                            Male: 1 - enrollment.pct.female,
                            Female: enrollment.pct.female,
                        }}
                        total={1}
                        colors={COLORS}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export function EthnicityBreakdown({ enrollment }: { enrollment: EnrollmentInfo }) {
    const data = [
        { name: 'White', value: enrollment.pct.white, color: "#F8F9D2" },
        { name: 'Asian', value: enrollment.pct.asian, color: "#F2F3AE" },
        { name: 'Hispanic', value: enrollment.pct.hispanic, color: "#D58936" },
        { name: 'Black', value: enrollment.pct.black, color: "#3C1518" },
        { name: 'International', value: enrollment.pct.nonresident, color: "#69140E" },
        { name: 'Two or More', value: enrollment.pct.two, color: "#A44200" },
        { name: 'Native American', value: enrollment.pct.native, color: "#D58936" },
        { name: 'Pacific Islander', value: enrollment.pct.pacific, color: "#F2F3AE" },
        { name: 'Unknown', value: enrollment.pct.unknown, color: "#C0C0C0" },
    ].sort((a, b) => b.value - a.value)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe2 className="size-6" />
                    Race & Ethnicity Distribution
                </CardTitle>

                <CardDescription>Student enrollment by race and ethnicity</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col md:flex-row items-center justify-between w-full'>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            outerRadius={110}
                            dataKey='value'
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const { name, value } = payload[0];
                                    return (
                                        <div className='bg-background- p-2 border rounded-md'>
                                            <h1 className='text-lg font-semibold'>
                                                {name}
                                            </h1>
                                            <p>{`${(

                                                (value as number) * 100
                                            )?.toPrecision(3)}%`}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className='grid grid-cols-2 md:flex pt-1 md:flex-col gap-2 mb-4 md:justify-center'>
                    {data.map((item, idx) => {
                        const { value, color, name } = item;
                        if (!value) return null;
                        return (
                            <span
                                key={idx}
                                className='flex flex-row items-center text-xs font-sans text-neutral-700 dark:text-neutral-300'
                            >
                                <div
                                    style={{
                                        backgroundColor: color,
                                    }}
                                    className='size-4 rounded-sm min-w-1 border'
                                ></div>
                                <span className='font-medium pl-2'>
                                    {capitalizeFirstLetter(name)}
                                </span>
                                <span className='font-bold pl-1'>
                                    {(value * 100).toFixed(0)}%
                                </span>
                            </span>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    )
}