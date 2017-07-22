import * as d3 from 'd3'


/**
 * Data file at /udacity/01_globe/world_countries.json
 */
export default class Maps {
    constructor() {
        this.dataFile = "/udacity/01_globe/world_countries.json";
        this.margin = 75,
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

            let projection = d3.geoMercator().scale(175).translate([this.width/3, this.height/2]);

            // the path function that processes the feature points to path svg elements
            let path = d3.geoPath(projection);

            svg.selectAll("path")
                .data(geoData.features)
                .enter()
                .append('path')
                .attr('d', path)
                .style('stroke', 'black')
                .style('stroke-width', '0.5')
                .style('fill', 'rgb(9,157,257)');
        })
    }
}