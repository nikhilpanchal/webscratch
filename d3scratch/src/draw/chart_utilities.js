import * as d3 from "d3";

// The main function to be exported
function axes() {

    let scaleX, scaleY, xAxisLabel, yAxisLabel, chartHeight, chartWidth;

    // The closure that will generate the axes
    function generator(chart_container_group) {
        let g = chart_container_group;

        // Draw the axes
        g.append('g')
            .call(d3.axisLeft(scaleY))
            .append('text')
            .attr('transform', 'rotate(90)')
            .attr("fill", "#000")
            .attr("text-anchor", "start")
            .attr('dy', '3.75em')
            .text(yAxisLabel);

        g.append('g')
        // By default the x axis will get drawn at the top of the chart. You need to transform its y position by
        // the chart height amount to "push it down" and render at the bottom.
            .attr('transform', `translate(0, ${chartHeight})`)
            // Axis bottom refers to the positioning of the labels. Axisbottom positions the labels of the Y axis below
            // the axis line.
            .call(d3.axisBottom(scaleX))
            .append('text')
            .attr('x', chartWidth)
            .attr("fill", "#000")
            .attr("text-anchor", "end")
            .attr('dy', '2.75em')
            .text(xAxisLabel);
    }

    // Set the config options here
    generator.scaleX = function(_) {
        if (!arguments.length) {
            return scaleX;
        }

        scaleX = _;
        return generator;
    };

    generator.scaleY = function(_) {
        if (!arguments.length) {
            return scaleY;
        }

        scaleY = _;
        return generator;
    };

    generator.xAxisLabel = function (_) {
        if (!arguments.length) {
            return xAxisLabel;
        }

        xAxisLabel = _;
        return generator;
    };

    generator.yAxisLabel = function (_) {
        if (!arguments.length) {
            return yAxisLabel;
        }

        yAxisLabel = _;
        return generator;
    };

    generator.chartHeight = function (_) {
        if (!arguments.length) {
            chartHeight = _;
        }

        chartHeight = _;
        return generator;
    };


    generator.chartWidth = function (_) {
        if (!arguments.length) {
            chartWidth = _;
        }

        chartWidth = _;
        return generator;
    };

    return generator;
}

function legend() {
    let chartWidth, marginRight, scaleColor, labels;

    // The main generator function
    function generator(chart_container_group) {
        let g = chart_container_group;

        let legend = g.append('g')
            .attr('transform', `translate(${chartWidth - marginRight}, 0)`)
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll('g')
            .data(labels)
            .enter()
            .append('g')
            .attr('transform', (label, index) => {
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

    // Set the configs here
    generator.chartWidth = function (_) {
        if (!arguments.length) {
            return chartWidth;
        }

        chartWidth = _;
        return generator;
    };

    generator.marginRight = function (_) {
        if (!arguments.length) {
            return marginRight;
        }

        marginRight = _;
        return generator;
    };

    generator.scaleColor = function (_) {
        if (!arguments.length) {
            return scaleColor;
        }

        scaleColor = _;
        return generator;
    };

    generator.labels = function (_) {
        if (!arguments.length) {
            return labels;
        }

        labels = _;
        return generator;
    };

    return generator;
}


export {
    axes as Axes,
    legend as legend
}

