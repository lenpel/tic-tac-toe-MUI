import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      whoMoves: 'X',
      squares: Array(9).fill(null),
      winner: null
    }
  }

  handleClick(i) {
    const squares = this.state.squares;
    squares[i] = this.state.whoMoves === 'X'? 'X' : 'O';
    this.setState({
      whoMoves: this.state.whoMoves === 'X'? 'O' : 'X',
      squares: squares
    })
  }

  calculateWinner(squares) {
    const lines =
      [[0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]];
      for (let i = 0; i< lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] &&
            squares[a] === squares[c]) {
              return squares[a];
        }
      }
      return null;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + this.state.whoMoves;
    }

    return (
      <div className="App">
        <h1> TicTacToe </h1>
        <div className='game'>
          <Board className="board"
            squares={this.state.squares}
            handleClick={(i)=> this.handleClick(i)}
          />
          <div className='game-info'>{status}</div>
        </div>

      </div>
    );
  }
}

export default App;
