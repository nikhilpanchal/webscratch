import * as d3 from 'd3';

function TreeGenerator() {
    let height,
        width,
        margin,
        dataMapper;

    function generator(selection) {
        let scaleX,
            scaleY,
            scaleColor,
            g,
            svg,
            chartWidth,
            chartHeight;

        chartWidth = width - (margin.left + margin.right)*2;
        chartHeight = height - margin.top - margin.bottom;

        svg = selection.append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'tree');

        g = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.right})`);

        let tree = d3.tree()
            .size([height, chartWidth]);

        selection.each(function (data) {
            let root = d3.hierarchy(data);

            let link = g.selectAll(".link")
                .data(tree(root).links())
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("d", d3.linkHorizontal()
                    .x(d => d.y)
                    .y(function(d) {
                        return d.x;
                    })
                );

            let node = g.selectAll(".node")
                .data(root.descendants())
                .enter()
                .append('g')
                .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            node.append('circle')
                .attr("r", 2.5);

            node.append('text')
                .attr("dy", 3)
                .attr("x", function (d) {
                    return d.children ? -8 : 8;
                })
                .style("text-anchor", function (d) {
                    return d.children ? "end" : "start";
                })
                .text(function (d) {
                    return d.data.name;
                })

        })
    }

    generator.width = function (w) {
        if (!arguments.length) {
            return width;
        }

        width = w;
        return generator;
    };

    generator.height = function (h) {
        if (!arguments.length) {
            return height;
        }

        height = h;
        return generator;
    };

    generator.margin = function (m) {
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

export {TreeGenerator};