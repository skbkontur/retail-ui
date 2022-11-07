import React from 'react';

import { Story } from '../../../typings/stories';
import { Switcher } from '../Switcher';
import { Gapped } from '../../Gapped';

interface ComponentProps {
  items: string[];
  error?: boolean;
}
class Component extends React.Component<ComponentProps> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <Switcher
        value={this.state.value}
        onValueChange={this.handleChange}
        caption={'Label for Switcher'}
        {...this.props}
      />
    );
  }

  private handleChange = (value: string) => {
    this.setState({ value });
  };
}

export default { title: 'Switcher' };

export const Horizontal: Story = () => {
  return <Component items={['One', 'Two', 'Three']} />;
};
Horizontal.storyName = 'horizontal';

export const Errored = () => {
  return <Component error items={['One', 'Two', 'Three']} />;
};
Errored.storyName = 'errored';
Errored.parameters = {
  creevey: {
    skip: {
      'story-skip-0': { in: ['chromeFlat8px'] },
    },
  },
};

export const Disabled = () => {
  return (
    <Gapped vertical>
      <Switcher disabled value={'One'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Two'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
      <Switcher disabled value={'Three'} caption={'Label for Switcher'} items={['One', 'Two', 'Three']} />
    </Gapped>
  );
};

Disabled.storyName = 'disabled';
Disabled.parameters = {
  creevey: {
    skip: {
      'story-skip-0': { in: ['chrome', 'chrome8px', 'chromeFlat8px', 'chromeDark'] },
    },
  },
};
