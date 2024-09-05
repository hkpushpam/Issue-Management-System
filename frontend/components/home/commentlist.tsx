"use client"
import { formatDistanceToNow } from 'date-fns'
import { cn } from "@/lib/utils"
import { Comment } from "@/data/data"
import { ScrollArea } from '@/components/ui/scroll-area'
import AvatarComponent from '../avatar'

interface CommentListProps {
    comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
    if (!comments || comments.length === 0) {
        return <div>Be the First one to Share your view</div>;
    }
    return (
        <ScrollArea className="max-h-56 flex flex-col-reverse rounded-2xl border-3 min-w-full gap-2 p-4 bg-slate-400 dark:bg-slate-600">
            {comments.map((item) => (
                <div key={item.comment_id}
                    className={cn("flex flex-col items-start gap-2 rounded-lg border p-3 m-2 text-left  text-sm ",)} >
                    <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                            <div className="flex items-center gap-2">
                            <AvatarComponent name={item.author} />
                                <div className="font-semibold">{item.author}</div>
                            </div>
                            <div className={cn("ml-auto text-xs")} >
                                {formatDistanceToNow(new Date(item.comment_date), {
                                    addSuffix: true,
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground">
                        {item.comment_content}
                    </div>
                </div>
            ))}

        </ScrollArea>
    )
}

export default CommentList