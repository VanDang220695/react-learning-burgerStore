import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/index';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);
  });
  it('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 }, totalPrice: 0 });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
