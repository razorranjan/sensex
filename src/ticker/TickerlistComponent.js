import React, { Component } from 'react';
class TickerlistComponent extends Component {
    render() {
        let rates = [];
        rates.push(
            <li>
                <span className="name">Name</span>
                <span className="white">Rates</span>
                <span className="updated-time">Updated</span>
            </li>
        );
        console.log(this.props.rates);
        for(let [name,price,color,updated] of this.props.rates) {
            rates.push(
                <li>
                    <span className="name">{name}</span>
                    <span className={color}>{price}</span>
                    <span className="updated-time">{updated}</span>
                </li>
            );
        }
        return ( 
            <div className="ticker-container">{rates}</div>
        );
    }
}
 
export default TickerlistComponent;