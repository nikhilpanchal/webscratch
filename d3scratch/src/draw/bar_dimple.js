import dimple from 'dimple-js/dist/dimple.v2.1.4'
import * as d3 from 'd3'

export default class BarDimple {
    constructor() {

    }

    render() {
        var margin = 75,
            width = 1400 - margin,
            height = 600 - margin;

        let svg = d3.select(".dimple_svg")
            .attr("width", width + margin)
            .attr("height", height + margin);

        d3.tsv("/resources/letter_frequency.txt",
            (d) => {
                d.value = +d.value;
                return d;
            },
            (error, data) => {
                let chart = new dimple.chart(svg, data);
                let x = chart.addCategoryAxis("x", "name");
                let y = chart.addMeasureAxis("y", "frequency");
                y.title = "Value";
                chart.addSeries(null, dimple.plot.bar);

                chart.draw();
            }
        );
    }
}

