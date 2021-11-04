import { mount } from 'enzyme';
import React from 'react';

import { LinkProps } from '..';
import { Link } from '../Link';

describe('Link', () => {
  describe('event `onClick`', () => {
    const setUp = (props?: LinkProps) => mount(<Link onClick={onClick} {...props} />);

    let onClick: jest.Mock<any, any>;
    beforeEach(() => {
      onClick = jest.fn();
    });

    it('calls `onClick` when link clicked', () => {
      const wrapper = setUp().find('a');
      wrapper.simulate('click');

      expect(onClick.mock.calls.length).toBe(1);
    });

    describe('prop `disabled`', () => {
      it('does not call `onClick` when disabled', () => {
        const wrapper = setUp({ disabled: true }).find('a');
        wrapper.simulate('click');

        expect(onClick.mock.calls.length).toBe(0);
      });
    });
  });

  describe('prop `external`', () => {
    const setUp = (props?: LinkProps) => mount(<Link external {...props} />);

    it('adds correct rel attribute', () => {
      const wrapper = setUp().find('a');

      expect(wrapper.prop('rel')).toBe('noopener noreferrer');
    });

    it('adds correct target attribute', () => {
      const wrapper = setUp().find('a');

      expect(wrapper.prop('target')).toBe('_blank');
    });

    describe("doesn't rewrite rel and target attributes defined by prop `external`", () => {
      it("doesn't rewrite rel attribute", () => {
        const wrapper = setUp({ target: '_self' }).find('a');

        expect(wrapper.prop('target')).toBe('_blank');
      });

      it("doesn't rewrite target attribute", () => {
        const wrapper = setUp({ rel: 'canonical' }).find('a');

        expect(wrapper.prop('rel')).toBe('noopener noreferrer');
      });
    });
  });

  describe('"rel" attribute', () => {
    const setUp = (props?: LinkProps) => mount(<Link {...props} />);

    it("doesn't change if defined in props", () => {
      const wrapper = setUp({ href: 'https://example.com', rel: 'nofollow' }).find('a');
      expect(wrapper.prop('rel')).toBe('nofollow');
    });

    it("doesn't get filled if there is no href", () => {
      const wrapper = setUp().find('a');
      expect(wrapper.prop('rel')).toBe(undefined);
    });

    describe('external hrefs', () => {
      it.each([['https://example.com:8080/home'], ['http://example.com'], ['//example.com/'], ['HTTP://EXAMPLE.COM']])(
        '%s',
        (href) => {
          const wrapper = setUp({ href: href }).find('a');
          expect(wrapper.prop('rel')).toBe('noopener noreferrer');
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
        const wrapper = setUp({ href: href }).find('a');
        expect(wrapper.prop('rel')).toBe('noopener');
      });
    });
  });
});
