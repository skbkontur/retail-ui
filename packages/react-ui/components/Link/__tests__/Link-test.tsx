import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LinkProps } from '..';
import { Link, LinkDataTids } from '../Link';

const renderRTL = (props?: LinkProps) => render(<Link {...props} />);

describe('Link', () => {
  it('calls `onClick` when link clicked', () => {
    const onClick = jest.fn();

    renderRTL({ onClick });
    userEvent.click(screen.getByTestId(LinkDataTids.root));
    expect(onClick).toHaveBeenCalled();
  });

  describe('disabled link', () => {
    it('does not call `onClick` when link clicked', () => {
      const onClick = jest.fn();

      renderRTL({ onClick, disabled: true });

      const linkElement = screen.getByTestId(LinkDataTids.root);
      linkElement.style.pointerEvents = 'auto';
      userEvent.click(linkElement);

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('does not call `onClick` when Enter pressed', () => {
      const onClick = jest.fn();

      renderRTL({ onClick, disabled: true });
      userEvent.type(screen.getByTestId(LinkDataTids.root), '{enter}');
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe('"rel" attribute', () => {
    it("doesn't change if defined in props", () => {
      renderRTL({ href: 'https://example.com', rel: 'nofollow' });

      expect(screen.getByTestId(LinkDataTids.root)).toHaveProperty('rel', 'nofollow');
    });

    it("doesn't get filled if there is no href", () => {
      renderRTL();
      screen.debug();
      expect(screen.getByTestId(LinkDataTids.root)).toHaveProperty('rel', '');
    });

    describe('external hrefs', () => {
      it.each([['https://example.com:8080/home'], ['http://example.com'], ['//example.com/'], ['HTTP://EXAMPLE.COM']])(
        '%s',
        (href) => {
          renderRTL({ href });
          expect(screen.getByTestId(LinkDataTids.root)).toHaveProperty('rel', 'noopener noreferrer');
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
        renderRTL({ href });
        expect(screen.getByTestId(LinkDataTids.root)).toHaveProperty('rel', 'noopener');
      });
    });
  });
});
