import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search } from 'lucide-react';
import React from 'react'



export default function AdmissionsConsiderations({ admissions, className }: { admissions: Admissions, className?: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className={`btn text-base ${className}`}>
                    <Search className="h-4 w-4" />
                    Considerations
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm md:max-w-5xl max-h-[80vh] overflow-y-auto">
                <DialogHeader className='hidden'>
                    <DialogTitle>Admissions Considerations</DialogTitle>
                </DialogHeader>
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