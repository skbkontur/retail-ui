import { storiesOf } from '@storybook/react';
import React from 'react';

import { ThemeProvider } from 'styled-components';
import { mergeWithDefaultTheme } from '../../../themes/default';
import { getFlatTheme } from '../../../themes/flat';

import Gapped from '../../Gapped';
import Button from '../Button';

storiesOf('Button', module)
  .add('as link', () => <Button href="javascript:">I'm a link</Button>)
  .add('as button', () => <Button>And I'm a button</Button>)
  .add('disabled', () => (
    <Button disabled href="javascript:">
      disabled
    </Button>
  ))
  .add('different use', () => (
    <Gapped vertical>
      <Gapped>
        <Button>Default</Button>
        <Button use="success">Success</Button>
        <Button use="danger">Danger</Button>
        <Button use="primary">Grayed</Button>
        <Button use="pay">Pay</Button>
      </Gapped>
      <Gapped>
        <Button disabled>Default</Button>
        <Button disabled use="success">
          Success
        </Button>
        <Button disabled use="danger">
          Danger
        </Button>
        <Button disabled use="primary">
          Grayed
        </Button>
        <Button disabled use="pay">
          Pay
        </Button>
      </Gapped>
    </Gapped>
  ))
  .add('with theme', () => (
    <ThemeProvider theme={getFlatTheme()}>
      <Gapped vertical>
        <Gapped>
          <Button>Default</Button>
          <Button use="success">Success</Button>
          <Button use="danger">Danger</Button>
          <Button use="primary">Grayed</Button>
          <Button use="pay">Grayed</Button>
        </Gapped>
        <Gapped>
          <Button disabled>Default</Button>
          <Button disabled use="success">
            Success
          </Button>
          <Button disabled use="danger">
            Danger
          </Button>
          <Button disabled use="primary">
            Grayed
          </Button>
          <Button disabled use="pay">
            Grayed
          </Button>
        </Gapped>
      </Gapped>
    </ThemeProvider>
  ))
  .add('different size', () => (
    <Gapped>
      <Button>small</Button>
      <Button size="medium">medium</Button>
      <Button size="large">large</Button>
    </Gapped>
  ))
  .add('different size flat', () => (
    <ThemeProvider theme={getFlatTheme()}>
      <Gapped>
        <Button>small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </Gapped>
    </ThemeProvider>
  ))
  .add('baseline test', () => (
    <div>
      Do NOT press this <Button use="danger">button</Button>
    </div>
  ))
  .add('custom theme', () => (
    <ThemeProvider
      theme={mergeWithDefaultTheme({
        common: {
          disabledBackground: 'tomato'
        },
        button: {
          primary: {
            disabledBackground: 'green'
          }
        }
      })}
    >
      <Gapped>
        <Button disabled use="success">
          small
        </Button>
        <Button disabled size="medium">
          medium
        </Button>
        <Button disabled use="primary">
          large
        </Button>
      </Gapped>
    </ThemeProvider>
  ));
