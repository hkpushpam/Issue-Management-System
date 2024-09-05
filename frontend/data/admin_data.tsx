import axios from 'axios';

// ! This is for Card Data

type data = [number, number, number, number, number, number, number];

interface apiCardData {
    issue_createdlast7days: [number, number, number, number, number, number, number];
    issue_solvedlast7days: [number, number, number, number, number, number, number];
    newcommentlast7days: [number, number, number, number, number, number, number];
}
let issue_createdlast7days: data = [0, 0, 0, 0, 0, 0, 0];
let issue_solvedlast7days: data = [0, 0, 0, 0, 0, 0, 0];
let newcommentlast7days: data = [0, 0, 0, 0, 0, 0, 0];


const FetchCardData = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    try {
        const response = await axios.get("http://localhost:8000/api/card/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch data", error);
        return null;
    }
};

const apicarddata = await FetchCardData();
if (apicarddata) {
    issue_createdlast7days = apicarddata.issue_createdlast7days;
    issue_solvedlast7days = apicarddata.issue_solvedlast7days;
    newcommentlast7days = apicarddata.newcommentlast7days;
}

export { issue_createdlast7days, issue_solvedlast7days, newcommentlast7days }


// ! Below is for Chart Data


type DateString = `${number}-${number}-${number}`;
type alldata = Array<number>
type ApiChartData = Array<{
    date: DateString,
    issues_solved: number,
    issues_created: number
}>

const date: Array<DateString> = []
const issue_created: alldata = []
const issue_solved: alldata = []

const FetchChartData = async () => {
    const token = localStorage.getItem("token");
    console.log(token)
    try {
        const response = await axios.get("http://localhost:8000/api/chart/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch data", error);
        return null;
    }
};

const apichartdata = await FetchChartData();
if (apichartdata) {
    for (const entry of apichartdata) {
        date.push(entry.date as DateString);
        issue_created.push(entry.issues_created);
        issue_solved.push(entry.issues_solved);
    }
}

export { date, issue_created, issue_solved };