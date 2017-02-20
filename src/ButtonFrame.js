import React, { Component } from 'react';

class ButtonFrame extends Component {
    render() {
        let button;
        switch(this.props.correct) {
            case true:
                button = <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
                    <span className="glyphicon glyphicon-ok"></span>
                </button>;
                break;
            case false:
                button = <button className="btn btn-danger btn-lg">
                    <span className="glyphicon glyphicon-remove"></span>
                </button>;
                break;
            default:
                let disabled = this.props.selectedNumbers.length === 0;
                button = <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>;
                break;
        }

        let redrawDisabed = this.props.redraws === 0;
        return (
            <div id="button-frame">
                {button}
                <br /><br />
                <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={redrawDisabed}>
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;
                    {this.props.redraws}
                </button> 
            </div>
        );
    }
}

export default ButtonFrame;