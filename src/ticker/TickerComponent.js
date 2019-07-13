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
        console.log(result);
        let today = new Date();
        let currenttime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // console.log([...new Set(result.map(x => x[0]))]);
        if(this.state.exchangerates === '') {
            result.forEach(
                ([name, price],index) => {
                    result[index][2] = 'white';
                    result[index][3] = currenttime;
                }
            );
            this.setState({exchangerates: result});
            this.setState({oldexchangerates: result});
            // console.log(this.state.exchangerates);
        } else {
            this.setState({exchangerates: result});
            let oldrates = this.state.oldexchangerates;
            result.forEach(
                ([name, price],index) => {
                    // console.log(`${name}: ${price}`)
                    oldrates.forEach(([oldname,oldprice],indexold) => {
                        if((oldname === name) && (oldprice > price)) {
                            oldrates[indexold][1] = price;
                            oldrates[indexold][2] = 'red';
                            oldrates[indexold][3] = currenttime;
                            // console.log(`${oldname}: ${oldprice} <<<------ ${name}: ${price}`);
                        } else if((oldname === name) && (oldprice < price)) {
                            oldrates[indexold][1] = price;
                            oldrates[indexold][2] = 'green';
                            oldrates[indexold][3] = currenttime;
                            // console.log(`${oldname}: ${oldprice} ------>>> ${name}: ${price}`);
                        } else if((oldname !== name) && (oldprice != price)) {
                            // oldrates.push(result[index]);
                            // oldrates[index][2] = 'white';
                            // oldrates[index][3] = currenttime;break;
                        }
                    });
                    // console.log(oldrates);
                }
            );
            this.setState({exchangerates: oldrates});
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                {/* Count: <strong>{this.state.count}</strong> */}
                <WebSocket url='ws://stocks.mnet.website' onMessage={this.handleData.bind(this)}/>
                <TickerlistComponent rates={this.state.exchangerates}></TickerlistComponent>
            </React.Fragment>
         );
    }
}
 
export default TickerComponent;