import { storiesOf } from '@storybook/react';
import React from 'react';

import Input from '../Input';

const Icon: React.SFC<{ name?: string }> = ({ name }) => <span>{name}</span>;
const styles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  minWidth: '90px',
  padding: '5px'
};

storiesOf('Input', module)
  .add('Inputs with different states', () => (
    <div>
      <div>
        <div style={styles}>Warning</div>
        <div id="warning-small-input-wrapper" style={styles}>
          <Input size="small" warning />
        </div>
        <div id="warning-large-input-wrapper" style={styles}>
          <Input size="large" warning />
        </div>
      </div>

      <div>
        <div style={styles}>Error</div>
        <div id="error-small-input-wrapper" style={styles}>
          <Input size="small" error />
        </div>
        <div id="error-large-input-wrapper" style={styles}>
          <Input size="large" error />
        </div>
      </div>

      <div>
        <div style={styles}>Disabled</div>
        <div id="disabled-small-input-wrapper" style={styles}>
          <Input size="small" disabled />
        </div>
        <div id="disabled-large-input-wrapper" style={styles}>
          <Input size="large" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>
          Disabled<br /> (with text)
        </div>
        <div id="disabled-text-small-input-wrapper" style={styles}>
          <Input size="small" value="Some text" disabled />
        </div>
        <div id="disabled-text-large-input-wrapper" style={styles}>
          <Input size="large" value="Some text" disabled />
        </div>
      </div>

      <div>
        <div style={styles}>Placeholder</div>
        <div id="placeholder-small-input-wrapper" style={styles}>
          <Input size="small" placeholder="Placeholder" />
        </div>
        <div id="placeholder-large-input-wrapper" style={styles}>
          <Input size="large" placeholder="Placeholder" />
        </div>
      </div>

      <div>
        <div style={styles}>Password</div>
        <div id="password-small-input-wrapper" style={styles}>
          <Input size="small" value="password" type="password" />
        </div>
        <div id="password-large-input-wrapper" style={styles}>
          <Input size="large" value="password" type="password" />
        </div>
      </div>

      <div>
        <div style={styles}>Borderless</div>
        <div id="borderless-small-input-wrapper" style={styles}>
          <Input size="small" borderless />
        </div>
        <div id="borderless-large-input-wrapper" style={styles}>
          <Input size="large" borderless />
        </div>
      </div>

      <div>
        <div style={styles}>Left icon</div>
        <div id="left-icon-small-input-wrapper" style={styles}>
          <Input size="small" leftIcon={<Icon name="🍿" />} />
        </div>
        <div id="left-icon-large-input-wrapper" style={styles}>
          <Input size="large" leftIcon={<Icon name="🚁" />} />
        </div>
      </div>

      <div>
        <div style={styles}>Right icon</div>
        <div id="right-icon-small-input-wrapper" style={styles}>
          <Input size="small" rightIcon={<Icon name="🚀" />} />
        </div>
        <div id="right-icon-large-input-wrapper" style={styles}>
          <Input size="large" disabled rightIcon={<Icon name="🚀" />} />
        </div>
      </div>
    </div>
  ))
  .add('Inputs with different sizes', () => (
    <div>
      <div id="small-input-wrapper" style={styles}>
        <Input size="small" />
      </div>
      <div id="medium-input-wrapper" style={styles}>
        <Input size="medium" />
      </div>
      <div id="large-input-wrapper" style={styles}>
        <Input size="large" />
      </div>
    </div>
  ));
