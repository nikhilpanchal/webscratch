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

        this.handleClick = this.handleClick.bind(this);
        this.getEntityType = this.getEntityType.bind(this);
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

    getEntityType(id) {
        return id.startsWith('account') ? 'account':'security';
    }

    handleClick(e) {
        this.props.clickHandler(this.props.entity.id, this.getEntityType(this.props.entity.id));
    }

    render() {
        let className = this.getEntityType(this.props.entity.id) === 'account' ? 'bar-account' : 'bar-security';

        return <rect className={className}
            style={{opacity: this.state.opacity,
                transition: this.state.transition
            }}
                     x={this.props.xScale(this.props.entity.id)}
                     y={this.props.yScale(this.props.entity.ror)}
                     width={this.props.xScale.bandwidth()}
                     height={this.props.height - this.props.yScale(this.props.entity.ror)}
                     onClick={this.handleClick}
        />;
    };
}

