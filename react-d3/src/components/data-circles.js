import React from 'react';


export default (props) => {
    return (
        <g>{props.data.map((point, index) => {
            return <circle cx={props.xScale(point[0])} cy={props.yScale(point[1])} r='2' key={index}></circle>
        })}</g>
    )
}