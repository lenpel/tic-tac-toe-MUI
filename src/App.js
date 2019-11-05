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
  // gameType 3 - means computer vs computer
  selectGameType (num) {
    this.setState({gameType: num})
  }

  componentDidUpdate() {
    // handle case for bot vs. bot
    // and for case bot vs player - if it's bot's turn
    if (this.state.gameType === 3 || (this.state.gameType === 1 && this.state.whoMoves === 'O')) {
      this.computerMove(this.state.squares, this.state.whoMoves);
    }
  }

  handleClick(i) {
    const newSquares = this.state.squares;
    const player = this.state.whoMoves;
    const gameType = this.state.gameType;

    // no action without first selecting the gameType
    if (!gameType) {
      alert('Please select type of game.');
      return
    }

    // no action if gameType = 3 (computer vs computer)
    if (gameType === 3) {
      alert('Game for 2 bots. Just watch.');
      return
    }

    // no action if game over
    if (this.state.winner) {
      alert('Game over! Winner is ' + this.state.winner);
      return
    }

    // no action if clicked on occupied square
    if (newSquares[i]) {
      return
    }

    // no action if it's not player's turn
    if (player === 'O' && gameType === 1) {
      alert('Please wait for your turn!');
      return;
    }

    // places a mark, check winner, change turns
    newSquares[i] = player;
    const winner = this.calculateWinner(newSquares);
    const nextPlayer = player === 'X'? 'O' : 'X';

    this.setState({
        whoMoves: nextPlayer,
        squares: newSquares,
        winner: winner
    })
  }

  computerMove(squares, player) {
    let newSquares = squares;
    const isEmtpySpot = newSquares.some(el => el === null);

    // no move if game over or no empty spots available
    if (this.state.winner || !isEmtpySpot) {
      return
    }

    // select indexes with empty squares
    let emptySquares = [];
    newSquares.forEach((el, index) => el === null ? emptySquares.push(index) : null)

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * emptySquares.length);
      newSquares[emptySquares[randomIndex]] = player;

      const winner = this.calculateWinner(newSquares);
      const nextPlayer = player === 'X'? 'O' : 'X';

      this.setState({
        squares: newSquares,
        whoMoves: nextPlayer,
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
      this.state.gameType === 2? 'player vs player' :
      this.state.gameType === 3? 'bot vs bot' : null;

    if (!gameTypeText) {
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
            <Button variant="contained" color='default'
              onClick= {() => this.selectGameType(3)}
              startIcon={<ComputerIcon/>}
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
