import React from 'react';
import * as d3 from 'd3';
import Bar from "./bar";
import XYAxis from "./xyaxes";
import Transition from 'react-transition-group/Transition';


const BarGraph = (props) => {

    const duration = 500;
    const style = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    };
    const transitionStyle = {
        entering: {opacity: 0},
        entered: {opacity: 1}
    };


    const xScale = d3.scaleBand()
        .range([props.padding, props.width - props.padding])
        .domain(props.data.map((security) => {
            return security.id;
        }));

    const yScale = d3.scaleLinear()
        .range([props.height - props.padding, props.padding])
        .domain([0, d3.max(props.data, (security) => {
            return security.ror;
        })]);

    const scales = {xScale, yScale};

    return (
        <Transition in={props.in} timeout={duration}>
            {(state) => {
                return (
                    <svg style={{...style, ...transitionStyle[state]}} height={props.height} width={props.width}>
                        {props.data.map((security, index) => {
                            return <Bar {...scales} height={props.height - props.padding} security={security} key={index} />;
                        })}
                        <XYAxis {...scales} {...props} />
                    </svg>
                );
            }}
        </Transition>
    );
};

export default BarGraph;