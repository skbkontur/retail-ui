import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from 'retail-ui/build/components/Button';
// import { readdirSync } from 'fs';
import '../src/index';
import '../src/ReactDevtoolsHook';
import Input from 'retail-ui/build/components/Input';

storiesOf('Button', module)
  .add('with text', () => (
    <div>
      <Button>Hello Button</Button>
      <Input />
    </div>
  ))
  .add('with emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));
