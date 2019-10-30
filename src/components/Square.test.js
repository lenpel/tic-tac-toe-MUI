import React from 'react';
import {shallow} from 'enzyme';
import Square from './Square';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
it('renders without crashing', () => {
    shallow(<Square />);
});