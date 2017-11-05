import * as d3 from 'd3';

/**
 * The general way in which you can create a grouped bar chart is as follows:
 * 1. You have a scaleBand scale to calculate the bar width for each group
 * 2. You have another scaledBand scale that has the range of one bandwidth of the scaleband in point 1. This is for the
 * bars within a group.
 * 3. Another scaleOrdinal that maps the fill of each bar in a group to a different color
 *      3.1 The scaleOrdinal is used to map discrete values to range, as opposed to scaleBand which maps continuous and
 *      numeric values to a range.
 * 4. Finally, you'll have a linear scale to map values to the Y axis.
 */

export default class GroupedBar {
    constructor() {
        this.svg_height = 500;
        this.svg_width = 1200;
        this.margin = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        };
        this.height = this.svg_height - this.margin.top - this.margin.bottom;
        this.width = this.svg_width - this.margin.left - this.margin.right;

        // Append an SVG element to the page and a g to it.
        this.g = d3.select('body')
            .append('svg')
            .attr('width', this.svg_width)
            .attr('height', this.svg_height)
            .attr('class', 'grouped_bar')
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        this.scaleBarGroup = d3.scaleBand().rangeRound([0, this.width]).paddingInner(0.1);
        this.scaleBarColor = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        this.scaleY = d3.scaleLinear().rangeRound([this.height, 0]);
    }

    render() {
        // Request for the data
        d3.csv("/resources/grouped_bar_data.csv", (row, index, columns) => {
            // Convert the numeric values from strings to numbers
            for (let i = 1; i < columns.length; i++) {
                // for each column except the first, convert the string to a number in each row.
                row[columns[i]] = +row[columns[i]];
            }

            return row;
        }, (error, data) => {
            if (error) {
                throw error;
            }

            let ageGroups = data.columns.slice(1);

            // Set the domain for the scales based on the data.
            this.scaleBarGroup = this.scaleBarGroup.domain(data.map((row) => row['State']));
            this.scaleBar = d3.scaleBand().range([0, this.scaleBarGroup.bandwidth()]).domain(ageGroups).padding(0.05);
            this.scaleBarColor = this.scaleBarColor.domain(ageGroups);
            this.scaleY = this.scaleY.domain([0, d3.max(data, function (row) {
                return d3.max(ageGroups, function (col) {
                    return row[col];
                });
            })]);

            // Run the selectAll magic.
            // Generate the bars
            this.g.selectAll('g')
                .data(data)
                .enter()
                .append('g')
                .attr('transform', (row) => `translate(${this.scaleBarGroup(row['State'])},0)`)
                .selectAll('rect')
                .data(function (row) {
                    return ageGroups.map((ageGroup) => {
                        return {
                            'quantity': row[ageGroup],
                            ageGroup
                        };
                    });
                })
                .enter()
                .append('rect')
                .attr('x', (ageGroupInfo) => this.scaleBar(ageGroupInfo.ageGroup))
                .attr('y', (ageGroupInfo) => this.scaleY(ageGroupInfo.quantity))
                .attr('width', (ageGroupInfo) => this.scaleBar.bandwidth())
                .attr('height', (ageGroupInfo) => (this.height - this.scaleY(ageGroupInfo.quantity)))
                .attr('fill', (ageGroupInfo) => this.scaleBarColor(ageGroupInfo.ageGroup));

            // Generate the axes

            // Generate the legend
        });

        console.log("Rendering a grouped D3 Bar Graph");
    }
}