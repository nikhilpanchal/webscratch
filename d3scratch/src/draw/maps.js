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

        d3.select('h2')
            .text("World Cup");

        d3.json(this.dataFile, (geoData) => {
            let svg = d3.select("body")
                .append('svg')
                .attr("width", this.width)
                .attr("height", this.height)
                .append("g")
                .attr('class', 'maps');

            let years = [];
            for(var i=1930; i<2015; i += 4) {
                if(i !== 1942 && i !== 1946) {
                    years.push(i);
                }
            }

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
                // Group the data, keyed by year
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

                        let teams = d3.set();

                        leaves.forEach((d) => {
                            teams.add(d.team1);
                            teams.add(d.team2);
                        });

                        return {
                            'attendance': totalAttendance,
                            'x': centerX,
                            'y': centerY,
                            'teams': teams.values()
                        };
                    })
                    .entries(data);

                // Draw circles on the map representing location of the tournament, and size representing attendance
                let radius = d3.scaleSqrt()
                    .domain(d3.extent(nested, (d) => d.value.attendance))
                    .range([0, 12]);

                svg.append('g')
                    .attr('class', 'bubble')
                    .selectAll('circle')
                    .data(nested.sort((a, b) => {
                        return b.value.attendance - a.value.attendance;
                    }), (d) => {
                        // This second accessor function of the data binding function allows you to associate keys
                        // with the returned data sets.
                        return d.key;
                    })
                    .enter()
                    .append('circle')
                    .attr('cx', (d) => d.value.x)
                    .attr('cy', (d) => d.value.y)
                    .attr('r', (d) => {
                        return radius(d.value.attendance);
                    });


                function update(year) {
                    // Only show countries participating for the given year.
                    d3.select('H2')
                        .text(`World Cup ${year}`);

                    // Filter for only the data points for the provided year
                    let filtered = nested.filter((d) => {
                        return new Date(d.key).getUTCFullYear() == year;
                    });

                    let circles = svg.selectAll('circle')
                        .data(filtered, (d) => d.key);

                    // Remove elements that are no longer applicable (since they correspond to data points no longer applicable)
                    circles.exit().remove();

                    // Add new elements (since these have just come in for this year)
                    circles.enter()
                        .append('circle')
                        .transition()
                        .duration(900)
                        .attr('cx', (d) => d.value.x)
                        .attr('cy', (d) => d.value.y)
                        .attr('r', (d) => radius(d.value.attendance))

                    let countries = filtered[0].value.teams;

                    let updateCountries = (d) => {
                        if (countries.indexOf(d.properties.name) !== -1) {
                            return 'lightblue';
                        } else {
                            return 'white';
                        }
                    };

                    svg.selectAll('path')
                        .transition()
                        .duration(900)
                        .style('fill', updateCountries)
                        .style('stroke', updateCountries);
                }

                let sortedNested = nested.sort((a, b) => {
                    return a.key - b.key;
                });

                var i=0;
                let animateInterval = setInterval(function () {
                    update(sortedNested[i].key);
                    i++;

                    if (i >= sortedNested.length) {
                        clearInterval(animateInterval);

                        let buttons = d3.select('body')
                            .append("div")
                            .attr("class", 'years_buttons_container')
                            .selectAll('div')
                            .data(years)
                            .enter()
                            .append('div')
                            .text((d) => d)
                            .attr('class', 'year_buttons');

                        buttons.on("click", function (d) {
                            // d is the data, which in this case is the year (the data to which the button was bound to)
                            d3.select('.years_buttons_container')
                                .selectAll('div')
                                .transition()
                                .duration(500)
                                .style('color', 'black')
                                .style('background', 'rgb(251, 201, 127)');

                            d3.select(this)
                                .transition()
                                .duration(900)
                                .style('background', 'rgb(9,157,257)')
                                .style('color', 'white');

                            update(d);
                        })
                    }
                }, 5);
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