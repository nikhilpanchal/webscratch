import * as d3 from 'd3';
import {Axes as axes} from "./chart_utilities";
import {legend as legendFactory} from "./chart_utilities";


function stackedBarChart() {
    let params = {
        height: 0,
        width: 0,
        animationDuration: 0,
        margin: {top: 0, bottom: 0, left: 0, right: 0},
        legend: true,
        xAxisLabel: '',
        yAxisLabel: ''
    };


    function generator(selection) {
        let scaleY,
            scaleX,
            scaleColor,
            g,
            axes_generator,
            chartWidth = params.width - params.margin.left - params.margin.right,
            chartHeight = params.height - params.margin.top - params.margin.bottom,
            legend = params.legend,
            legend_generator;

        // Create the chart container
        g = selection.append('svg')
            .attr('height', params.height)
            .attr('width', params.width)
            .attr('class', 'stacked_bar')
            .append('g')
            .attr('transform', `translate(${params.margin.left}, ${params.margin.top})`);

        // Create the scales
        scaleX = d3.scaleBand().rangeRound([0, chartWidth]).paddingOuter(0.2).paddingInner(0.05);
        scaleY = d3.scaleLinear().range([chartHeight, 0]);
        scaleColor = d3.scaleOrdinal().range(["firebrick", "tan", "bisque"]);

        axes_generator = axes()
            .chartHeight(chartHeight)
            .chartWidth(chartWidth)
            .scaleX(scaleX)
            .scaleY(scaleY)
            .xAxisLabel(params.xAxisLabel)
            .yAxisLabel(params.yAxisLabel);

        legend_generator = legendFactory()
            .chartWidth(chartWidth)
            .marginRight(params.margin.right)
            .scaleColor(scaleColor);

        // draw the chart
        selection.each(function (data) {
            let numericColumns = data.columns.slice(1);

            legend_generator = legend_generator.labels(numericColumns);

            // Convert the data to numeric values
            data.map(function (row) {
                let total = 0;
                numericColumns.map(function (col) {
                    row[col] = +row[col];
                    total += row[col];
                });
                row.total = total;

                return row;
            });

            // set the scale domains.
            // The x domain is the values from column 0
            let nameColumn = data.columns[0];
            scaleX = scaleX.domain(data.map((row) => row[nameColumn]));
            scaleColor = scaleColor.domain(numericColumns);
            // The y domain is the max value from the other columns
            scaleY = scaleY.domain([0, d3.max(data, function (row) {
                return row.total;
            })]);

            // run the selectall magic and set the horizontal attributes of the bars
            // the vertical attributes like height and y values are set to 0.
            let stackedBar = g.selectAll('g')
                .data(d3.stack().keys(numericColumns)(data))
                .enter()
                .append('g')       // A group representing each stacked bar
                .selectAll('rect')
                .data(function (row) {
                    return row.map(function (colData) {
                        return {
                            name: colData.data[nameColumn],
                            y: colData[1],
                            height: (colData[1] - colData[0]),
                            key: row.key
                        };
                    });
                })
                .enter()
                .append('rect')
                .attr('x', function (point) {
                    return scaleX(point.name);
                })
                .attr('y', function (point) {
                    return scaleY(0);
                    // return scaleY(point.y);
                })
                .attr('width', function (point) {
                    return scaleX.bandwidth();
                })
                .attr('height', function (point) {
                    return 0;
                    // return chartHeight - scaleY(point.height);
                })
                .attr('fill', function (point) {
                    return scaleColor(point.key);
                })
            ;

            // Animate the bars to appear by gradually expanding to their height
            // by setting their y and height values
            stackedBar
                .transition()
                .attr('y', function (point) {
                    return scaleY(point.y);
                })
                .attr('height', function (point) {
                    return chartHeight - scaleY(point.height);
                })
                .duration(params.animationDuration);


            // Draw the axes
            axes_generator(g);

            // Generate the legend
            if (legend) {
                legend_generator(g);
            }
        });

    }

    generator.param = function (param, value) {
        if (arguments.length == 1) {
            return params[param];
        }

        if (params[param] !== undefined) {
            params[param] = value;
        }

        return generator;
    };

    return generator;
}

export {stackedBarChart as StackedBarChartGenerator};