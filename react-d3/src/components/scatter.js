import React from 'react';
import * as d3 from 'd3';
import DataCircles from './data-circles';
import XYAxis from './xyaxes';
import './scatter.css';


const xMax = (data) => d3.max(data, (d) => d[0]);
const yMax = (data) => d3.max(data, (d) => d[1]);

const xScale = (props) => {
    return d3.scaleLinear()
        .domain([0, xMax(props.data)])
        .range([props.padding, props.width - props.padding]);
};

const yScale = (props) => {
    return d3.scaleLinear()
        .domain([0, yMax(props.data)])
        .range([props.height - props.padding, props.padding]);
};

export default (props) => {
    const scales = {xScale: xScale(props), yScale: yScale(props)};

    return <svg className='graph' height={props.height} width={props.width}>
        <DataCircles {...props} {...scales} />
        <XYAxis {...props} {...scales} />
    </svg>;
};