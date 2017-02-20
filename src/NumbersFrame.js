import React, { Component } from 'react';

class NumbersFrame extends Component {
    render() {
        let numbers = []
        for (let i = 1; i < 10; i++){
            let className = this.props.selectedNumbers.includes(i) ? 'number selected' : 'number';
            if (this.props.usedNumbers.includes(i)) {
                className += ' used';
            }
            numbers.push(<div className={className} onClick={this.props.selectNumber.bind(null, i)}>{i}</div>);
        }

        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
}

export default NumbersFrame;