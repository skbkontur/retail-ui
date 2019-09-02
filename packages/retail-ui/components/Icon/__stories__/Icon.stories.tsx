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

[...(Object.keys(Icons) as IconName[]).filter(name => !iconUpdates.some(update => update.includes(name))).sort()]
  .concat(...iconUpdates)
  .map(name => <TestIcon key={name} name={name} />)
  .reduce(
    ([head, ...tail]: JSX.Element[][], icon) =>
      head.length < 40 ? [[...head, icon], ...tail] : [[icon], head, ...tail],
    [[]],
  )
  .reverse()
  .reduce(
    (stories, icons, index) => stories.add(`Icons - ${index + 1}`, () => icons),
    storiesOf('Icon', module).addDecorator(story => <div style={rootStyle}>{story()}</div>),
  );
