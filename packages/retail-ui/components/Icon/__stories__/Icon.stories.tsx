import { storiesOf } from '@storybook/react';
import * as React from 'react';

import Icons, { IconName } from '@skbkontur/react-icons';

const rootStyle: Partial<React.CSSProperties> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  width: '1000px',
};

const iconUpdates: IconName[][] = [
  ['Delta', 'UserAdd', 'Youtube2'],
  ['UserLock', 'Viber', 'Viber2', 'WhatsApp', 'WhatsApp2', 'Spinner'],
];

interface TestIconProps {
  name: IconName;
}

class TestIcon extends React.Component<TestIconProps> {
  public render() {
    const { name } = this.props;
    const Icon = Icons[name];
    return (
      <div
        style={{
          flexBasis: '200px',
          height: name === 'Space' ? '0' : '60px',
        }}
      >
        <div>
          <Icon /> <span>{name}</span>
        </div>
        <div>
          <span>{name.slice(0, name.length / 2)}</span> <Icon /> <span>{name.slice(name.length / 2)}</span>
        </div>
        <div>
          <span>{name}</span> <Icon />
        </div>
      </div>
    );
  }
}

storiesOf('Icon', module).add('All icons', () => (
  <div style={rootStyle}>
    {(Object.keys(Icons) as IconName[])
      .filter(name => !iconUpdates.some(update => update.includes(name)))
      .sort()
      .map(name => (
        <TestIcon key={name} name={name} />
      ))}
    {iconUpdates.map(update => update.map(name => <TestIcon key={name} name={name} />))}
  </div>
));
