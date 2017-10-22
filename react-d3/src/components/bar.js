import React from 'react';
import './bar.css';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            opacity: 1,
            transition: 'opacity 500ms'
        };
    }

    componentWillUnmount() {
        console.log(`Component unmount`);
    }

    componentDidMount() {
        console.log(`Component did mount`);
    }

    componentWillReceiveProps() {
        this.setState({
            opacity: 0,
            transition: 'opacity 50ms'
        });
        console.log(`Component will receive props`);

        setTimeout(() => {
            this.setState({
                opacity: 1,
                transition: 'opacity 950ms'
            });
        }, 0);
    }

    render() {
        return <rect className="bar" style={{opacity: this.state.opacity, transition: this.state.transition}}
                     x={this.props.xScale(this.props.security.id)}
                     y={this.props.yScale(this.props.security.ror)}
                     width={this.props.xScale.bandwidth()}
                     height={this.props.height - this.props.yScale(this.props.security.ror)}
        />;
    };
}

