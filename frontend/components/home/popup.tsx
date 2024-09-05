"use client"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Comment } from "@/data/data"
import { Issue } from "@/data/data"
import Commentlist from '@/components/home/commentlist'
import { use, useEffect, useState } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useCallback } from 'react';
import AvatarComponent from "../avatar"

interface IssueDisplayProps {
    item: Issue
}

export function IssueDisplay({ item }: IssueDisplayProps) {
    const router = useRouter()
    const [newComment, setNewComment] = useState('');
    const [FetchedComment, setFetchedComment] = useState<Comment[]>([]);
    const [is_admin, setAdmin] = useState(false)
    const [email, setEmail] = useState("")

    const fetchComments = useCallback(() => {
        if (item.issue_id) {
            axios.get("http://localhost:8000/api/comments/" + item.issue_id)
                .then((response) => {
                    console.log(response.data);
                    setFetchedComment(response.data);
                })
                .catch((err) => { console.log(err); });
        }
    }, [item.issue_id]);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        fetchComments();
        if (storedUserDetails) {
            const parsedUserDeatils = JSON.parse(storedUserDetails)
            setEmail(parsedUserDeatils.email);
            if (parsedUserDeatils.is_admin) {
                setAdmin(true);
            }
            else {
                setAdmin(false);
            }
        }
    }, [fetchComments]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        axios
            .post("http://localhost:8000/api/comment/new/", {
                author_email: email,
                content: newComment,
                issue_commented: item.issue_id
            })
            .then((response) => {
                setNewComment("");
                fetchComments();
            })
            .catch((error) => {
                if (error.response) {
                    alert(JSON.stringify(error.response.data));
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });
    };

    const handleClosedChange = async (e:React.FormEvent) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/issue/solve/",{
            id: item.issue_id
        })
        .then((response) =>{
            window.location.reload();
        })
        .catch((error) => {
            if (error.response) {
                alert(JSON.stringify(error.response.data));
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    return (
        <div className="flex h-full flex-col">
            {item ? (
                <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-start gap-4 text-sm">
                        <AvatarComponent name={item.author} />
                            <div className="grid gap-1">
                                <div className="font-bold">{item.issue_title}</div>
                                <div className="font-semibold">{item.author}</div>
                            </div>
                        </div>
                        {item.issue_date && (
                            <div className="">
                                <div className="ml-auto text-xs text-muted-foreground">
                                    {format(new Date(item.issue_date), "PPpp")}
                                </div>
                                <div className="line-clamp-1 text-xs font-semibold">{item.author_degisnation}</div>
                                <div className="line-clamp-1 text-xs">
                                    <span className="font-medium">Email Id:</span> {item.author_email}
                                </div>
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
                        {item.issue_content}
                    </div>
                    <Separator className="mt-auto" />
                    <div className="grid w-full">
                        <div>Comments</div>
                        <Commentlist comments={FetchedComment} />
                    </div>

                    {!item.is_solved && (
                        <div className="p-4">
                            <form onSubmit={handleCommentSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid w-full gap-2">
                                        <Textarea
                                            placeholder="Write your view here"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        />
                                        <Button >Comment</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                    {is_admin && (
                        <div className="m-2 p-2 flex flex-row-reverse">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline">
                                        {!item.is_solved ? 'Close the Issue' : 'Open the Issue'}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            {!item.is_solved ? 'Are you absolutely sure to close the Issue?' : 'Are you absolutely sure to open the Issue?'}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {!item.is_solved ? (
                                                'This will close the Issue. No one will be able to comment on the closed Issue.'
                                            ) : (
                                                'This will open the Issue. Everyone will be able to comment on the opened Issue.'
                                            )}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleClosedChange}>{!item.is_solved ? 'Close the Issue' : 'Open the Issue'}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}

                </div>
            ) : (
                <div className="p-8 text-center text-muted-foreground">
                    No message selected
                </div>
            )}
        </div>
    )
}


