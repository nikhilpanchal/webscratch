import * as d3 from 'd3'

export default class Histogram {
    constructor() {
        this.margin = {top: 20, right: 30, bottom: 30, left: 40};
        this.width = 960 - this.margin.right - this.margin.left;
        this.height = 500 - this.margin.top - this.margin.bottom;

        this.x = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
        // this.x = d3.scaleOrdinal([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.xAxis = d3.axisBottom(this.x);
        this.yAxis = d3.axisLeft(this.y);


        this.chart = d3.select(".hist_svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")");
    }

    type(d) {
        d.value = +d.value;
        return d;
    }

    render() {


        d3.tsv("/resources/letter_frequency.txt", this.type, (error, data) => {
            this.x.domain(data.map((d) => d.name));
            this.y.domain([0, d3.max(data, (d) => d.value)]);

            this.chart.append('g')
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(this.xAxis);

            this.chart.append("g")
                .attr("class", "y axis")
                .call(this.yAxis);

            this.chart.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d) => this.x(d.name))
                .attr("y", (d) => this.y(d.value))
                .attr("width", this.x.bandwidth())
                .attr("height", (d) => (this.height - this.y(d.value)));
        })
    }
}