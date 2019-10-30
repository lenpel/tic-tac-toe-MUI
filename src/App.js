import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ComputerIcon from '@material-ui/icons/Computer';

import AccessibilityIcon from '@material-ui/icons/Accessibility';


class App extends Component {

  constructor(props) {
    super();
    this.state = this.initialState();
  }

  initialState () {
    return {
      whoMoves: 'X',
      squares: Array(9).fill(null),
      winner: null,
      gameType: null
    };
  }

  reset () {
    this.setState(this.initialState())
  }

  // gameType 1 - means 1 player vs computer
  // gameType 2 - means 2 players
  selectGameType (num) {
    this.setState({gameType: num})
  }

  handleClick(i) {
    const newSquares = this.state.squares;
    const player = this.state.whoMoves;
    const gameType = this.state.gameType;

    // first select the gameType - player vs player, player vs computer
    if (!gameType) {
      alert('Please select type of game.');
      return
    }

    // no action if clicked on occupied square or we have a winner
    if (newSquares[i]) {
      return
    }

    if (this.state.winner) {
      alert('Game over! Winner is ' + this.state.winner);
      return
    }

    // if playing vs computer, wait for your turn
    if (player === 'O' && gameType === 1) {
      alert('Please wait for your turn!');
      return;
    }

    newSquares[i] = player;
    const winner = this.calculateWinner(newSquares);

    this.setState({
        whoMoves: player === 'X'? 'O' : 'X',
        squares: newSquares,
        winner: winner
    })

    // gameType === 1 means player vs computer
    if (!winner && gameType === 1) {
      this.computerMove(newSquares);
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
            break;
          }
        }
      }

      const winner = this.calculateWinner(squares);

      this.setState({
        squares: squares,
        whoMoves: 'X',
        winner: winner
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
    const gameTypeText = this.state.gameType === 1 ?
      'player vs computer' :
      this.state.gameType === 2? 'player vs player' : null;

    if (!this.state.gameType) {
      status = 'Please select type of game.'
    }
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h3' align='center' style={{flexGrow: 1}}>
              <Box textAlign="center">TicTacToe</Box>
            </Typography>
          </Toolbar>
        </AppBar>

        {/* only display at the start of the game*/}
        {!this.state.gameType &&
          <div className="GameType">
            <Button variant="contained" color='secondary'
              onClick= {() => this.selectGameType(2)}
              startIcon={<AccessibilityIcon/>}
              endIcon={<AccessibilityIcon/>}> vs </Button>
            <Button variant="contained" color='primary'
              onClick= {() => this.selectGameType(1)}
              startIcon={<AccessibilityIcon/>}
              endIcon={<ComputerIcon />}> vs </Button>
          </div>
        }

        <Typography variant='h5'>
          {gameTypeText &&
            <Box className='game-info' textAlign='center'>Game: {gameTypeText}</Box>}
          <Box className='game-info' textAlign="center">{status}</Box>
        </Typography>

        <div className='game'>
          <Board
            squares={this.state.squares}
            handleClick={(i)=> this.handleClick(i)}
          />
          <Button variant="contained" className="reset" onClick= {() => this.reset()}> Reset </Button>
        </div>

      </div>
    );
  }
}

export default App;
