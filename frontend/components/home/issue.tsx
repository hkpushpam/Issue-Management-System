"use client"
import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import IssueList from "@/components/home/issuelist"
import { type Issue } from '@/data/data';

interface IssueProps {
    issues: Issue[]
}

export default function IssueShow({
    issues,
}: IssueProps) {

    return (
        <>
            <Tabs defaultValue="open" className="">
                <div className="flex items-center px-4 py-2">
                    <h1 className="text-xl font-bold">Issues</h1>
                    <TabsList className="ml-auto">
                        <TabsTrigger value="open" className="text-zinc-600 dark:text-zinc-200" >
                            Open
                        </TabsTrigger>
                        <TabsTrigger value="closed" className="text-zinc-600 dark:text-zinc-200" >
                            Closed
                        </TabsTrigger>
                        <TabsTrigger value="every" className="text-zinc-600 dark:text-zinc-200" >
                            All
                        </TabsTrigger>
                    </TabsList>
                </div>
                <Separator />
                <TabsContent value="open" className="m-0">
                    <IssueList items={issues.filter((item) => !item.is_solved)} />
                </TabsContent>
                <TabsContent value="every" className="m-0">
                    <IssueList items={issues} />
                </TabsContent>
                <TabsContent value="closed" className="m-0">
                    <IssueList items={issues.filter((item) => item.is_solved)} />
                </TabsContent>
            </Tabs>
        </>
    )
}