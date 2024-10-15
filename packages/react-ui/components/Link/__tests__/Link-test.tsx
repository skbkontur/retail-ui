import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LinkProps } from '..';
import { Link, LinkDataTids } from '../Link';

const renderRTL = (props?: LinkProps) => render(<Link {...props} />);

describe('Link', () => {
  it('calls `onClick` when link clicked', async () => {
    const onClick = jest.fn();

    renderRTL({ onClick });
    await userEvent.click(screen.getByTestId(LinkDataTids.root));
    expect(onClick).toHaveBeenCalled();
  });

  describe('disabled link', () => {
    it('does not call `onClick` when link clicked', async () => {
      const onClick = jest.fn();

      renderRTL({ onClick, disabled: true });

      const linkElement = screen.getByTestId(LinkDataTids.root);
      fireEvent.click(linkElement);

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('does not call `onClick` when Enter pressed', async () => {
      const onClick = jest.fn();

      renderRTL({ onClick, disabled: true });
      fireEvent.keyDown(screen.getByTestId(LinkDataTids.root), { key: 'Enter', code: 'Enter' });
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

  describe('a11y', () => {
    it('sets value for aria-label attribute', () => {
      const ariaLabel = 'aria-label';
      render(<Link aria-label={ariaLabel} href="" />);

      expect(screen.getByTestId(LinkDataTids.root)).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('with component prop', () => {
    it('should render <a> tag when omitted', () => {
      renderRTL({ href: 'https://kontur.ru' });

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should render <button> tag', () => {
      render(<Link component="button">Link as button</Link>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it.each([{ disabled: true }, { loading: true }])(`shouldn't be focusable when %p`, (prop) => {
      render(
        <Link component="button" {...prop}>
          Button Link
        </Link>,
      );

      userEvent.tab();
      expect(screen.getByRole('button')).not.toHaveFocus();
    });

    it(`should have correct tabIndex`, () => {
      render(
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        <Link component="button" tabIndex={1}>
          Button Link
        </Link>,
      );

      expect(screen.getByRole('button')).toHaveAttribute('tabindex', '1');
    });
  });
});
