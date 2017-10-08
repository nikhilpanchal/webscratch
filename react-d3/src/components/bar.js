import React from 'react';
import './bar.css';

export default (props) => {
        return <rect className="bar"
              x={props.xScale(props.security.securityId)}
              y={props.yScale(props.security.rorDaily)}
              width={props.xScale.bandwidth()}
              height={props.height - props.yScale(props.security.rorDaily)}
        />;
};
