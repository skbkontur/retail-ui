// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Token, { TokenColors } from '../Token';
import Gapped from '../../Gapped/Gapped';

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
    const gray: TokenColors = { idle: 'l-gray' };
    const blue: TokenColors = { idle: 'l-blue' };
    const red: TokenColors = { idle: 'l-red' };
    const green: TokenColors = { idle: 'l-green' };
    const yellow: TokenColors = { idle: 'l-yellow' };

    const d_gray: TokenColors = { idle: 'd-gray' };
    const d_blue: TokenColors = { idle: 'd-blue' };
    const d_red: TokenColors = { idle: 'd-red' };
    const d_green: TokenColors = { idle: 'd-green' };
    const d_yellow: TokenColors = { idle: 'd-yellow' };

    const a_default: TokenColors = { idle: 'a-default' };
    const i_default: TokenColors = { idle: 'i-default' };

    const black: TokenColors = { idle: 'black', active: 'd-green' };
    const white: TokenColors = { idle: 'white' };

    const default_colors = [i_default, a_default];
    const l_colors = [gray, red, green, blue, yellow, white];
    const d_colors = [d_gray, d_red, d_green, d_blue, d_yellow, black];

    return (
      <>
        <Gapped vertical={true}>
          <Gapped>
            {default_colors.map(c => (
              <Token colors={c}>{c.idle}</Token>
            ))}
          </Gapped>
          <Gapped>
            {l_colors.map(c => (
              <Token colors={c}>{c.idle}</Token>
            ))}
          </Gapped>
          <Gapped>
            {d_colors.map(c => (
              <Token colors={c}>{c.idle}</Token>
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
