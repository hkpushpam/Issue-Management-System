// ! This is for Issues
import axios from 'axios';

// export const issues:Issue[] = [
//     {
//         "issue_id": 1,
//         "issue_title": "Issue 1",
//         "issue_content": "Description 1",
//         "issue_date": "2024-07-23T20:40:51.789442Z",
//         "is_solved": false,
//         "labels": [
//             "label1",
//             "label2",
//             "label3"
//         ],
//         "author": " ",
//         "author_email": "john@doe.com",
//         "author_degisnation": "Manager"
//     },
//     {
//         "issue_id": 2,
//         "issue_title": "Issue 2",
//         "issue_content": "Description 2",
//         "issue_date": "2024-07-23T20:40:51.793590Z",
//         "is_solved": false,
//         "labels": [
//             "label1",
//             "label 3"
//         ],
//         "author": " ",
//         "author_email": "jane@doe.com",
//         "author_degisnation": "Staff"
//     },
//     {
//         "issue_id": 3,
//         "issue_title": "Issue 3",
//         "issue_content": "Description 3",
//         "issue_date": "2024-07-23T20:40:51.795625Z",
//         "is_solved": false,
//         "labels": [
//             "label2",
//             "label3"
//         ],
//         "author": " ",
//         "author_email": "john@doe.com",
//         "author_degisnation": "Manager"
//     }
// ]

// let issues: Issue[] = [];

// const FetchIssue = async () => {
//     try {
//         const response = await axios.get("http://localhost:8000/api/issue/");
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch data", error);
//         return [];
//     }
// };

// const initializeIssues = async () => {
//     const fetchedIssues = await FetchIssue();
//     if (fetchedIssues) {
//         issues = fetchedIssues;
//     }
// };

// initializeIssues();

// export { issues };
export type Issue = {
    issue_id: number;
    issue_title: string;
    issue_content: string;
    issue_date: string; // or Date if you plan to parse it
    is_solved: boolean;
    labels: string[];
    author: string;
    author_email: string;
    author_degisnation: string;
};
// ! The following is for comments


export type Comment = {
    comment_id: number;
    issue_connected: number;
    comment_content: string;
    author: string;
    author_email: string;
    comment_date: string;
};

// export const comment: { [key: number]: Comment[] }[] = [
//     {
//         "1": [
//             {
//                 "comment_id": 1,
//                 "issue_connected": 1,
//                 "comment_content": "Comment 1",
//                 "comment_date": "2024-07-30T09:27:54.948716Z",
//                 "author": " ",
//                 "author_email": "jane@doe.com"
//             },
//             {
//                 "comment_id": 2,
//                 "issue_connected": 1,
//                 "comment_content": "Comment 2",
//                 "comment_date": "2024-07-30T09:27:54.951715Z",
//                 "author": " ",
//                 "author_email": "john@doe.com"
//             },
//             {
//                 "comment_id": 3,
//                 "issue_connected": 1,
//                 "comment_content": "Comment 3",
//                 "comment_date": "2024-07-30T09:27:54.953728Z",
//                 "author": " ",
//                 "author_email": "jane@doe.com"
//             }
//         ],
//         "2": [
//             {
//                 "comment_id": 4,
//                 "issue_connected": 2,
//                 "comment_content": "Comment 4",
//                 "comment_date": "2024-07-30T09:27:54.957051Z",
//                 "author": " ",
//                 "author_email": "jane@doe.com"
//             },
//             {
//                 "comment_id": 5,
//                 "issue_connected": 2,
//                 "comment_content": "Comment 5",
//                 "comment_date": "2024-07-30T09:27:54.959789Z",
//                 "author": " ",
//                 "author_email": "jhon@doe.com"
//             }
//         ],
//         "3": [
//             {
//                 "comment_id": 6,
//                 "issue_connected": 3,
//                 "comment_content": "Comment 6",
//                 "comment_date": "2024-07-30T09:27:54.963192Z",
//                 "author": " ",
//                 "author_email": "jhon@doe.com"
//             }
//         ]
//     }
// ]

// let comment: { [key: number]: Comment[] }[] = [];

// export const FetchComment = async (): Promise<{ [key: number]: Comment[] }[]> => {
//     const token = localStorage.getItem("token");
//     console.log(token)
//     try {
//         const response = await axios.get("http://localhost:8000/api/comments/1");
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch data", error);
//         return [];
//     }
// };

// const fetchedComments = await FetchComment();
// if (fetchedComments) {
//     comment = fetchedComments;
// }
// console.log(comment)
// export { comment };

