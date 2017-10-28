import React from 'react';
import Axis from './axis';

const XYAxis = (props) => {
    console.log(`Props called with ${JSON.stringify(props)}`);

    const xSettings = {
        translate: `translate(0, ${props.height - props.padding})`,
        scale: props.xScale,
        orient: 'bottom'
    };
    const ySettings = {
        translate: `translate(${props.padding}, 0)`,
        scale: props.yScale,
        orient: 'left'
    };
    return <g>
        <Axis {...xSettings}/>
        <Axis {...ySettings}/>
    </g>;
};

export default XYAxis;