import React from 'react';
import * as d3 from 'd3';
import './axis.css';

export default class Axis extends React.Component {
    componentDidMount() {
        let node  = this.refs.axis;
        let axis = (this.props.orient === 'left') ? d3.axisLeft : d3.axisBottom;

        d3.select(node).call(axis(this.props.scale).ticks());
    }

    render() {
        let node  = this.refs.axis;
        let axis = (this.props.orient === 'left') ? d3.axisLeft : d3.axisBottom;

        d3.select(node).call(axis(this.props.scale).ticks());

        return <g className="axis" ref="axis" transform={this.props.translate}></g>;
    }
}