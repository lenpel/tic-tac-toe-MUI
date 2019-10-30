import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";

class App extends Component {

  constructor(props) {
    super();
    this.state = this.initialState();
  }

  initialState () {
    return {
      whoMoves: 'X',
      squares: Array(9).fill(null),
      winner: null
    };
  }

  reset () {
    this.setState(this.initialState())
  }

  handleClick(i) {
    const squares = this.state.squares;
    const player = this.state.whoMoves;

    // no action if clicked on occupied square
    if (squares[i]) {
      return
    }

    let winner = this.calculateWinner(squares);
    if (player === 'O') {
      alert('Please wait for your turn!')
    }

    if (!winner && player === 'X') {
      squares[i] = 'X';
      this.setState({
        whoMoves: 'O', //computer's turn
        squares: squares
      })
      winner = this.calculateWinner(this.state.squares);
      if (!winner) {
        this.computerMove(this.state.squares);
      }
    }
  }

  computerMove(squares) {
    setTimeout(() => {
      // first try middle, then corners, then rest
      if (!squares[4]) {
        squares[4] = 'O';
      } else if (!squares[0]) {
        squares[0] = 'O';
      } else if (!squares[2]) {
        squares[2] = 'O';
      } else if (!squares[6]) {
        squares[6] = 'O';
      } else if (!squares[8]) {
        squares[8] = 'O';
      } else {
        for (let i=0; i<9; i++) {
          if (!squares[i]) {
            squares[i] = 'O';
          }
        }
      }
      this.setState({
          whoMoves: 'X',
          squares: squares
      })
    }, 2000);
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
    const isEmtpySpot = this.state.squares.some(el => el === null);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (!isEmtpySpot) {
        status = 'It\'s a draw!';
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
          <button onClick= {() => this.reset()}> Reset </button>
        </div>

      </div>
    );
  }
}

export default App;
