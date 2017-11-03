import React from 'react';
import * as d3 from 'd3';
import Bar from "./bar";
import XYAxis from "./xyaxes";
import TimeLine from "./time-line";


export default class BarGraph extends React.Component {

    shouldComponentUpdate(nextProps) {
        return (this.props.data !== nextProps.data);
    }

    render() {
        const duration = 500;
        const style = {
            transition: `opacity ${duration}ms`,
            opacity: 0
            // marginTop: '40px'
        };

        const xScale = d3.scaleBand()
            .range([this.props.padding, this.props.width - this.props.padding])
            .domain(this.props.data.map((security) => {
                return security.id;
            }));

        const yScale = d3.scaleLinear()
            .range([this.props.height - this.props.padding, this.props.padding])
            .domain([0, d3.max(this.props.data, (security) => {
                return +security.ror;
            })]);

        const timeXScale = d3.scaleBand()
            .range([this.props.padding, this.props.width - this.props.padding])
            .domain(this.props.dates);

        const scales = {xScale, yScale};

        return (
            <svg style={{...style, opacity: this.props.data.length ? 1 : 0}} height={this.props.height}
                 width={this.props.width}>
                {this.props.data.map((security, index) => {
                    return <Bar {...scales}
                                height={this.props.height - this.props.padding}
                                entity={security}
                                clickHandler={this.props.barClickHandler}
                                hoverHandler={this.props.barHoverHandler}
                                key={index}/>;
                })}

                {/*<TimeLine date={this.props.dates[this.props.index]} scale={timeXScale}/>*/}

                {this.props.data.length &&
                    <XYAxis {...scales} {...this.props} />
                }
            </svg>
        );
    }
};