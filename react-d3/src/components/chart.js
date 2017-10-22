import React from 'react';
// import Scatter from './scatter';
import BarGraph from './bargraph';
import EntityReturns from '../services/entity-returns';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Label from 'react-bootstrap/lib/Label';
import './chart.css';

const styles = {
    width: 600,
    height: 350,
    padding: 20
};

const animationInterval = 1000;

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
            keyIndex: 0,
            allData: {}
        };

        this.serverReturns = new EntityReturns();

        this.randomize = this.randomize.bind(this);
        this.toggleData = this.toggleData.bind(this);
        this.showNextDateData = this.showNextDateData.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
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

    toggleData() {
        if (this.state.data.length) {
            // Remove the data if it exists
            this.setState({
                data: []
            });

            return;
        }

        let self = this;
        this.serverReturns.getAccountReturnsForBuCompositeAndDateRange()
            .then(function (data) {
                self.setState({
                    keyIndex: 0,
                    data: data[Object.keys(data)[0]],
                    allData: data
                });

                console.log(`${new Date()}: Showing the Graph`);
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

    playAnimation(e) {
        if (this.state.keyIndex+1 >= Object.keys(this.state.allData).length) {
            this.setState({
                keyIndex: 0
            });
        }

        let animation = setInterval(() => {
            let keyIndex = this.state.keyIndex + 1;

            this.setState({
                keyIndex: keyIndex,
                data: this.state.allData[Object.keys(this.state.allData)[keyIndex]]
            });

            if (keyIndex+1 >= Object.keys(this.state.allData).length) {
                clearInterval(animation);
            }
        }, animationInterval);
    }

    clearAlert() {
        this.setState({
            error: {}
        });
    }

    dates;

    render() {
        let inlineStyles = {
            width: styles.width
        };

        let dates = Object.keys(this.state.allData);

        return (
            <div>
                <h1>Playing with React and D3</h1>

                <div className="container">
                    {this.state.error.message &&
                        <div className="alert">
                            <Alert bsStyle="warning" onDismiss={this.clearAlert}>
                                <h4>{this.state.error.message}</h4>
                                <p>{this.state.error.detail}</p>
                            </Alert>
                        </div>
                    }

                    {/*<Scatter {...this.state} {...styles} />*/}

                    <div style={inlineStyles} className='datelabel'>
                        <Label bsStyle='default'>{this.state.data.length ?
                            dates[this.state.keyIndex]
                        : new Date().toLocaleDateString()}</Label>
                    </div>

                    <BarGraph data={this.state.data} dates={dates} index={this.state.keyIndex} {...styles}/>

                    <div>
                        <Button bsStyle='primary' className="button" onClick={this.toggleData}>
                            {this.state.data.length ? "Hide Data" : "Load Data"}
                        </Button>
                        <Button bsStyle='primary' className="button" onClick={this.playAnimation}>Play</Button>
                        <Button bsStyle='primary' className="button" onClick={this.showNextDateData}>Next</Button>
                    </div>

                </div>
            </div>
        );
    }
}