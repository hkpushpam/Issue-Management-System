"use client";
import React from "react";
import { date,issue_solved,issue_created } from "@/data/admin_data";


function convertToChartData(yValues: number[], dates: string[]) {
    let chartData = [];
    for (let i = 0; i < yValues.length; i++) {
        chartData.push({ x: dates[i], y: yValues[i] });
    }
    return chartData;
}

interface ChartState {
    series: Array<{
        name: string;
        data: Array<{ x: string; y: number }>;
    }>;
    options: any;
}

class SpilineChart extends React.Component<{}, ChartState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            series: [
                { name: 'Issue Created', data: convertToChartData(issue_created, date) },
                { name: 'Issue Closed', data: convertToChartData(issue_solved, date) },
            ],
            options: {
                chart: {
                    type: 'area',
                    height: 350,
                    curve: 'smooth',
                },
                colors: ['#008FFB', '#00E396'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    width: 3,
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.3,
                        opacityTo: 0.9,
                    },
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    labels: {
                        useSeriesColors: true,
                    }
                },
                xaxis: {
                    type: 'category',
                    labels: {
                        formatter: function (val: number) { return val; },
                        style: { colors: '#3b46dc', },
                    },
                },
                yaxis: {
                    forceNiceScale: false,
                    labels: {
                        formatter: function (val: number) { return val.toFixed(2); },
                        style: { colors: '#3b46dc', },
                    },
                    padding: {
                        top: 0,
                        bottom: 0,
                    },
                },
            },
        };
    }

    render() {
        const ReactApexChart = require('react-apexcharts').default;
        return (
            <div>
                <div id="chart">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                        height={350}
                        className=" dark:text-black"
                    />
                </div>
            </div>
        );
    }
}

export default SpilineChart