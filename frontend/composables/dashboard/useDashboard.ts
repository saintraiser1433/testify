
export const useDashboard = () => {
    const { $echarts } = useNuxtApp();


    //for summary
    const generateOption = (baseColor: string) => {
        const primaryColor = baseColor;
        const primaryLight = generateLighterColor(primaryColor, 0.5);
        const primaryLighter = generateLighterColor(primaryColor, 0.2);

        const option: ECOption = {
            animation: true,
            animationEasing: 'elasticIn',
            grid: {
                left: 'auto',
                top: 'auto',
                right: 'auto',
                bottom: 'auto',
                width: 'auto',
                height: 'auto',
                // containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    show: false // Hide x-axis labels
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false // Hide y-axis labels
                }
            ],
            series: [
                {
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 2,
                        cap: 'round'
                    },
                    itemStyle: {
                        color: primaryColor // Custom color for the series
                    },
                    label: {
                        show: false,
                        position: 'top'
                    },
                    areaStyle: {
                        color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: primaryLight },
                            { offset: 1, color: primaryLighter }
                        ]),
                        shadowBlur: 10,
                        shadowColor: primaryColor,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [240, 160, 671, 414, 555, 257, 901, 613, 727, 414, 555, 257]
                }
            ],
            media: [
                {

                    option: {
                        grid: {
                            left: 'auto',
                            top: 'auto',
                            right: 'auto',
                            bottom: 'auto',
                            width: 'auto',
                            height: 'auto',
                            // containLabel: true
                        }
                    }
                }
            ]
        }
        return {
            option
        };
    };

    //end

    const optionForBarChart = (data: ChartModel[]) => {
        const options: ECOption = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            xAxis: {
                type: 'category',
                data: data.map((item) => item.name), // X-axis labels based on `data.name`
                axisLabel: {
                    color: '#666',
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#666',
                },
            },
            series: [
                {
                    name: 'Passed',
                    type: 'bar',
                    data: data.map((item, index) => ({
                        name: item.name, // Use `data.name` for each data point
                        value: item.value, // Use `data.value` for each data point
                        itemStyle: {
                            color: getColorFromPalette(index), // Assign a color
                            shadowColor: getColorFromPalette(index),
                            borderRadius: [20, 20, 0, 0],
                            borderType: 'dashed',
                        },
                    })),
                    barWidth: '60%',
                },
            ],
            grid: {
                containLabel: true,
                left: '2%',
                right: '2%',
                bottom: '10%',
            },
        };
        return { options };
    };




    const optionForNightingale = (data: any[]) => {
        return ref<ECOption>({
            legend: {
                left: 'center',
                bottom: 'bottom',

            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: {
                        show: true,
                        readOnly: false,
                        optionToContent: (opt: { series: { data: { name: string; value: number; }[]; }[]; }) => {
                            const table = `<table style="width:100%; text-align:center; border-collapse:collapse;">
                      <thead>
                        <tr>
                          <th style="border:1px solid #ddd; padding:8px;">Name</th>
                          <th style="border:1px solid #ddd; padding:8px;">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${opt.series[0].data
                                    .map(
                                        (item: { name: string; value: number }) =>
                                            `<tr>
                                <td style="border:1px solid #ddd; padding:8px;">${item.name}</td>
                                <td style="border:1px solid #ddd; padding:8px;">${item.value}</td>
                              </tr>`
                                    )
                                    .join('')}
                      </tbody>
                    </table>`;
                            return table;
                        },
                        contentToOption: (currentOpt: any, { series }: any) => {
                            return {
                                ...currentOpt,
                                series,
                            };
                        },
                    },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },
            series: [
                {
                    name: 'Area Mode',
                    type: 'pie',
                    radius: [20, 140],
                    center: ['50%', '45%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5,
                    },
                    data: data,
                },

            ],
        });


    }


    const optionForPieChart = (data: any[]) => {
        return ref<ECOption>({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'horizontal',
                left: 'center',
                bottom: 'bottom',
                data: data.map(item => item.name) // Use the `name` property for the legend
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: {
                        show: true,
                        readOnly: false,
                        optionToContent: (opt: { series: { data: { name: string; value: number; }[]; }[]; }) => {
                            const table = `<table style="width:100%; text-align:center; border-collapse:collapse;">
                      <thead>
                        <tr>
                          <th style="border:1px solid #ddd; padding:8px;">Name</th>
                          <th style="border:1px solid #ddd; padding:8px;">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${opt.series[0].data
                                    .map(
                                        (item: { name: string; value: number }) =>
                                            `<tr>
                                <td style="border:1px solid #ddd; padding:8px;">${item.name}</td>
                                <td style="border:1px solid #ddd; padding:8px;">${item.value}</td>
                              </tr>`
                                    )
                                    .join('')}
                      </tbody>
                    </table>`;
                            return table;
                        },
                        contentToOption: (currentOpt: any, { series }: any) => {
                            return {
                                ...currentOpt,
                                series,
                            };
                        },
                    },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },
            series: [
                {
                    name: 'Percentage',
                    type: 'pie',
                    radius: '50%',

                    center: ['50%', '40%'],
                    data: data, // Pass the entire data array here
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
    };


    const optionForDataSet = (data: any[]) => {
        return ref<ECOption>({
            legend: {
                left: 'center',
                bottom: 'bottom',

            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: {
                        show: true,
                        readOnly: false,
                        optionToContent: (opt: any) => {
                            const table = `<table style="width:100%; text-align:center; border-collapse:collapse;">
                      <thead>
                        <tr>
                          <th style="border:1px solid #ddd; padding:8px;">Date</th>
                          <th style="border:1px solid #ddd; padding:8px;">Registered</th>
                          <th style="border:1px solid #ddd; padding:8px;">Completed</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${opt.dataset[0].source
                                    .map(
                                        (item: { formatted_date: string; Registered: string; Completed: number }) =>
                                            `<tr>
                                <td style="border:1px solid #ddd; padding:8px;">${item.formatted_date}</td>
                                <td style="border:1px solid #ddd; padding:8px;">${item.Registered}</td>
                                <td style="border:1px solid #ddd; padding:8px;">${item.Completed}</td>
                              </tr>`
                                    )
                                    .join('')}
                      </tbody>
                    </table>`;
                            return table;
                        },
                        contentToOption: (currentOpt: any, { series }: any) => {
                            return {
                                ...currentOpt,
                                series,
                            };
                        },
                    },
                    restore: { show: true },
                    saveAsImage: { show: true },
                },
            },
            dataset: {
                dimensions: ['formatted_date', 'Registered', 'Completed'],
                source: data
            },
            legends: {},
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{
                type: 'bar',
                itemStyle: {
                    color: getColorFromPalette(0), // Assign a random color to each bar
                    shadowColor: getColorFromPalette(4),
                    borderRadius: [10, 10, 0, 0],
                    borderType: 'dashed',
                },
            }, {
                type: 'bar',
                itemStyle: {
                    color: getColorFromPalette(2), // Assign a random color to each bar
                    shadowColor: getColorFromPalette(2),
                    borderRadius: [20, 20, 0, 0],
                    borderType: 'dashed',
                },
            }],
            grid: {
                containLabel: true,
                left: '2%',
                right: '2%',
                bottom: '10%',
            },
            

        });
    };







    return {
        generateOption,
        optionForNightingale,
        optionForPieChart,
        optionForBarChart,
        optionForDataSet
    };
};