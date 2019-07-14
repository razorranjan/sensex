import React, { Component } from 'react';
import WebSocket from 'react-websocket';
import TickerlistComponent from './TickerlistComponent';
import './Ticker.css'
class TickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            exchangerates: '',
            oldexchangerates: ''
        }
    }
    handleData(data) {
        let result = JSON.parse(data);
        let today = new Date();
        let currenttime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if(this.state.exchangerates === '') {
            result.forEach(
                ([name, price],index) => {
                    result[index][1] = parseFloat(result[index][1]).toFixed(2);
                    result[index][2] = 'white';
                    result[index][3] = currenttime;
                }
            );
            this.setState({exchangerates: result});
            this.setState({oldexchangerates: result});
        } else {
            this.setState({exchangerates: result});
            let oldrates = this.state.oldexchangerates;
            result.forEach(
                ([name, price],index) => {
                    oldrates.forEach(([oldname,oldprice],indexold) => {
                        if((oldname === name) && (oldprice > price)) {
                            oldrates[indexold][1] = parseFloat(price).toFixed(2);
                            oldrates[indexold][2] = 'red';
                            oldrates[indexold][3] = currenttime;
                        } else if((oldname === name) && (oldprice < price)) {
                            oldrates[indexold][1] = parseFloat(price).toFixed(2);
                            oldrates[indexold][2] = 'green';
                            oldrates[indexold][3] = currenttime;
                        } else if((oldname !== name) && (oldprice !== price)) {
                        }
                    });
                }
            );
            this.setState({exchangerates: oldrates});
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                <WebSocket url='ws://stocks.mnet.website' onMessage={this.handleData.bind(this)}/>
                <TickerlistComponent rates={this.state.exchangerates}></TickerlistComponent>
            </React.Fragment>
         );
    }
}
 
export default TickerComponent;