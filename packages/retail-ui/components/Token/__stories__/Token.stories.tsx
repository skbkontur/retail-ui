// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Token, { TokenColors } from '../Token';
import Gapped from '../../Gapped/Gapped';

// Color name string is passed as Token child (See `colored` story)
// The map keeps old names to pass in story, which prevents screenshot tests failure.
// Can be removed after customization release.
const newToDeprecatedColorNamesMap: { [key: string]: string } = {
  defaultIdle: 'i-default',
  defaultActive: 'a-default',
  grayIdle: 'l-gray',
  blueIdle: 'l-blue',
  grayActive: 'd-gray',
  blueActive: 'd-blue',
  greenIdle: 'l-green',
  greenActive: 'd-green',
  yellowIdle: 'l-yellow',
  yellowActive: 'd-yellow',
  redIdle: 'l-red',
  redActive: 'd-red',
};

const FixedWidthDecorator = (storyFn: any) => (
  <div className="token-test-container" style={{ margin: 40, padding: 4 }}>
    {storyFn()}
  </div>
);

// tslint:disable jsx-no-lambda
storiesOf('Token', module)
  .addDecorator(FixedWidthDecorator)
  .add('default', () => {
    return (
      <>
        <Token>test</Token>
        <Token isActive>test</Token>
      </>
    );
  })
  .add('long text', () => {
    return (
      <>
        <Token>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Token>
        <Token isActive>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Token>
      </>
    );
  })
  .add('colored', () => {
    const gray: TokenColors = { idle: 'grayIdle' };
    const blue: TokenColors = { idle: 'blueIdle' };
    const red: TokenColors = { idle: 'redIdle' };
    const green: TokenColors = { idle: 'greenIdle' };
    const yellow: TokenColors = { idle: 'yellowIdle' };

    const d_gray: TokenColors = { idle: 'grayActive' };
    const d_blue: TokenColors = { idle: 'blueActive' };
    const d_red: TokenColors = { idle: 'redActive' };
    const d_green: TokenColors = { idle: 'greenActive' };
    const d_yellow: TokenColors = { idle: 'yellowActive' };

    const a_default: TokenColors = { idle: 'defaultActive' };
    const i_default: TokenColors = { idle: 'defaultIdle' };

    const black: TokenColors = { idle: 'black', active: 'greenActive' };
    const white: TokenColors = { idle: 'white' };

    const default_colors = [i_default, a_default];
    const l_colors = [gray, red, green, blue, yellow, white];
    const d_colors = [d_gray, d_red, d_green, d_blue, d_yellow, black];

    return (
      <>
        <Gapped vertical={true}>
          <Gapped>
            {default_colors.map(c => (
              <Token colors={c}>{newToDeprecatedColorNamesMap[c.idle] || c.idle}</Token>
            ))}
          </Gapped>
          <Gapped>
            {l_colors.map(c => (
              <Token colors={c}>{newToDeprecatedColorNamesMap[c.idle] || c.idle}</Token>
            ))}
          </Gapped>
          <Gapped>
            {d_colors.map(c => (
              <Token colors={c}>{newToDeprecatedColorNamesMap[c.idle] || c.idle}</Token>
            ))}
          </Gapped>
        </Gapped>
      </>
    );
  })
  .add('validations', () => {
    return (
      <>
        <Token error={true}>test</Token>
        <Token warning={true} isActive>
          test
        </Token>
      </>
    );
  });
