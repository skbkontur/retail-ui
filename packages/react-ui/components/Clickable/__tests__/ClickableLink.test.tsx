import React from 'react';
import { render, screen } from '@testing-library/react';

import { Clickable, ClickableDataTids } from '../Clickable';

describe('ClickableLink', () => {
  it('should render <a> tag', () => {
    render(
      <Clickable href="/" as="a">
        link
      </Clickable>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  describe('"rel" attribute', () => {
    it("doesn't change if defined in props", () => {
      render(<Clickable as="a" href="https://example.com" rel="nofollow" />);

      expect(screen.getByTestId(ClickableDataTids.root)).toHaveProperty('rel', 'nofollow');
    });

    it("doesn't get filled if there is no href", () => {
      render(<Clickable as="a" />);

      expect(screen.getByTestId(ClickableDataTids.root)).toHaveProperty('rel', '');
    });

    describe('external hrefs', () => {
      it.each([['https://example.com:8080/home'], ['http://example.com'], ['//example.com/'], ['HTTP://EXAMPLE.COM']])(
        '%s',
        (href) => {
          render(<Clickable as="a" href={href} />);

          expect(screen.getByTestId(ClickableDataTids.root)).toHaveProperty('rel', 'noopener noreferrer');
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
        render(<Clickable as="a" href={href} />);

        expect(screen.getByTestId(ClickableDataTids.root)).toHaveProperty('rel', 'noopener');
      });
    });
  });
});
