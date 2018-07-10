import { storiesOf } from '@storybook/react';
import React from 'react';

import { ThemeProvider } from 'styled-components';
import { mergeWithDefaultTheme } from '../../../themes/default';
import Link from '../Link';

storiesOf('Link', module)
  .add('as link', () => <Link href="javascript:">I'm a link</Link>)
  .add('as button', () => <Link>And I'm a button</Link>)
  .add('disabled', () => (
    <Link disabled href="javascript:">
      disabled
    </Link>
  ))
  .add('different use', () => (
    <div>
      <p>
        <Link>Default</Link>
      </p>
      <p>
        <Link use="success">Success</Link>
      </p>
      <p>
        <Link use="danger">Danger</Link>
      </p>
      <p>
        <Link use="grayed">Grayed</Link>
      </p>
    </div>
  ))
  .add('with theme', () => (
    <ThemeProvider
      theme={mergeWithDefaultTheme({ link: { default: { default: { color: 'hotpink' } } } })}
    >
      <Link>And I'm a button</Link>
    </ThemeProvider>
  ));
