import React from 'react';
import { mount } from 'enzyme';

// import { delay } from '../../../lib/utils';
import { Loader } from '../Loader';
import { delay } from '../../../lib/utils';

describe('Loader', () => {
  it('without delay', async () => {
    const loader = mount<Loader>(<Loader />);

    expect(loader.instance().state).toMatchObject({
      isSpinnerVisible: false,
      isStickySpinner: false,
      needShowSpinnerMinimalTime: false,
    });

    loader.setProps({ active: true, delayBeforeSpinnerShow: 1000 });

    await delay(1001);

    expect(loader.instance().state).toMatchObject({
      isSpinnerVisible: true,
      isStickySpinner: false,
      needShowSpinnerMinimalTime: true,
    });
  });
});
