import React from 'react';

import type { Meta } from '../../../typings/stories';
import { Token } from '../Token';
import { Gapped } from '../../Gapped';

export default {
  title: 'Token',
  component: Token,
  decorators: [
    (Story: () => JSX.Element) => (
      <div className="token-test-container" style={{ margin: 40, padding: 4 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

export const Default = () => {
  return (
    <>
      <Token>test</Token>
      <Token isActive>test</Token>
    </>
  );
};
Default.storyName = 'default';

export const Size = () => {
  return (
    <Gapped vertical>
      <Token>Size: no size chosen</Token>
      <Token size="small">Size: small</Token>
      <Token size="medium">Size: medium</Token>
      <Token size="large">Size: large</Token>
    </Gapped>
  );
};
Size.storyName = 'size';

export const Disabled = () => {
  return (
    <>
      <Token disabled>test disabled 01</Token>
      <Token disabled>test disabled 02</Token>
    </>
  );
};
Disabled.storyName = 'disabled';

export const LongText = () => {
  return (
    <>
      <Token>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Token>
      <Token isActive>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Token>
    </>
  );
};
LongText.storyName = 'long text';

export const Validations = () => {
  return (
    <Gapped>
      <Token error>test</Token>
      <Token warning isActive>
        test
      </Token>
    </Gapped>
  );
};
Validations.storyName = 'validations';
