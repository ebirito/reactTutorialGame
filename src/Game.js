import React, { Component } from 'react';
import StarsFrame from './StarsFrame';
import ButtonFrame from './ButtonFrame';
import AnswerFrame from './AnswerFrame';
import NumbersFrame from './NumbersFrame';
import DoneFrame from './DoneFrame';

class Game extends Component {
  constructor(props) {
    super(props);
    let numberOfStars = this.randomNumberOfStars();
    this.state = {
      numberOfStars: numberOfStars,
      selectedNumbers: [],
      usedNumbers: [],
      correct: null,
      redraws: 5,
      doneStatus: null
    };

    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart() {
    this.setState({
      numberOfStars: this.randomNumberOfStars(),
      selectedNumbers : [],
      usedNumbers: [],
      correct: null,
      redraws: 5,
      doneStatus: null
    });
  }

  selectNumber(selectedNumber) {
    if (this.state.selectedNumbers.includes(selectedNumber)){
      return;
    }
    this.setState({
        selectedNumbers: [...this.state.selectedNumbers, selectedNumber],
        correct: null
      }
    )
  }

  unselectNumber(unselectedNumber) {
    let index = this.state.selectedNumbers.indexOf(unselectedNumber);
    let newSelectedNumbers = [...this.state.selectedNumbers];
    newSelectedNumbers.splice(index, 1)
    this.setState({
        selectedNumbers: newSelectedNumbers,
        correct: null
      }
    )
  }

  checkAnswer() {
    let sumOfSelectedNumbers = this.state.selectedNumbers.reduce((prev, curr) => {
      return prev + curr;
    }, 0);
    let correct = sumOfSelectedNumbers === this.state.numberOfStars;
    this.setState( { correct: correct });
  }

  acceptAnswer() {
      this.setState( 
      {
        correct: null,
        usedNumbers: [...this.state.usedNumbers, ...this.state.selectedNumbers],
        selectedNumbers: [],
        numberOfStars: this.randomNumberOfStars(),
      }, () => { this.updateDoneStatus(); });
  }

  redraw() {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState( {
      numberOfStars: this.randomNumberOfStars(),
      correct: null,
      selectedNumbers: [],
      redraws: this.state.redraws - 1
    }, () => { this.updateDoneStatus() });
  }

  randomNumberOfStars() {
    return Math.floor(Math.random() * 9) + 1;
  }

  updateDoneStatus() {
    if (this.state.usedNumbers.length === 9) {
      this.setState({ doneStatus: 'Done. Nice!' });
      return;
    }
    if (this.state.redraws === 0 && !this.possibleSolutions()) {
      this.setState({ doneStatus: 'Game Over!' });
      return;
    }
  }

  possibleSolutions() {
    let possibleNumbers = [];
    for(let i = 1; i <=9; i++){
      if (!this.state.usedNumbers.includes(i)){
        possibleNumbers.push(i);
      }
    }

    return this.possibleCombinationSum(possibleNumbers, this.state.numberOfStars);
  }

  possibleCombinationSum(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

  render() {
    let selectedNumbers = this.state.selectedNumbers;
    let numberOfStars = this.state.numberOfStars;
    let bottomFrame = this.state.doneStatus ? 
      <DoneFrame doneStatus={this.state.doneStatus} restart={this.restart} /> :
      <NumbersFrame selectedNumbers={selectedNumbers} usedNumbers={this.state.usedNumbers} selectNumber={this.selectNumber} />

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix" >
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNumbers={selectedNumbers} checkAnswer={this.checkAnswer} 
            acceptAnswer={this.acceptAnswer} redraw={this.redraw} redraws={this.state.redraws} correct={this.state.correct} />
          <AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        {bottomFrame}
      </div>
    );
  }
}

export default Game;
