import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Icon, { IconName } from '../Icon';

const rootStyle: Partial<React.CSSProperties> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  width: '1000px'
};

const iconUpdates: IconName[][] = [['Delta', 'UserAdd', 'Youtube2']];

interface TestIconProps {
  name: IconName;
}

class TestIcon extends React.Component<TestIconProps> {
  public render() {
    const { name } = this.props;
    return (
      <div
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
    );
  }
}

storiesOf('Icon', module).add('All icons', () => (
  <div style={rootStyle}>
    {Icon.getAllNames()
      .filter(name => !iconUpdates.every(update => update.includes(name)))
      .sort()
      .map(name => (
        <TestIcon key={name} name={name} />
      ))}
    {iconUpdates.map(update =>
      update.map(name => <TestIcon key={name} name={name} />)
    )}
  </div>
));
