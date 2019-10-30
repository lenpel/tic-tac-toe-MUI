import React from 'react';
import {shallow} from 'enzyme';
import Board from './Board';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const board = shallow(<Board />);
const wrapper = mount(<Board />);

describe("when rendering the app", () => {
  // it('renders without crashing', () => {
  //   shallow(<Board />);
  // });

  // it("initializes the board state with null", () => {
  //   expect(board.state().squares).toEqual([
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null,
  //     null
  //   ]);
  // });
  it("initializes the state with X's turn to play to true", () => {
    expect(board.state().whoMoves).toEqual('X');
  });

  // it("should render the the Current Player div", () => {
  //   expect(board.find(".currentPlayer").exists()).toBeTruthy();
  // });

  // it("the board should contain 3 rows", () => {
  //   expect(board.find(".row").length).toEqual(3);
  // });

  // it("should render all the slots for the board", () => {
  //   expect(board.find(".squareinit").exists()).toBeTruthy();
  // });

  // it("should have nine squares", () => {
  //   const board = mount(<Board squares={Array(9).fill(null)} />);

  //   expect(board.find("#squareDiv").length).toEqual(9);
  // });
});