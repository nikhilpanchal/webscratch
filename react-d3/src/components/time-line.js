import React from 'react';

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let x = this.props.scale ? this.props.scale(this.props.date): 20;

        return <line x1={x}
                     y1='5'
                     x2={x}
                     y2='330'
                     strokeWidth='2'
                     stroke='black'
        ></line>;
    }
}