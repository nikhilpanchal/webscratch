import {chartFactory} from './reusable_groupedbarchart';
import {lineChartFactory} from "./reusable_linechart";
import {StackedAreaChartFactory} from "./stackedarea";
import * as d3 from 'd3';

export default class Reusable {
    constructor() {
    }

    render() {
        let generator = chartFactory()
            .width(600)
            .height(300)
            .margin({
                left: 40,
                right: 20,
                top: 20,
                bottom: 30
            })
            .legend(true)
            .barColors(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        d3.csv('/resources/age_group_data.csv', function (data) {
            d3.select('.container')
                .datum(data)
                .call(generator);
        });
    }

    renderLines() {
        let chart = lineChartFactory()
            .width(600)
            .height(300)
            .margin({
                left: 40,
                right: 20,
                top: 20,
                bottom: 30
            })
            .dataMapper((point) => {
                point.x = d3.timeParse("%b %Y")(point.date);
                point.y = +point.price;

                return point;
            });

        d3.csv('/resources/sp500.csv', function (data) {
            d3.select('.container')
                .datum(data)
                .call(chart);
        });

        let chartNew = lineChartFactory()
            .width(1204)
            .height(300)
            .margin({
                left: 40,
                right: 20,
                top: 20,
                bottom: 30
            })
            .dataMapper((point) => {
                point.x = d3.timeParse("%e-%b-%y")(point.date);
                point.y = +point.close;

                return point;
            });

        d3.tsv('/resources/stock_price.tsv', function (data) {
            d3.select('.container')
                .datum(data)
                .call(chartNew);
        });
    }

    renderArea() {
        let timeParse = d3.timeParse("%b-%y");

        let generator = StackedAreaChartFactory()
            .width(1000)
            .height(500)
            .margin({
                left: 40,
                right: 20,
                top: 20,
                bottom: 30
            })
            .dataMapper((row) => {
                row.date = timeParse(row.date);
                row.equities = +row.equities;
                row.bonds = +row.bonds;

                return row;
            });

        d3.csv('/resources/asset_class.csv', (data) => {
            d3.select('.container')
                .datum(data)
                .call(generator);
        });
    }
}