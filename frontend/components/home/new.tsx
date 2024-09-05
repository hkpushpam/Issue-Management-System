import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "@/components/icons";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { Button } from "@/components/ui/button";


export default function IssueShow() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [Label, setLabel] = useState("");
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const storedUserDetails = localStorage.getItem('userDetails');
        if (storedUserDetails) {
            const parsedUserDeatils = JSON.parse(storedUserDetails)
            setUserDetails(parsedUserDeatils);
        }
        else {
            router.push('/login');
        }
    }, [router]);

    const handleNewIssue = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return;
        if (!description.trim()) return;

        axios
            .post("http://localhost:8000/api/issue/new/", {
                title: title,
                content: description,
                author_email: userDetails.email,
                labels: Label
            })
            .then((response) => {
                setIsDialogOpen(false);
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
        <>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger><Plus /></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Add New Issue</AlertDialogTitle>
                        <AlertDialogDescription>
                            {/* Issue Title */}
                            <div className="mb-4">
                                <label className="mb-2 block font-medium text-black dark:text-white">
                                    Issue Title
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Give the title"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            {/* Issue Description */}
                            <div className="mb-4">
                                <label className="mb-2 block font-medium text-black dark:text-white">
                                    Issue Description
                                </label>
                                <div className="relative">
                                    <Textarea placeholder="Type your message here." value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            {/* Labels */}
                            <div className="mb-4">
                                <label className="mb-2 block font-medium text-black dark:text-white">
                                    Labels
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter labels Use Comma to give new label"
                                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        value={Label}
                                        onChange={(e) => setLabel(e.target.value)}
                                    />
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={handleNewIssue} > Add New Issue </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </>
    )
}