import * as d3 from 'd3'


/**
 * Data file at /udacity/01_globe/world_countries.json
 */
export default class Maps {
    constructor() {
        this.dataFile = "/udacity/01_globe/world_countries.json";
        this.worldCupFile = "/udacity/01_globe/world_cup_geo.tsv";
        this.margin = 200,
            this.width = 1920 - this.margin,
            this.height = 1080 - this.margin;
    }

    render() {
        console.log("Rendering maps in D3");

        d3.json(this.dataFile, (geoData) => {
            let svg = d3.select(".maps")
                .attr("width", this.width)
                .attr("height", this.height)
                .append("g")
                .attr('class', 'map');

            let projection = d3.geoMercator()
                .scale(175)         // Analogous to the zoom feature
                .translate([this.width / 3, this.height / 1.5]);  // Used to shift the center of the map

            // the path generator function that processes the feature points and returns path svg elements
            let path = d3.geoPath(projection);

            svg.selectAll("path")
                .data(geoData.features)
                .enter()
                .append('path')
                .attr('d', path)
                .style('stroke', 'black')
                .style('stroke-width', '0.5')
                .style('fill', 'rgb(9,157,257)');

            function plotPoints(data) {
                // draw circles logic
                let nested = d3.nest()
                    .key((d) => d['date'].getUTCFullYear())
                    .rollup((leaves) => {
                        let totalAttendance = d3.sum(leaves, (leaf) => leaf.attendance);

                        let coords = leaves.map((d) => {
                            return projection([+d.long, +d.lat])
                        });

                        let centerX = d3.mean(coords, function(d) {
                            return d[0];
                        });

                        let centerY = d3.mean(coords, function(d) {
                            return d[1];
                        });

                        return {
                            'attendance': totalAttendance,
                            'x': centerX,
                            'y': centerY
                        };
                    })
                    .entries(data);

                let radius = d3.scaleSqrt()
                    .domain(d3.extent(nested, (d) => d.value.attendance))
                    .range([0, 12]);

                svg.append('g')
                    .attr('class', 'bubble')
                    .selectAll('circle')
                    .data(nested.sort((a, b) => {
                        return b.value.attendance - a.value.attendance;
                    }))
                    .enter()
                    .append('circle')
                    .attr('cx', (d) => d.value.x)
                    .attr('cy', (d) => d.value.y)
                    .attr('r', (d) => {
                        return radius(d.value.attendance);
                    })
                    .attr('fill', 'rgb(247, 148, 32)')
                    .attr('opacity', 0.7)
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.7);
            }

            let format = d3.timeParse("%d-%m-%Y (%H:%M h)");

            d3.tsv(this.worldCupFile, (d) => {
                d['attendance'] = +d['attendance'];
                d['date'] = format(d['date']);

                return d;
            }, plotPoints);
        })
    }
}