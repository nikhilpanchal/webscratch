import * as d3 from 'd3'

export default class Rectangle {
    render() {
        d3.selectAll('rect')
            .style("fill", "orange");
    }
}
