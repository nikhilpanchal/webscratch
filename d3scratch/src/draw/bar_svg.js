import * as d3 from 'd3'

export default class BarSvg {
    constructor() {
        this.width = 420;
        this.barHeight = 20;
    }

    render(data) {
        var x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, this.width]);

        let chart = d3.select(".chart_svg")
            .attr("width", this.width)
            .attr("height", this.barHeight * data.length);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append('g')
            .attr("transform", (d,i) => {
                return "translate(0," + i*this.barHeight + ")";
            });

        bar.append("rect")
            .attr("width", x)
            .attr("height", this.barHeight - 1);

        bar.append("text")
            .attr("x", function(d) { return x(d) - 3; })
            .attr("y", this.barHeight / 2)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
    }
}