import React from 'react';
import {shallow} from 'enzyme';
import Square from './Square';

it('renders without crashing', () => {
    shallow(<Square />);
});