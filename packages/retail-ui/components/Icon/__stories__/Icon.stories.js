import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Icon from '../Icon';

const rootStyle: Partial<React.CSSProperties> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  width: '1000px'
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
            height: name === 'Space' ? '0' : '60px'
          }}
        >
          <div>
            <Icon name={name} /> <span>{name}</span>
          </div>
          <div>
            <span>{name.slice(0, name.length / 2)}</span> <Icon name={name} />{' '}
            <span>{name.slice(name.length / 2)}</span>
          </div>
          <div>
            <span>{name}</span> <Icon name={name} />
          </div>
        </div>
      ))}
  </div>
));
