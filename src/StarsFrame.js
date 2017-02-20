import React, { Component } from 'react';

class StarsFrame extends Component {
    render() {
        let stars = [];
        for (let i = 0; i < this.props.numberOfStars; i++) {
            stars.push(<span className="glyphicon glyphicon-star"></span>);
        }

        return (
            <div id="stars-frame">
                <div className="well">
                    {stars}
                </div>
            </div>
        );
    }
}

export default StarsFrame;