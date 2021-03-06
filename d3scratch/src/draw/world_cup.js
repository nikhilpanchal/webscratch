import * as d3 from 'd3'

export default class WorldCupGraph {
    constructor() {
        this.dataFileLocation = "/udacity/lesson3/world_cup_geo.tsv";
        this.margin = 75,
            this.width = 1400 - this.margin,
            this.height = 600 - this.margin,
            this.radius = 3,
            this.color = "blue";
    }

    render() {
        console.log("Rendering the World Cup Graph in D3");

        let dateParser = d3.timeParse("%d-%m-%Y (%H:%M h)");

        d3.tsv(this.dataFileLocation,
            (d) => {
                // Transformation function for data-points in a data row.
                d['date'] = dateParser(d['date']);
                d['attendance'] = +d['attendance'];

                // Important to return the transformed row.
                return d;
            },
            (data) => {
                d3.select(".world_cup_svg")
                    .attr('width', this.width + this.margin)
                    .attr("height", this.height + this.margin)
                    .append('g')
                    .attr('class', 'chart');

                // Core D3 Join
                d3.select('.world_cup_svg')
                    .selectAll()
                    .data(data)
                    .enter()
                    .append("circle");


                var getDataPointField = function (field) {
                    return function (dataRow) {
                        return dataRow[field];
                    }
                };

                // Try this with dataPoint.date
                // Also try this using d3.extent(data, getDataPointField('date'));
                // Mapping dates to pixels.

                // Determine the minimum and maximum values of the X and Y axis values.
                // This is done using the d3 extent call.
                let timeExtent = d3.extent(data, (dataRow) => dataRow['date']);

                // Mapping attendance to pixels.
                let countExtent = d3.extent(data, (dataRow) => dataRow['attendance']);

                let timeScale = d3.scaleTime()
                    .range([this.margin, this.width])
                    .domain(timeExtent);

                let countScale = d3.scaleLinear()
                    .range([this.height, this.margin])
                    .domain(countExtent);

                // Creating the axes objects
                let timeAxis = d3.axisBottom(timeScale)
                    .ticks(d3.timeYear.every(2));

                let countAxis = d3.axisLeft(countScale);

                // Map the axes to DOM elements under the parent SVG
                d3.select('.world_cup_svg')
                    .append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + this.height + ")")
                    .call(timeAxis);

                d3.select('.world_cup_svg')
                    .append('g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + this.margin + ", 0)")
                    .call(countAxis);

                /*
                For each circle, set its x position according to its date
                and its y position according to its attendance
                add an attribute of radius which is of a fixed value
                and voila !!
                 */
                d3.selectAll('circle')
                    .attr('cx', (d) => timeScale(d["date"]))
                    .attr('cy', (d) => countScale(d["attendance"]))
                    .attr("r", (d) => {
                        if (d['home'] === d['team1'] || d['home'] === d['team2']) {
                            return this.radius * 1.5;
                        }

                        return this.radius
                    })
                    .attr('fill', (d) => {
                        if (d['home'] === d['team1'] || d['home'] === d['team2']) {
                            return 'red';
                        }

                        return 'blue';
                    });

                // Add a legend
                let legend = d3.select('.world_cup_svg')
                    .append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (this.width - 100) + ', 20)')
                    .selectAll('g')
                    .data(["Home", "Away"])
                    .enter()
                    .append('g');

                legend.append('circle')
                    .attr('cy', (d, i) => i*30)
                    .attr('r', (d) => {
                        if (d == 'Home') {
                            return this.radius * 1.5;
                        }

                        return this.radius
                    })
                    .attr('fill', (d) => {
                        return d === 'Home' ? 'red' : 'blue';
                    });

                legend.append('text')
                    .attr('y', (d, i) => i*30 + 5)
                    .attr('x', this.radius * 5)
                    .text((d) => d);
            })

    }
}