import React from 'react';
import { render } from 'enzyme';

import { Gapped } from '../';

describe('Gapped', () => {
  it("First child inside Gapped shouldn't contain margin-left", () => {
    const wrapper = render(
      <Gapped>
        {null}
        <div id="test-div-1" />
        <div id="test-div-2" />
      </Gapped>,
    );

    expect(
      wrapper
        .find('#test-div-1')
        .parent()
        .prop('style'),
    ).not.toContain('margin-left');
    expect(
      wrapper
        .find('#test-div-2')
        .parent()
        .prop('style'),
    ).toContain('margin-left');
  });
});
