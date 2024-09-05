"use client";
import React from "react";
import { newcommentlast7days } from "@/data/admin_data";


interface ChartState {
    series: Array<{
        data: Array<number>;
    }>;
    options: any;
}

class newCommentChart extends React.Component<{}, ChartState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            series: [{ data: newcommentlast7days }],
            options: {
                chart: {
                    type: 'area',
                    sparkline: { enabled: true },
                },
                stroke: { curve: 'straight' },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.3,
                        opacityTo: 0.9,
                    },
                },
                yaxis: { min: 0 },
                colors: ['#008FFB'],
                title: {
                    text: 'No. of New Comments',
                    offsetX: 4,
                    style: {
                        fontSize: '24px',
                        fontWeight: '600',
                        color: '#008FFB',
                    },
                },
                subtitle: {
                    text: 'in last 7 days',
                    offsetX: 4,
                    style: {
                        fontSize: '20px',
                        fontweight: '600',
                        color: '#008FFB',
                    }
                },
                tooltip: {
                    x: {
                        formatter: function (value: number) {
                            return "Day:" + (8 - value);
                        }
                    },
                    y: {
                        title: {
                            formatter: () => ''
                        }
                    },
                }
            }
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
                        height="160"
                        className=" dark:text-black dark:bg-gray-800 bg-gray-100 p-4"
                    />
                </div>
            </div>
        );
    }
}
export default newCommentChart;
