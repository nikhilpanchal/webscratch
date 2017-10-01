import React from 'react';
import Scatter from './scatter';
import Button from 'react-bootstrap/lib/Button';

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
            buttonText: 'Run Data',
            data: randomPoints()
        };

        this.randomize = this.randomize.bind(this);

        this.interval = undefined;
    }

    randomize() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
            this.setState({
                buttonText: 'Start Data'
            });
        } else {
            this.interval = setInterval(() => {
                this.setState({
                    data: randomPoints()
                });
            }, 200);

            this.setState({
                buttonText: 'Stop Data'
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Playing with React and D3</h1>

                <div>
                    <Scatter {...this.state} {...styles} />

                    <div>
                        <Button bsStyle='primary' onClick={this.randomize}>Randomize Data</Button>
                    </div>
                </div>
            </div>
        );
    }
}