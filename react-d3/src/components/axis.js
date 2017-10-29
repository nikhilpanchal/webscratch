import React from 'react';
import * as d3 from 'd3';
import './axis.css';

export default class Axis extends React.Component {
    componentDidMount() {
        this.node = this.refs.axis;
        this.axis = (this.props.orient === 'left') ? d3.axisLeft : d3.axisBottom;
        d3.select(this.node).call(this.axis(this.props.scale).ticks());
    }

    render() {
        return <g className="axis" ref="axis" transform={this.props.translate}></g>;
    }
}