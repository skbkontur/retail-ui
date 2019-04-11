// tslint:disable:jsx-no-lambda

import { mount } from 'enzyme';
import * as React from 'react';
import Tabs from '../Tabs';
import Indicator from '../Indicator';

describe('Tabs', () => {
  describe('Indicator', () => {
    const FunctionTabComponent = () => <div />;
    it('Should correct getStyles from FunctionComponent', () => {
      const wrapper = mount(
        <Tabs value="0">
          <Tabs.Tab id="0" component={FunctionTabComponent} />
        </Tabs>,
      );

      expect(wrapper.find(Indicator).instance().state).toMatchObject({ styles: { top: -3, left: 0 } });
    });
  });
});
