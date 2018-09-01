import * as d3 from 'd3';

function lineChartGenerator() {
    let height,
        width,
        margin,
        xValue,
        yValue,
        dataMapper;

    function chart(selection) {
        // Initialize chart here.
        let scaleX,
            scaleY,
            svg,
            g,
            chartHeight,
            chartWidth;

        chartHeight = height - margin.top - margin.bottom;
        chartWidth = width - margin.left - margin.right;

        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'line_chart');

        g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        scaleX = d3.scaleTime().range([0, chartWidth]);
        scaleY = d3.scaleLinear().rangeRound([chartHeight, 0]);

        selection.each(function (data) {
            // Generate Chart here.

            // Convert the incoming data to the types we want.
            data = data.map(dataMapper);

            // Set the domain for the scales.
            // Try using extent instead of max here.
            scaleX.domain(d3.extent(data, (d) => d.x));
            scaleY.domain(d3.extent(data, (d) => d.y));

            let line = d3.line()
                .x((d) => scaleX(d.x))
                .y((d) => scaleY(d.y));

            // Draw the line.
            g.append('path')
                .attr('stroke', 'black')
                .attr('stroke-width', '1.5')
                .attr('fill', 'none')
                .attr('d', line);

            // Draw the axes
            g.append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(d3.axisBottom(scaleX));

            g.append("g")
                .call(d3.axisLeft(scaleY).ticks(null, 's'));

            // Have the chart appear... slowly.
            svg.transition()
                .duration(1000)
                .style('opacity', 1);
        });
    }

    chart.height = function (_) {
        if (!arguments.length) {
            return height;
        }

        height = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) {
            return width;
        }

        width = _;
        return chart;
    };

    chart.margin = function (_) {
        if (!arguments.length) {
            return margin;
        }

        margin = _;
        return chart;
    };

    chart.xValue = function (_) {
        if (!arguments.length) {
            return xValue;
        }

        xValue = _;
        return chart;
    };

    chart.yValue = function (_) {
        if (!arguments.length) {
            return yValue;
        }

        yValue = _;
        return chart;
    };

    chart.dataMapper = function (_) {
        if (!arguments.length) {
            return dataMapper;
        }

        dataMapper = _;
        return chart;
    };

    return chart;
}

export {lineChartGenerator};