import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon';

const rootStyle: Partial<React.CSSProperties> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  width: '1000px'
};

const iconStyle = {
  width: '14px',
  display: 'inline-block',
  margin: '5px'
};

storiesOf('Icon', module).add('All icons', () => (
  <div style={rootStyle}>
    {Icon.getAllNames()
      .sort()
      .map(name => (
        <div
          key={name}
          style={{
            flexBasis: '200px',
            height: name === 'Space' ? '0' : '30px'
          }}
        >
          <div style={iconStyle}>
            <Icon name={name} />
          </div>
          {name}
        </div>
      ))}
  </div>
));
