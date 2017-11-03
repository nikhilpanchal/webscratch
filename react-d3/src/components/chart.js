import React from 'react';
// import Scatter from './scatter';
import BarGraph from './bargraph';
import EntityReturns from '../services/entity-returns';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Label from 'react-bootstrap/lib/Label';
import './chart.css';
import LineChart from './linechart';

const styles = {
    width: 1200,
    height: 400,
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
            rorDaily: (Math.random() * 100).toFixed(4)
        };
    });
};

export default class Chart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Run Data',
            data: [],
            error: {},
            keyIndex: 0,
            allData: {},
            toolTip: {
                visible: false,
                id: 'test',
                ror: 0,
                position: {
                    top: 50,
                    left: 50
                }
            },
            allSecurityData: {}
        };

        this.serverReturns = new EntityReturns();

        this.randomize = this.randomize.bind(this);
        this.toggleData = this.toggleData.bind(this);
        this.showNextDateData = this.showNextDateData.bind(this);
        this.playAnimation = this.playAnimation.bind(this);
        this.clearAlert = this.clearAlert.bind(this);
        this.barclick = this.barclick.bind(this);
        this.barhover = this.barhover.bind(this);

        this.interval = undefined;

        this.toggleData();
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
                    allData: data,
                    nowShowing: 'Composite: C124'
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

    playAnimation(e) {
        if (this.state.keyIndex + 1 >= Object.keys(this.state.allData).length) {
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

            if (keyIndex + 1 >= Object.keys(this.state.allData).length) {
                clearInterval(animation);
            }
        }, animationInterval);
    }

    clearAlert() {
        this.setState({
            error: {}
        });
    }

    barclick(id, type) {
        let self = this;
        let nowShowing = `${type}: ${id}`;

        if (type == 'Account') {
            this.serverReturns.getSecurityReturnsForBuAccountAndDateRange()
                .then(function (data) {
                    // Slight Hack: Need to wait > the bargraph opacity transition duration to allow the animation
                    // effect to kick in. Apparently if you set the opacity to 0 and back to 1 within the duration
                    // time limit, you won't see any transition (animation) effect.
                    setTimeout(() => {
                        self.setState({
                            keyIndex: 0,
                            data: data[Object.keys(data)[0]],
                            allData: data,
                            nowShowing: nowShowing
                        });
                    }, 600);
                })
                .catch(function (error) {
                    self.setState({
                        error: {
                            message: error.message,
                            detail: error.stack
                        }
                    });
                });

            this.setState({
                data: []
            });
        } else if (type == 'Security') {
            if (Object.entries(this.state.allSecurityData).length === 0) {
                this.serverReturns.getSecurityReturnsForDateRange()
                    .then(function (data) {
                        self.setState({
                            data: data[id],
                            nowShowing: nowShowing,
                            allSecurityData: data
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
            } else {
                this.setState({
                    data: this.state.allSecurityData[id],
                    nowShowing: nowShowing
                });
            }
        }

        // Get rid of any tooltip
        this.setState({
            toolTip: undefined
        });
    }

    barhover(entity, e, isHoverIn) {
        if (isHoverIn) {
            this.setState({
                toolTip: {
                    visible: true,
                    position: {
                        left: e.pageX,
                        top: e.pageY
                    },
                    id: entity.id,
                    ror: entity.ror
                }
            });
        } else {
            let toolTip = Object.assign({}, this.state.toolTip, {
                visible: false
            });

            this.setState({
                toolTip
            });
        }
    }


    render() {
        let dates = Object.keys(this.state.allData);
        let inlineStyles = {
            transform: `translate(${this.state.keyIndex * 100}px, 0px)`,
            transition: 'transform 1s'
        };
        let showSecurityLine = this.state.nowShowing && this.state.nowShowing.startsWith('Security');

        return (
            <div>
                <h2>{this.state.nowShowing}</h2>
                <div className="container" style={{width: styles.width}}>
                    {this.state.error.message &&
                    <div className="alert">
                        <Alert bsStyle="warning" onDismiss={this.clearAlert}>
                            <h4>{this.state.error.message}</h4>
                            <p>{this.state.error.detail}</p>
                        </Alert>
                    </div>
                    }


                    {this.state.data.length > 0 && !showSecurityLine &&
                        <div id="animation-bar" style={{height: '50px', textAlign: 'left'}}>
                                <h4>
                                    <Label bsStyle='default'
                                           style={inlineStyles}
                                           className='datelabel'>
                                        {dates[this.state.keyIndex]}
                                    </Label>
                                </h4>
                        </div>
                    }

                    {
                        this.state.nowShowing &&
                        showSecurityLine ? (
                            <LineChart data={this.state.data}
                                       {...styles}/>
                        ) : ( <BarGraph data={this.state.data}
                                        dates={dates}
                                        index={this.state.keyIndex}
                                        barClickHandler={this.barclick}
                                        barHoverHandler={this.barhover}
                                        {...styles}/>
                        )
                    }
                    <div>
                        <Button bsStyle='primary' className="button" onClick={this.toggleData}>
                            {this.state.data.length ? "Hide Data" : "Load Data"}
                        </Button>
                        <Button bsStyle='primary' className="button" onClick={this.playAnimation}>Play</Button>
                        <Button bsStyle='primary' className="button" onClick={this.showNextDateData}>Next</Button>
                    </div>

                </div>

                {this.state.toolTip &&
                <div className="tooltip" style={{
                    opacity: this.state.toolTip.visible ? 1 : 0,
                    top: this.state.toolTip.position.top - 20,
                    left: this.state.toolTip.position.left + 10
                }}>
                    <div>{this.state.toolTip.id}: {this.state.toolTip.ror}</div>
                </div>
                }
            </div>
        );
    }
}