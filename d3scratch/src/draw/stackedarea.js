import * as d3 from 'd3';

function StackedAreaChartFactory() {
    let height,
        width,
        margin,
        dataMapper;

    function generator(selection) {
        let scaleX,
            scaleY,
            g,
            svg,
            chartWidth,
            chartHeight;

        chartWidth = width - margin.left - margin.right;
        chartHeight = height - margin.top - margin.bottom;

        scaleX = d3.scaleTime().range([0, chartWidth]);
        scaleY = d3.scaleLinear().rangeRound([chartHeight, 0]);


        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'area_chart');

        g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        selection.each(function (data) {
            // Generate Chart here.
            data = data.map(dataMapper);

            let seriesData = d3.stack()
                .keys(["equities", "bonds"])
                .order(d3.stackOrderNone)
                .offset(d3.stackOffsetNone)(data);


            scaleX.domain(d3.extent(data, (row) => row.date));
            scaleY.domain([0, d3.max(data, (d) => d.bonds)]);

            let area = d3.area()
                .x((point) => scaleX(point.data.date))
                .y0((point) => scaleY(point[0]))
                .y1((point) => scaleY(point[1]));

            // Draw the area chart
            g.selectAll('path')
                .data(seriesData)
                .enter()
                .append('path')
                .attr('stroke', 'black')
                .attr('stroke-width', '1.5')
                .attr('fill', (d) => {
                    return d.key === 'equities' ? 'seashell' : 'peachpuff';
                })
                .attr('d', area);


            // Draw the axes
            g.append('g')
                .call(d3.axisBottom(scaleX))
                .attr('transform', `translate(0, ${chartHeight})`);

            g.append('g')
                .call(d3.axisLeft(scaleY));
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

    generator.dataMapper = function (_) {
        if (!arguments.length) {
            return _;
        }

        dataMapper = _;
        return generator;
    };

    return generator;
}

export { StackedAreaChartFactory };