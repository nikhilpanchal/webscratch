import React from 'react';
import * as d3 from 'd3';
import XYAxis from "./xyaxes";
import './line.css';

export default class LineChart extends React.Component {

    constructor(props) {
        super(props);

        this.xScale = d3.scaleBand()
            .range([props.padding, props.width - props.padding])
            .domain(props.data.map((security) => {
                return Object.entries(security)[0][0];  // date
            }));

        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(props.data, (security) => {
                return Object.entries(security)[0][1];
            })])
            .range([props.height - props.padding, props.padding]);

        this.scales = {
            'xScale': this.xScale,
            'yScale': this.yScale
        };
    }

    render() {
        let self = this;

        let line = d3.line()
            .x(function(security) {
                return self.xScale(Object.entries(security)[0][0]);
            })
            .y(function(security) {
                return self.yScale(Object.entries(security)[0][1]);
                // return self.yScale(5);
            });

        return (
            <svg height={this.props.height} width={this.props.width}>
                <g>
                    <path d={line(this.props.data)} className="securityLine"></path>
                </g>

                <XYAxis {...this.scales} {...this.props}/>
            </svg>
        );
    }
}