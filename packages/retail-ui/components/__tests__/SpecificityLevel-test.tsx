import * as React from 'react';
import { mount } from 'enzyme';
import Upgrades from '../../lib/Upgrades';
Upgrades.setSpecificityLevel(1);
import MenuItem from '../MenuItem';

describe('specificityLevel', () => {
  it("doesn't brake components render", () => {
    mount(<MenuItem />);
  });
});
