import * as d3  from 'd3';


function stackedBarChart() {
    let params = {
        height: 0,
        width: 0,
        animationDuration: 0,
        margin: {top: 0, bottom: 0, left: 0, right: 0},
        legend: true
    };


    function generator(selection) {
        let scaleY,
            scaleX,
            scaleColor,
            g,
            chartWidth = params.width - params.margin.left - params.margin.right,
            chartHeight = params.height - params.margin.top - params.margin.bottom,
            legend = params.legend;

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
        scaleColor = d3.scaleOrdinal().range(["firebrick","tan","bisque"]);

        // draw the chart
        selection.each(function (data) {
            let numericColumns = data.columns.slice(1);

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
                        }
                    })
                })
                .enter()
                .append('rect')
                .attr('x', function (point) {
                    return scaleX(point.name);
                })
                .attr('y', function (point) {
                    return scaleY(0);
                })
                .attr('width', function (point) {
                    return scaleX.bandwidth();
                })
                .attr('height', function (point) {
                    return 0;
                })
                .attr('fill', function (point) {
                    return scaleColor(point.key);
                });

            // Animate the bars to appear by gradually expanding to their height
            // by setting their y and height values
            stackedBar
                .transition()
                .attr('y', function (point) {
                    return scaleY(point.y)
                })
                .attr('height', function (point) {
                    return chartHeight - scaleY(point.height)
                })
                .duration(params.animationDuration);


            // Draw the axes
            g.append('g')
                .call(d3.axisLeft(scaleY));

            g.append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(d3.axisBottom(scaleX));

            // Generate the legend
            if (legend) {
                let legend = g.append('g')
                    .attr('transform', `translate(${chartWidth - params.margin.right}, 0)`)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .selectAll('g')
                    .data(numericColumns)
                    .enter()
                    .append('g')
                    .attr('transform', (ageGroup, index) => {
                        return `translate(0, ${20 * index})`;
                    });

                legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 19)
                    .attr('fill', scaleColor);

                legend.append('text')
                    .attr('text-anchor', 'end')
                    .text((d) => d)
                    .attr('x', -5)
                    .attr('y', 12.5);
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