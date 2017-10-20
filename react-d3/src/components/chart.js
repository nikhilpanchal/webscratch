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
            error: {},
            keyIndex: 0
        };

        this.serverReturns = new EntityReturns();

        this.randomize = this.randomize.bind(this);
        this.retrieveData = this.retrieveData.bind(this);
        this.showNextDateData = this.showNextDateData.bind(this);
        this.clearAlert = this.clearAlert.bind(this);

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
                    data: data[Object.keys(data)[self.state.keyIndex]],
                    allData: data
                });
            })
            .catch(function (error) {
                self.setState({
                    error: {
                        message: error.message,
                        detail: error.stack
                    }
                });
            });
    }

    showNextDateData(e) {
        let keyIndex = this.state.keyIndex + 1;

        if (keyIndex >= Object.keys(this.state.allData).length) {
            this.setState({
                error: {
                    message: "No more data",
                    detail: "Cannot go next, no more data"
                }
            });
        } else {
            this.setState({
                keyIndex: keyIndex,
                data: this.state.allData[Object.keys(this.state.allData)[keyIndex]]
            });
        }
    }

    clearAlert() {
        this.setState({
            error: {}
        });
    }

    render() {
        let inlineStyles = {
            padding: "20px",
            textAlign: "left"
        };

        let buttonStyles = {
            marginRight: '10px'
        };

        return (
            <div>
                <h1>Playing with React and D3</h1>

                <div>
                    {/*<Scatter {...this.state} {...styles} />*/}

                    <BarGraph data={this.state.data} {...styles} />

                    <div>
                        <Button bsStyle='primary' style={buttonStyles} onClick={this.retrieveData}>Load Data</Button>
                        <Button bsStyle='primary' style={buttonStyles} onClick={this.showNextDateData}>Next</Button>
                    </div>

                    {this.state.error.message &&
                        <div style={inlineStyles}>
                            <Alert bsStyle="warning" onDismiss={this.clearAlert}>
                                <h4>{this.state.error.message}</h4>
                                <p>{this.state.error.detail}</p>
                            </Alert>
                        </div>
                    }
                </div>
            </div>
        );
    }
}