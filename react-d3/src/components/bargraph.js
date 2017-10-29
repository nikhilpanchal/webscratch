import React from 'react';
import * as d3 from 'd3';
import Bar from "./bar";
import XYAxis from "./xyaxes";
import TimeLine from "./time-line";


const BarGraph = (props) => {
    const duration = 500;
    const style = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    };

    const xScale = d3.scaleBand()
        .range([props.padding, props.width - props.padding])
        .domain(props.data.map((security) => {
            return security.id;
        }));

    const yScale = d3.scaleLinear()
        .range([props.height - props.padding, props.padding])
        .domain([0, d3.max(props.data, (security) => {
            return +security.ror;
        })]);

    const timeXScale = d3.scaleBand()
        .range([props.padding, props.width - props.padding])
        .domain(props.dates);

    const scales = {xScale, yScale};

    return (
        <svg style={{...style, opacity: props.data.length ? 1 : 0}} height={props.height} width={props.width}>
            {props.data.map((security, index) => {
                return <Bar {...scales}
                            height={props.height - props.padding}
                            entity={security}
                            clickHandler={props.barClickHandler}
                            hoverHandler={props.barHoverHandler}
                            key={index}/>;
            })}
            {/*<TimeLine date={props.dates[props.index]} scale={timeXScale}/>*/}
            {props.data.length &&
                <XYAxis {...scales} {...props} />
            }
        </svg>
    );
};

export default BarGraph;