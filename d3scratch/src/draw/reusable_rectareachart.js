import * as d3 from 'd3';


function rectAreaChart() {
    let height = 10,
        width = 10,
        margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        },
        showLegend = false;

    function generator(selection) {
        console.log("Displaying a rectangular area chart")

    }

    generator.height = function (_) {
        if (!arguments.length) {
            return height;
        }

        height = _;

        // Confirm whether return "this" would be equivalent. I reckon it would.
        return generator;
    };

    generator.width = function (_) {
        if (!arguments.length) {
            return width;
        }

        width = _;
        return generator;
    };

    generator.showLegend = function (_) {
        if (!arguments.length) {
            return showLegend;
        }

        showLegend = _;
        return generator;
    };


    return generator;
}

export {rectAreaChart as RectangleAreaChartGenerator};