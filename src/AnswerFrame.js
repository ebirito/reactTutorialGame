import React, { Component } from 'react';

class AnswerFrame extends Component {
    render() {
        let numbers = this.props.selectedNumbers.map((value) => {
            return (<div className="number" onClick={this.props.unselectNumber.bind(null, value)}>
                {value}
            </div>);
        });

        return (
            <div id="answer-frame">
                <div className="well">
                    {numbers}
                </div>
            </div>
        );
    }
}

export default AnswerFrame;