import { capitalizeFirstLetter } from '@/utils/utils';
import React from 'react'
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MultiBarChart({ data, colors, margin = 20, height = 400, className }: {
    data: {
        name: string;
        data: {
            [key: string]: number | null;
        }
    }[];
    colors: string[];
    margin?: number;
    height?: number;
    className?: string;
}) {

    function formatData(data: { name: string; data: { [key: string]: number | null; } }[]) {
        return data.map(item => {
            const formattedItem: { [key: string]: number | string } = { name: item.name };
            for (const key in item.data) {
                if (item.data[key] !== null && item.data[key] > 0) {
                    formattedItem[capitalizeFirstLetter(key)] = item.data[key] as number;
                }
            }
            return formattedItem;
        }
        );
    }

    const formattedData = formatData(data);

    return (
        <div className={className + ' overflow-x-auto h-full'}>
            <ResponsiveContainer width="100%" height={height}>
                <BarChart
                    data={formattedData}
                    margin={{ top: 15, right: margin, left: margin, bottom: 5 }}
                >
                    <XAxis dataKey="name" />
                    <Tooltip
                        content={(props) => {
                            const { active, payload, label } = props;
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
                                        <p className="font-bold mb-1">{label}</p>
                                        {payload.map((entry, index) => (
                                            <p key={`item-${index}`} className="text-sm flex flex-row items-center gap-2">
                                                <span style={{ backgroundColor: entry.color }} className='size-3 rounded-sm min-w-1'></span>
                                                {entry.name}: {new Intl.NumberFormat('en').format(entry.value)}
                                            </p>
                                        ))}
                                        <p className="text-sm">Total: {new Intl.NumberFormat('en').format(payload.reduce((sum, entry) => sum + entry.value, 0))}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />


                    <Legend content={(props) => {
                        const { payload } = props;
                        return (
                            <div className='flex flex-row gap-x-4 justify-end'>
                                {payload?.toReversed().map((entry, index) => (
                                    <div key={`item-${index}`} className='flex flex-row items-center text-sm font-sans text-neutral-700 dark:text-neutral-300'>
                                        <div style={{ backgroundColor: entry.color }} className='size-3 rounded-sm min-w-1'></div>
                                        <span className='font-medium pl-2'>{entry.value}</span>
                                    </div>
                                ))}
                            </div>
                        );
                    }} />

                    {formattedData.length > 0 && Object.keys(formattedData[0]).filter(key => key !== 'name').map((key, index) => (
                        <Bar key={key} dataKey={key} fill={colors[index % colors.length]} label={(props: { x?: number | string; y?: number | string; width?: number | string; value?: number | string }) => {
                            const { x, y, width, value } = props;
                            if (typeof value !== 'number' || value === 0 || typeof x !== 'number' || typeof y !== 'number' || typeof width !== 'number') return null;
                            return (
                                <text x={x + width / 2} y={y - 8} fill="#000" textAnchor="middle" dominantBaseline="middle" className='text-xs md:text-sm font-medium'>
                                    {new Intl.NumberFormat('en').format(value)}
                                </text>
                            );
                        }} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div >
    );
}