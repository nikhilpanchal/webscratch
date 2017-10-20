import React from 'react';
// import Scatter from './scatter';
import BarGraph from './bargraph';
import EntityReturns from '../services/entity-returns';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

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

const randomBarData = () => {
    return Array.apply(null, {length: length}).map((el, index) => {
        return {
            securityId: `sec${index}`,
            rorDaily: (Math.random()*100).toFixed(4)
        };
    });
};

export default class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Run Data',
            // data: randomPoints()
            // data: randomBarData()
            data: [],
            error: {}
        };

        this.serverReturns = new EntityReturns();

        this.randomize = this.randomize.bind(this);
        this.retrieveData = this.retrieveData.bind(this);

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
                    data: randomBarData()
                });
            }, 200);

            this.setState({
                buttonText: 'Stop Data'
            });
        }
    }

    retrieveData() {
        let self = this;
        this.serverReturns.getAccountReturnsForBuCompositeAndDateRange()
            .then(function (data) {
                self.setState({
                    data: data[Object.keys(data)[0]],
                    allData: data
                });
            })
            .catch(function (error) {
                self.setState({
                    error: {
                        message: error.message,
                        stack: error.stack
                    }
                });
            });
    }

    render() {
        let inlineStyles = {
            padding: "20px",
            textAlign: "left"
        };

        return (
            <div>
                <h1>Playing with React and D3</h1>

                <div>
                    {/*<Scatter {...this.state} {...styles} />*/}

                    <BarGraph {...this.state} {...styles} />

                    <div>
                        <Button bsStyle='primary' onClick={this.retrieveData}>Randomize Data</Button>
                    </div>

                    <div style={inlineStyles}>
                        <Alert bsStyle="warning">
                            <h4>{this.state.error.message}</h4>
                            <p>{this.state.error.stack}</p>
                        </Alert>
                    </div>
                </div>
            </div>
        );
    }
}