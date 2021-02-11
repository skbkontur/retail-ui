import React from 'react';
import { mount } from 'enzyme';

import { FiasComboBox } from '../FiasComboBox';
import { delay } from '../../../../lib/utils';
import { Menu } from '../../../../internal/Menu';
import { FiasAddress } from '../../models/FiasAddress';
import { ComboBoxView } from '../../../../internal/CustomComboBox/ComboBoxView';

function searchFactory<T>(promise: Promise<T>): [jest.Mock<Promise<T>>, Promise<T>] {
  let searchCalled: () => void;
  const searchPromise = new Promise<T>(resolve => (searchCalled = async () => (await delay(0), resolve())));
  const search = jest.fn(() => (searchCalled(), promise));

  return [search, searchPromise];
}

describe('FiasComboBox', () => {
  it('renders', () => {
    mount<FiasComboBox>(<FiasComboBox getItems={() => Promise.resolve([])} />);
  });

  describe('highlighting of the search text', () => {
    const items = [
      FiasAddress.createFromResponse({
        city: {
          name: 'Екатеринбург \\^$*+?.()|[]{}',
          abbreviation: 'г',
          fiasId: '2763c110-cb8b-416a-9dac-ad28a55b4402',
          id: 'c2404c2a-0af3-440f-9320-9cbd160c4557',
        },
      }),
    ];
    const [search, promise] = searchFactory(Promise.resolve(items));
    const wrapper = mount<FiasComboBox>(<FiasComboBox getItems={search} renderItem={address => address.getText()} />);
    const setSearchQuery = async (searchQuery: string) => {
      wrapper.find('input').simulate('change', { target: { value: searchQuery } });
      await promise;
      await delay(0);
      wrapper.update();
    };

    beforeEach(async () => {
      wrapper.unmount();
      wrapper.mount();
      wrapper.find(ComboBoxView).prop('onFocus')?.();
      await promise;
      wrapper.update();
    });

    it("doesn't highlight an empty query", async () => {
      await setSearchQuery('');
      expect(wrapper.find(Menu).find('mark')).toHaveLength(0);
    });

    it('hightlight only the last match', async () => {
      await setSearchQuery('е');
      expect(wrapper.find(Menu).find('mark')).toHaveLength(1);
      expect(wrapper.find(Menu).containsMatchingElement(<mark>е</mark>)).toBe(true);
    });

    it.each([
      ['keeps uppercase letters', 'Ека'],
      ['escapes regexp spec chars', '\\^$*+?.()|[]{}'],
    ])('%s', async (title, searchQuery) => {
      await setSearchQuery(searchQuery);
      expect(wrapper.find(Menu).containsMatchingElement(<mark>{searchQuery}</mark>)).toBe(true);
    });
  });
});
