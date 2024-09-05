"use client"
import { ComponentProps } from "react"
import { formatDistanceToNow } from 'date-fns'
import { Dialog, DialogContent, DialogTrigger, } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Issue } from "@/data/data"
import { IssueDisplay } from "./popup"
import AvatarComponent from '../avatar';

interface IssueListProps {
    items: Issue[]
}

export default function IssueList({ items }: IssueListProps) {
    if (!items || items.length === 0) {
        return <div>No Issues available</div>;
    }
    return (
        <div className="flex flex-col-reverse gap-2 p-4 ">

            {items.map((eachissue) => (
                <Dialog key={eachissue.issue_id}>
                    <DialogTrigger>
                        <button
                            className={
                                cn("flex flex-col items-start gap-2 rounded-lg border-2 p-3 min-w-full text-left text-sm transition-all scale-95 hover:scale-105",
                                    !eachissue.is_solved ? "border-orange-500" : "border-green-500"
                            )} >
                            <div className="flex min-w-full flex-col gap-1">
                                <div className="flex items-center">
                                    <div className="flex items-center gap-2">
                                        <AvatarComponent name={eachissue.author} />
                                        <div className="font-semibold">{eachissue.issue_title}</div>
                                        {!eachissue.is_solved && (
                                            <span className="flex h-2 w-2 rounded-full bg-orange-500" />
                                        )}
                                        {eachissue.is_solved && (
                                            <span className="flex h-2 w-2 rounded-full bg-green-500" />
                                        )}
                                    </div>
                                    <div className={cn("ml-auto text-xs")} >
                                        {formatDistanceToNow(new Date(eachissue.issue_date), {
                                            addSuffix: true,
                                        })}
                                    </div>
                                </div>
                                <div className="text-xs font-medium">{eachissue.author}</div>
                            </div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">
                                {eachissue.issue_content.substring(0, 80)}
                                {eachissue.issue_content.length>80? "...":" "}
                            </div>
                            {eachissue.labels.length ? (
                                <div className="flex items-center gap-2">
                                    {eachissue.labels.map((labels) => (
                                        <Badge key={labels} variant={getBadgeVariantFromLabel(eachissue.labels.indexOf(labels))}>
                                            {labels}
                                        </Badge>
                                    ))}
                                </div>
                            ) : null}
                        </button>
                    </DialogTrigger>
                    <DialogContent className={
                        cn("w-11/12 sm:w-4/6 md:w-3/5 scale-90 border-4  transition-all bg-slate-300 dark:bg-slate-700",
                        !eachissue.is_solved ? "border-orange-500" : "border-green-500")
                        }>
                        <IssueDisplay item={eachissue} />
                    </DialogContent>
                </Dialog>
            ))}

        </div>
    )
}

function getBadgeVariantFromLabel(
    count: number
): ComponentProps<typeof Badge>["variant"] {
    const variants: ("default" | "secondary" | "outline")[] = ["default", "secondary", "outline"];
    const variant = variants[count % variants.length];
    count--;
    return variant;
}

