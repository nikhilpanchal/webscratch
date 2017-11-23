import {chartFactory} from './reusable_groupedbarchart';
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
}