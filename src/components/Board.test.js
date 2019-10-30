import React from 'react';
import {mount} from 'enzyme';
import Board from './Board';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Game board', () => {
  const empty = Array(9).fill(null);
  const board = mount(<Board squares={empty}/>);

  it('should be created', () => {
    expect(board).toBeDefined();
  });

  it("should have nine squares", () => {
    expect(board.find('button').length).toEqual(9);
  });
});
