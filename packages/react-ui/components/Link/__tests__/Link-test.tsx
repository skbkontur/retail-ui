import { mount } from 'enzyme';
import React from 'react';

import { Link } from '../Link';
describe('', () => {
  it('calls `onClick`', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Link onClick={onClick} />);

    wrapper.find('a').simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });

  it('does not call `onClick` when disabled', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Link disabled onClick={onClick} />);

    wrapper.find('a').simulate('click');

    expect(onClick.mock.calls.length).toBe(0);
  });

  describe('"rel" attribute', () => {
    it("doesn't change if defined in props", () => {
      const wrapper = mount(<Link href="https://example.com" rel="nofollow" />);
      expect(wrapper.find('a').prop('rel')).toBe('nofollow');
    });

    it("doesn't get filled if there is no href", () => {
      const wrapper = mount(<Link />);
      expect(wrapper.find('a').prop('rel')).toBe(undefined);
    });

    describe('external hrefs', () => {
      it.each([['https://example.com:8080/home'], ['http://example.com'], ['//example.com/'], ['HTTP://EXAMPLE.COM']])(
        '%s',
        (href) => {
          const wrapper = mount(<Link href={href} />);
          expect(wrapper.find('a').prop('rel')).toBe('noopener noreferrer');
        },
      );
    });

    describe('internal hrefs', () => {
      it.each([
        [`https://${location.host}/home`],
        [`http://${location.host}`],
        [`//${location.host}`],
        ['/home'],
        ['/home?redirect=http://example.com'],
        ['../home'],
        ['page.html'],
        ['#anchor'],
      ])('%s', (href) => {
        const wrapper = mount(<Link href={href} />);
        expect(wrapper.find('a').prop('rel')).toBe('noopener');
      });
    });
  });
});
