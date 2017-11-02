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
        this.handleHover = this.handleHover.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
        this.getEntityType = this.getEntityType.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            opacity: 0,
            transition: 'opacity 50ms'
        });

        setTimeout(() => {
            this.setState({
                opacity: 1,
                transition: 'opacity 450ms'
            });
        }, 0);
    }

    getEntityType(id) {
        return id.startsWith('account') ? 'Account':'Security';
    }

    handleClick(e) {
        this.props.clickHandler(this.props.entity.id, this.getEntityType(this.props.entity.id));
    }

    handleHover(e) {
        this.props.hoverHandler(this.props.entity, e, true);
    }

    handleHoverOut(e) {
        this.props.hoverHandler(this.props.entity, e, false);
    }

    render() {
        let className = this.getEntityType(this.props.entity.id) === 'Account' ? 'bar-account' : 'bar-security';

        return <rect className={className}
            style={{opacity: this.state.opacity,
                transition: this.state.transition
            }}
                     x={this.props.xScale(this.props.entity.id)}
                     y={this.props.yScale(this.props.entity.ror)}
                     width={this.props.xScale.bandwidth()}
                     height={this.props.height - this.props.yScale(this.props.entity.ror)}
                     onClick={this.handleClick}
                     onMouseOver={this.handleHover}
                     onMouseOut={this.handleHoverOut}
        />;
    };
}

