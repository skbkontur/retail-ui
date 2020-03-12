import React from 'react';

import { Textarea } from '../Textarea';
import { Button } from '../../Button';

interface AutoresizableTextareaState {
  value: string | null;
}

class AutoresizableTextarea extends React.Component<{}, AutoresizableTextareaState> {
  public state = {
    value: '',
  };

  public render() {
    return (
      <div>
        <label htmlFor={'textarea'}>click me</label>
        <br />
        <Textarea
          spellCheck={false}
          autoResize
          id={'textarea'}
          placeholder={'type something'}
          resize={'vertical'}
          value={this.state.value}
          width={250}
          onValueChange={this.handleChange}
        />
      </div>
    );
  }

  private handleChange = (value: string | null) => {
    this.setState({ value });
  };
}

const TEXT_SAMPLE =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim voluptatum esse, id libero voluptas similique beatae, molestiae, impedit corrupti corporis asperiores odit ullam provident officia alias aperiam eum quas.';

export default { title: 'Textarea' };

export const DifferentStates = () => {
  const rowStyles = {
    display: 'flex',
    padding: 5,
  };

  const cellStyles = {
    padding: 5,
  };

  const headingStyles: React.CSSProperties = {
    width: 120,
    padding: 5,
    textAlign: 'right',
  };

  return (
    <div>
      <div style={rowStyles}>
        <div style={headingStyles}>Plain</div>
        <div id="TextareaPlain" style={cellStyles}>
          <Textarea />
        </div>
        <div id="TextareaPlainFilled" style={cellStyles}>
          <Textarea spellCheck={false} defaultValue={TEXT_SAMPLE} />
        </div>
      </div>
      <div style={rowStyles}>
        <div style={headingStyles}>Warning</div>
        <div id="TextareaWarning" style={cellStyles}>
          <Textarea warning />
        </div>
        <div id="TextareaWarningFilled" style={cellStyles}>
          <Textarea spellCheck={false} warning defaultValue={TEXT_SAMPLE} />
        </div>
      </div>
      <div style={rowStyles}>
        <div style={headingStyles}>Error</div>
        <div id="TextareaError" style={cellStyles}>
          <Textarea error />
        </div>
        <div id="TextareaErrorFilled" style={cellStyles}>
          <Textarea spellCheck={false} error defaultValue={TEXT_SAMPLE} />
        </div>
      </div>
      <div style={rowStyles}>
        <div style={headingStyles}>Disabled</div>
        <div id="TextareaDisabled" style={cellStyles}>
          <Textarea disabled />
        </div>
        <div id="TextareaDisabledFilled" style={cellStyles}>
          <Textarea spellCheck={false} disabled defaultValue={TEXT_SAMPLE} />
        </div>
      </div>
    </div>
  );
};
DifferentStates.story = { name: 'Different states' };

export const TextareaWithPlaceholder = () => (
  <div>
    <div id="TextareaWithPlaceholder" style={{ padding: 5 }}>
      <Textarea placeholder="Placeholder" />
    </div>
    <div id="TextareaWithLongPlaceholder" style={{ padding: 5 }}>
      <Textarea placeholder="Placeholder placeholder placeholder placeholder placeholder..." />
    </div>
  </div>
);
TextareaWithPlaceholder.story = { name: 'Textarea with placeholder' };

export const TextareaInInlineFlexAndText = () => (
  <div>
    <div style={{ display: 'inline-flex' }}>
      <Textarea spellCheck={false} value={TEXT_SAMPLE} />
    </div>
    Lorem text
  </div>
);
TextareaInInlineFlexAndText.story = { name: 'Textarea in inline-flex and text' };

export const AutoresizableTextareaStory = () => <AutoresizableTextarea />;
AutoresizableTextareaStory.story = { name: 'Autoresizable textarea' };

export const TextareaWithCustomWidth = () => <Textarea spellCheck={false} width={400} value={TEXT_SAMPLE} />;
TextareaWithCustomWidth.story = { name: 'Textarea with custom width' };

export const SelectAllByProp = () => <Textarea spellCheck={false} defaultValue={TEXT_SAMPLE} selectAllOnFocus />;
SelectAllByProp.story = { name: 'Select all by prop' };

export const SelectAllByButton = () => {
  let textarea: Textarea | null = null;
  const handleClick = () => {
    if (textarea) {
      textarea.selectAll();
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Select All</Button>
      <div>
        <Textarea
          spellCheck={false}
          defaultValue={TEXT_SAMPLE}
          ref={element => {
            textarea = element;
          }}
        />
      </div>
    </div>
  );
};
SelectAllByButton.story = { name: 'Select all by button' };
