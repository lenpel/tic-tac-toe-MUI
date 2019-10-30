import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('TicTacToe game', () => {
  const app = mount(<App />);

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('evaluate scenario 2', () => {
    const testSquares = [
      "X", null, null,
      "X", "O", null,
      "X", null, "O"
    ];
    expect(app.instance().calculateWinner(testSquares)).toEqual('X')
  });

  it('evaluate scenario 3', () => {
    const testSquares = [
      "X", null, "X",
      "O", "O", "O",
      "X", null, "O"
    ];
    expect(app.instance().calculateWinner(testSquares)).toEqual('O')
  });

  it('evaluate scenario 4', () => {
    const testSquares = [
      "X", null, null,
      "O", "X", null,
      "O", null, "X"
    ];
    expect(app.instance().calculateWinner(testSquares)).toEqual('X')
  });

  it('evaluate scenario 5', () => {
    const testSquares = [
      "X", "O", "X",
      "O", "O", "X",
      "X", "X", "O"
    ];
    const winner = app.instance().calculateWinner(testSquares);
    const isEmtpySpot = testSquares.some(el => el === null);

    expect(winner).toEqual(null);
    expect(isEmtpySpot).toEqual(false);
  });

  it("initializes the game with X's turn to play", () => {
    expect(app.state().whoMoves).toEqual("X");
  });
})
