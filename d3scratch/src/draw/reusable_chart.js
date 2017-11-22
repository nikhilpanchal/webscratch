import * as d3 from 'd3';

function groupedBarChart() {
    let width = 400,
        height = 600,
        margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        showLegend,
        barColors;

    function generator(selection) {
        // generate chart here
        let g, scaleBarGroup, scaleBarColor, scaleY, scaleBar,
            chartHeight = height - margin.top - margin.bottom,
            chartWidth = width - margin.left - margin.right,
            xAxis,
            yAxis;

        g = selection.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'grouped_bar')
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.right})`);

        scaleBarGroup = d3.scaleBand().rangeRound([0, chartWidth]).paddingInner(0.1);
        scaleBarColor = d3.scaleOrdinal(barColors);
        scaleY = d3.scaleLinear().rangeRound([chartHeight, 0]);

        selection.each(function (data) {
            let columns = data.columns;

            data = data.map((row) => {
                // for each column except the first convert the string to a number
                for (let i = 1; i < columns.length; i++) {
                    row[columns[i]] = +row[columns[i]];
                }

                return row;
            });

            let nameColumn = columns[0];
            let barData = columns.slice(1);

            // Set the domain for the scales based on the data.
            scaleBarGroup = scaleBarGroup.domain(data.map((row) => row[nameColumn]));
            scaleBar = d3.scaleBand().range([0, scaleBarGroup.bandwidth()]).domain(barData).paddingInner(0.05);
            scaleBarColor = scaleBarColor.domain(barData);
            scaleY = scaleY.domain([0, d3.max(data, function (row) {
                return d3.max(barData, function (col) {
                    return row[col];
                });
            })]);

            xAxis = d3.axisBottom(scaleBarGroup);
            yAxis = d3.axisLeft(scaleY);

            // Run the selectAll magic.
            // Generate the bars
            g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => `translate(${scaleBarGroup(row[nameColumn])},0)`)
                .selectAll('rect')
                .data(function (row) {
                    return barData.map((ageGroup) => {
                        return {
                            'quantity': row[ageGroup],
                            ageGroup
                        };
                    });
                })
                .enter()
                .append('rect')
                .attr('x', (ageGroupInfo) => scaleBar(ageGroupInfo.ageGroup))
                .attr('y', (ageGroupInfo) => scaleY(ageGroupInfo.quantity))
                .attr('width', (ageGroupInfo) => scaleBar.bandwidth())
                .attr('height', (ageGroupInfo) => (chartHeight - scaleY(ageGroupInfo.quantity)))
                .attr('fill', (ageGroupInfo) => scaleBarColor(ageGroupInfo.ageGroup));

            // Generate the axes
            g.append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            g.append('g')
                .call(yAxis.ticks(null, 's'));

            // Generate the legend
            if (showLegend) {
                let legend = g.append('g')
                    .attr('transform', `translate(${chartWidth - margin.right}, 0)`)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .selectAll('g')
                    .data(barData)
                    .enter()
                    .append('g')
                    .attr('transform', (ageGroup, index) => {
                        return `translate(0, ${20 * index})`;
                    });

                legend.append('rect')
                    .attr('width', 20)
                    .attr('height', 19)
                    .attr('fill', scaleBarColor);

                legend.append('text')
                    .attr('text-anchor', 'end')
                    .text((d) => d)
                    .attr('x', -5)
                    .attr('y', 12.5);
            }

            // Have the graph appear. Slowly...
            d3.select('svg')
                .transition()
                .duration(1000)
                .style('opacity', 1);
        });
    }

    generator.width = function (w) {
        if (!arguments.length) {
            return width;
        }

        width = w;
        return generator;
    };

    generator.height = function (h) {
        "use strict";
        if (!arguments.length) {
            return height;
        }

        height = h;
        return generator;
    };

    generator.margin = function (m) {
        "use strict";
        if (!arguments.length) {
            return margin;
        }

        margin = m;
        return generator;
    };

    generator.legend = function (_) {
        if (!arguments.length) {
            return _;
        }

        showLegend = _;
        return generator;
    };

    generator.barColors = function (_) {
        if (!arguments.length) {
            return barColors;
        }

        barColors = _;
        return generator;
    };


    return generator;
}

export {groupedBarChart as chartFactory};