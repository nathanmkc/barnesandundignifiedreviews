import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from './mockReviews.js';

import App from '../src/App.jsx';

Enzyme.configure({ adapter: new Adapter()});

var mock = new MockAdapter(axios);
mock.onGet('http://localhost:8000/books/4132539681597/reviews').reply(200, mockData);
mock.onPut('http://localhost:8000/books/4132539681597/review/1234').reply(200);

describe('App component', () => {
  test('renders', () => {
    const wrapper = mount(<App />);

    expect(wrapper.exists()).toBe(true);
  });
  test('renders 1 main element', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find('.main')).toHaveLength(1);
  });
  test('axios request is properly called and state is set', () => {
    const wrapper = mount(<App />);
    return wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        wrapper.update();
        expect(wrapper.state()).toHaveProperty('endIndex', 8);
        expect(wrapper.find('.review-box')).toHaveLength(8);
      });
  });
  test('voteClickHandler properly updates state to disable further votes', () => {
    const wrapper = mount(<App />);
    return wrapper
      .instance()
      .voteClickHandler('yes', 1234)
      .then(() => {
        wrapper.update();
        expect(wrapper.state()).toHaveProperty('1234', 'disabled');
      });
  });
  test('clicking left arrow while start index is 0 does not change state', () => {
    const wrapper = mount(<App />);
    return wrapper
      .instance()
      .componentDidMount()
      .then(() => {
        wrapper
        .instance()
        .leftArrowClickHandler()
        .then(() => {
          wrapper.update();
          expect(wrapper.state()).toHaveProperty('startIndex', 0);
        });
      });
  });
  test('clicking right arrow updates start and end indexes', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.rightArrowClickHandler()
      wrapper.update();
      expect(wrapper.state()).toHaveProperty('startIndex', 8);
      expect(wrapper.state()).toHaveProperty('endIndex', 16);
    });
  });
  test('clicking right arrow many times does not cause end index to exceed review count', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      wrapper.update();
      expect(wrapper.state()).toHaveProperty('endIndex', 27);
    });
  });
  test('clicking left arrow after right arrows properly sets indexes', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.rightArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      instance.leftArrowClickHandler();
      wrapper.update();
      expect(wrapper.state()).toHaveProperty('startIndex', 0);
      expect(wrapper.state()).toHaveProperty('endIndex', 8);
    });
  });
  test('handleSortMenuChange properly sorts by highest to lowest rating', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.handleSortMenuChange({preventDefault: () => {}, target: {innerHTML: 'Highest to Lowest Rating'}});
      wrapper.update();
      expect(wrapper.state().displayedReviews[0]).toHaveProperty('rating', 5);
    });
  });
  test('handleSortMenuChange properly sorts by lowest to highest rating', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.handleSortMenuChange({preventDefault: () => {}, target: {innerHTML: 'Lowest to Highest Rating'}});
      wrapper.update();
      expect(wrapper.state().displayedReviews[0]).toHaveProperty('rating', 1);
    });
  });
  test('handleSortMenuChange properly sorts by most helpful', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.handleSortMenuChange({preventDefault: () => {}, target: {innerHTML: 'Most Helpful'}});
      wrapper.update();
      expect(wrapper.state().displayedReviews[0]).toHaveProperty('helpfulYes', 100);
    });
  });
  test('handleSortMenuChange properly sorts by featured', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.handleSortMenuChange({preventDefault: () => {}, target: {innerHTML: 'Featured'}});
      wrapper.update();
      expect(wrapper.state().displayedReviews[0]).toHaveProperty('authorReviews', 78);
    });
  });
  test('handleSortMenuChange properly sorts by most recent', () => {
    const wrapper = mount(<App />);
    const instance = wrapper.instance();
    return instance.componentDidMount()
    .then(() => {
      instance.handleSortMenuChange({preventDefault: () => {}, target: {innerHTML: 'Most Recent'}});
      wrapper.update();
      expect(wrapper.state().displayedReviews[0]).toHaveProperty('createdAt', "2020-03-18T18:44:57.000Z");
    });
  });
});

