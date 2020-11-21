import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../src/App.jsx';

Enzyme.configure({ adapter: new Adapter()});

describe('App component', () => {
  test('renders', () => {
    const wrapper = mount(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});