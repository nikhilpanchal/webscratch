import React from 'react';
import * as d3 from 'd3';
import Bar from "./bar";
import XYAxis from "./xyaxes";


const BarGraph = (props) => {
    const xScale = d3.scaleBand()
        .range([props.padding, props.width - props.padding])
        .domain(props.data.map((security) => {
            return security.securityId;
        }));

    const yScale = d3.scaleLinear()
        .range([props.height - props.padding, props.padding])
        .domain([0, d3.max(props.data, (security) => {
            return security.rorDaily;
        })]);

    const scales = {xScale, yScale};

    return <svg className='bargraph' height={props.height} width={props.width}>
        {props.data.map((security, index) => {
            return <Bar {...scales} height={props.height - props.padding} security={security} key={index} />;
        })}
        <XYAxis {...scales} {...props} />
    </svg>;
};

export default BarGraph;