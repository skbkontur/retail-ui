import * as React from 'react';
import { storiesOf } from '@storybook/react';

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
          onChange={this.handleChange}
        />
      </div>
    );
  }

  private handleChange = (_: any, value: string | null) => {
    this.setState({ value });
  };
}

const TEXT_SAMPLE =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim voluptatum esse, id libero voluptas similique beatae, molestiae, impedit corrupti corporis asperiores odit ullam provident officia alias aperiam eum quas.';

storiesOf('Textarea', module)
  .add('Different states', () => {
    const rowStyles = {
      display: 'flex',
      padding: 5,
    };

    const cellStyles = {
      padding: 5,
    };

    const headingStyles = {
      width: 120,
      padding: 5,
      textAlign: 'right' as 'right',
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
  })
  .add('Textarea with placeholder', () => (
    <div>
      <div id="TextareaWithPlaceholder" style={{ padding: 5 }}>
        <Textarea placeholder="Placeholder" />
      </div>
      <div id="TextareaWithLongPlaceholder" style={{ padding: 5 }}>
        <Textarea placeholder="Placeholder placeholder placeholder placeholder placeholder..." />
      </div>
    </div>
  ))
  .add('Textarea in inline-flex and text', () => (
    <div>
      <div style={{ display: 'inline-flex' }}>
        <Textarea spellCheck={false} value={TEXT_SAMPLE} />
      </div>
      Lorem text
    </div>
  ))
  .add('Autoresizable textarea', () => <AutoresizableTextarea />)
  .add('Textarea with custom width', () => <Textarea spellCheck={false} width={400} value={TEXT_SAMPLE} />)
  .add('Select all by prop', () => <Textarea spellCheck={false} defaultValue={TEXT_SAMPLE} selectAllOnFocus />)
  .add('Select all by button', () => {
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
  });
