import React, { useState } from 'react';

import type { Meta, Story } from '../../../typings/stories';
import { Checkbox } from '../Checkbox';
import { Gapped } from '../../Gapped';
import type { Nullable } from '../../../typings/utility-types';
import type { SizeProp } from '../../../lib/types/props';

interface PlainCheckboxState {
  checked: false;
  size?: SizeProp;
}
class PlainCheckbox extends React.Component<React.PropsWithChildren> {
  public state: PlainCheckboxState = {
    checked: false,
  };

  public render() {
    const { checked, size } = this.state;
    return (
      <Checkbox
        onValueChange={() => this.setState({ checked: !checked })}
        checked={checked}
        size={size}
        data-tid="test-checkbox"
      >
        {this.props.children}
      </Checkbox>
    );
  }
}

interface IndeterminatePlaygroundState {
  checked: boolean;
}

class IndeterminatePlayground extends React.Component<React.PropsWithChildren> {
  public state: IndeterminatePlaygroundState = {
    checked: false,
  };

  private checkbox: Checkbox | null = null;

  public render() {
    return (
      <div>
        <span style={{ display: 'inline-block', padding: 4 }} id="screenshot-capture">
          <Checkbox
            onValueChange={(checked) => this.setState({ checked })}
            checked={this.state.checked}
            initialIndeterminate
            ref={this.checkboxRef}
          >
            {this.props.children}
          </Checkbox>
        </span>
        <div>
          <button tabIndex={-1} onClick={this.setIndeterminate}>
            setIndeterminate
          </button>
          <button tabIndex={-1} onClick={this.resetIndeterminate}>
            resetIndeterminate
          </button>
          <button tabIndex={-1} onClick={this.changeValue}>
            changeValue
          </button>
        </div>
      </div>
    );
  }

  private checkboxRef = (element: Checkbox) => {
    this.checkbox = element;
  };

  private setIndeterminate = () => {
    if (this.checkbox) {
      this.checkbox.setIndeterminate();
    }
  };

  private resetIndeterminate = () => {
    if (this.checkbox) {
      this.checkbox.resetIndeterminate();
    }
  };

  private changeValue = () => {
    this.setState((state: IndeterminatePlaygroundState) => ({
      checked: !state.checked,
    }));
  };
}

export default { title: 'Checkbox' } as Meta;

export const Plain: Story = () => <PlainCheckbox>Plain checkbox</PlainCheckbox>;
Plain.storyName = 'plain';

export const Unchecked = () => <Checkbox>Unchecked</Checkbox>;
Unchecked.storyName = 'unchecked';
Unchecked.parameters = { creevey: { skip: true } };

export const Checked = () => (
  <Checkbox checked data-tid="test-checkbox">
    Checked
  </Checkbox>
);
Checked.storyName = 'checked';

export const Disabled = () => <Checkbox disabled>Disabled</Checkbox>;
Disabled.storyName = 'disabled';

export const DisabledChecked = () => (
  <Checkbox disabled checked>
    Disabled and checked
  </Checkbox>
);
DisabledChecked.storyName = 'disabled checked';

export const Error = () => (
  <Gapped vertical>
    <Checkbox error>Error</Checkbox>
    <Checkbox error disabled>
      Error and Disabled
    </Checkbox>
  </Gapped>
);
Error.storyName = 'error';

export const WithMouseEnterLeaveHandlers = () => (
  <Checkbox onMouseEnter={() => console.count('enter')} onMouseLeave={() => console.count('leave')}>
    Hover me
  </Checkbox>
);
WithMouseEnterLeaveHandlers.storyName = 'with mouse enter/leave handlers';
WithMouseEnterLeaveHandlers.parameters = { creevey: { skip: true } };

export const WithALongLabel = () => (
  <div>
    Lorem ipsum dolor --{' '}
    <PlainCheckbox>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </PlainCheckbox>{' '}
    -- Lorem ipsum dolor.
  </div>
);
WithALongLabel.storyName = 'with a long label';

export const WithoutLabel = () => (
  <div>
    <div>
      Some text <Checkbox />
    </div>
    <div>
      Some text <Checkbox>Label</Checkbox>
    </div>
  </div>
);
WithoutLabel.storyName = 'without label';

export const ProgrammaticFocus = () => {
  let checkbox: Nullable<Checkbox>;

  function focus() {
    if (checkbox) {
      checkbox.focus();
    }
  }

  function blur() {
    if (checkbox) {
      checkbox.blur();
    }
  }

  return (
    <div>
      <Checkbox ref={(el) => (checkbox = el)}>Label</Checkbox>
      <Gapped>
        <button onClick={focus}>Focus</button>
        <button onClick={blur}>Blur</button>
      </Gapped>
    </div>
  );
};
ProgrammaticFocus.storyName = 'programmatic focus';
ProgrammaticFocus.parameters = { creevey: { skip: true } };

export const Indeterminate: Story = () => <IndeterminatePlayground>Label</IndeterminatePlayground>;
Indeterminate.storyName = 'indeterminate';

export const Highlighted: Story = () => {
  return (
    <div style={{ margin: 5 }}>
      <Gapped gap={5} vertical>
        <Checkbox checked>Highlighted default</Checkbox>
        <Checkbox checked warning>
          Highlighted warning
        </Checkbox>
        <Checkbox checked error>
          Highlighted error
        </Checkbox>
      </Gapped>
    </div>
  );
};
Highlighted.storyName = 'highlighted';

export const CheckboxLabelSelectionWithPressedShift: Story = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox checked={checked} onValueChange={setChecked}>
      caption
    </Checkbox>
  );
};
CheckboxLabelSelectionWithPressedShift.storyName = 'checkbox label selection with pressed shift';

export const Size: Story = () => {
  return (
    <div>
      <Gapped vertical>
        <Checkbox size={'small'}>Size: small</Checkbox>
        <Checkbox size={'medium'}>Size: medium</Checkbox>
        <Checkbox size={'large'}>Size: large</Checkbox>
      </Gapped>
    </div>
  );
};
Size.storyName = 'size';
