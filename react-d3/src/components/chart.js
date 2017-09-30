import React from 'react';
import Scatter from './scatter';

const styles = {
    width: 500,
    height: 300,
    padding: 20
};

const length = 50;
const randomInt = () => Math.floor(Math.random() * 1000);

const randomPoints = () => {
    return Array.apply(null, {length: length}).map(() => [randomInt(), randomInt()]);
};

export default class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: randomPoints()
        };

        this.randomize = this.randomize.bind(this);
    }

    randomize() {
        this.setState({
            data: randomPoints()
        });
    }

    render() {
        return (
            <div>
                <h1>Playing with React and D3</h1>

                <div>
                    <Scatter {...this.state} {...styles} />

                    <div>
                        <button className='btn' onClick={this.randomize}>Randomize Data</button>
                    </div>
                </div>
            </div>
        );
    }
}