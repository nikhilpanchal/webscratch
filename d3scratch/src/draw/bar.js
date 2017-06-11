import * as d3 from 'd3'

export default class BarChart {
    render(data) {
        d3.select(".chart")
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .style("width", function (d) { return d*10 + 'px'})
            .text(function (d) { return d });
    }

    update(data) {
        // update elements
        let elements = d3.select(".chart")
            .selectAll("div")
            .data(data);

        // Get the new elements, merge with the updates
        // and set the text for both
        elements.enter().append("div")
            .merge(elements)
            .style("width", function (d) { return d*10 + 'px'})
            .text(function (d) { return d });
    }
}
