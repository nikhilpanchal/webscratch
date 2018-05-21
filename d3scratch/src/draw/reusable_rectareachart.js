import * as d3 from 'd3';


function rectAreaChart() {
    let height = 10,
        width = 10,
        margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        showLegend = false;

    function generator(selection) {
        let g, scaleY, scaleX, scaleColor,
            chartWidth = width - margin.left - margin.right,
            chartHeight = height - margin.top - margin.bottom,
            xAxis, yAxis;

        // Create the container svg and a group element inside it
        g = selection.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'rectangle_area')
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Set the scale ranges
        scaleY = d3.scaleLinear().rangeRound([chartHeight, 0]);
        scaleX = d3.scaleLinear().rangeRound([0, chartWidth]);
        scaleColor = d3.scaleOrdinal()
            .range(['firebrick', 'bisque', 'sandybrown', 'tan'])
            .domain([0, 1]);

        // run through the selection
        selection.each(function (data) {
            console.log("The data passed in ", data);

            // Convert the data strings to integers
            data = data.map(function (row) {
                return data.columns.map(function (col) {
                    return +row[col];
                })
            });

            // Set the domain for the scales based on the data
            scaleX = scaleX.domain([0, d3.max(data, function(row) {
                return row[0]*3;
            })]);  // return
            scaleY = scaleY.domain([0, 100]); // weight

            xAxis = d3.axisBottom(scaleX);
            yAxis = d3.axisLeft(scaleY);

            // Run the selectall magic to draw the rectangle areas.
            g.selectAll('g')        // TODO: I think this should be selectAll(rect)
                .data(data)
                .enter()
                .append('rect')
                .attr('x', (d) => scaleX(d[1]))
                .attr('y', function(d) {
                    return scaleY(d[2]);
                })
                .attr('width', (d) => scaleX(d[0] - d[1]))
                .attr('height', (d) => chartHeight - scaleY(d[2] - d[3]))
                .attr('fill', function(d, i) {
                    return scaleColor(i);
                })
                .style('opacity', 1);

            // Draw the axes
            g.append('g')
                .attr('transform', `translate(0, ${chartHeight})`)
                .call(xAxis);

            g.append('g')
                .call(yAxis);
        });
    }

    generator.height = function (_) {
        if (!arguments.length) {
            return height;
        }

        height = _;

        // Confirm whether return "this" would be equivalent. I reckon it would.
        return generator;
    };

    generator.width = function (_) {
        if (!arguments.length) {
            return width;
        }

        width = _;
        return generator;
    };

    generator.margin = function (_) {
        if (!arguments.length) {
            return margin;
        }

        margin = _;
        return generator;
    };

    generator.showLegend = function (_) {
        if (!arguments.length) {
            return showLegend;
        }

        showLegend = _;
        return generator;
    };


    return generator;
}

export {rectAreaChart as RectangleAreaChartGenerator};