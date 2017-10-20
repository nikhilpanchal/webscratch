import React from 'react';
import './bar.css';

export default (props) => {
        return <rect className="bar"
              x={props.xScale(props.security.id)}
              y={props.yScale(props.security.ror)}
              width={props.xScale.bandwidth()}
              height={props.height - props.yScale(props.security.ror)}
        />;
};
