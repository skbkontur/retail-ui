import React from 'react';

import { Story } from '../../../typings/stories';
import { Textarea } from '../Textarea';
import { Button } from '../../Button';
import { Gapped } from '../../Gapped';

const TEXT_SAMPLE =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim voluptatum esse, id libero voluptas similique beatae, molestiae, impedit corrupti corporis asperiores odit ullam provident officia alias aperiam eum quas.';

interface AutoresizableTextareaState {
  value: string;
  maxRows: number;
}

class AutoresizableTextarea extends React.Component {
  public state: AutoresizableTextareaState = {
    value: '',
    maxRows: 5,
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
          rows={4}
          onFocus={this.handleFocus}
          maxRows={this.state.maxRows}
          data-tid={'TextArea'}
        />
        <Button
          data-tid={'AddButton'}
          onClick={() => {
            this.setState({ value: TEXT_SAMPLE });
          }}
        >
          add text
        </Button>
        <Button
          data-tid={'CollapseButton'}
          onClick={() => {
            this.setState({ maxRows: 3 });
          }}
        >
          collapse
        </Button>
      </div>
    );
  }
  private handleChange = (value: string | null) => {
    this.setState({ value });
  };

  private handleFocus = () => {
    this.setState({ maxRows: 5 });
  };
}

export default { title: 'Textarea' };

export const DifferentStates: Story = () => {
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
      <div style={rowStyles}>
        <div style={headingStyles}>Disabled with Error</div>
        <div id="TextareaDisabledError" style={cellStyles}>
          <Textarea disabled error />
        </div>
        <div id="TextareaDisabledErrorFilled" style={cellStyles}>
          <Textarea spellCheck={false} disabled error defaultValue={TEXT_SAMPLE} />
        </div>
      </div>
    </div>
  );
};
DifferentStates.storyName = 'Different states';

DifferentStates.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focus() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#TextareaPlain textarea' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
      },
      async FocusedByTab() {
        await this.browser
          .actions({
            bridge: true,
          })
          .move({ x: 0, y: 0 })
          .click()
          .sendKeys(this.keys.TAB)
          .sendKeys(this.keys.TAB)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused by tab');
      },
      async Typed() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#TextareaPlain textarea' }))
          .sendKeys('Test...')
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Typed');
      },
    },
  },
};

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
TextareaWithPlaceholder.storyName = 'Textarea with placeholder';

export const TextareaInInlineFlexAndText = () => (
  <div>
    <div style={{ display: 'inline-flex' }}>
      <Textarea spellCheck={false} value={TEXT_SAMPLE} />
    </div>
    Lorem text
  </div>
);
TextareaInInlineFlexAndText.storyName = 'Textarea in inline-flex and text';
TextareaInInlineFlexAndText.parameters = { creevey: { skip: [true] } };

export const AutoresizableTextareaStory: Story = () => <AutoresizableTextarea />;
AutoresizableTextareaStory.storyName = 'Autoresizable textarea';
AutoresizableTextareaStory.parameters = {
  creevey: {
    tests: {
      async autoresize() {
        const textArea = () => this.browser.findElement({ css: '[data-tid~="TextArea"]' });

        const before = await textArea().takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="AddButton"]' }))
          .pause(500)
          .perform();

        const addText = await textArea().takeScreenshot();

        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-tid~="CollapseButton"]' }))
          .pause(500)
          .perform();

        const collapse = await textArea().takeScreenshot();

        await this.expect({ before, addText, collapse }).to.matchImages();
      },
    },
  },
};

export const TextareaWithCustomWidth = () => <Textarea spellCheck={false} width={400} value={TEXT_SAMPLE} />;
TextareaWithCustomWidth.storyName = 'Textarea with custom width';

export const TextareaInsideGapped = () => (
  <Gapped gap={10}>
    <Textarea spellCheck={false} width={400} value={TEXT_SAMPLE} />
  </Gapped>
);
TextareaInsideGapped.storyName = 'Textarea inside Gapped';

export const SelectAllByProp: Story = () => <Textarea spellCheck={false} defaultValue={TEXT_SAMPLE} selectAllOnFocus />;
SelectAllByProp.storyName = 'Select all by prop';

SelectAllByProp.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focused() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'label' }))
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focused');
      },
    },
  },
};

export const SelectAllByButton: Story = () => {
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
          ref={(element) => {
            textarea = element;
          }}
        />
      </div>
    </div>
  );
};
SelectAllByButton.storyName = 'Select all by button';

SelectAllByButton.parameters = {
  creevey: {
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Selected() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: 'button' }))
          .pause(500)
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Selected');
      },
    },
  },
};

export const TextareaWithCounters: Story = () => {
  const blockStyle = {
    padding: 5,
    width: '100%',
  };

  const headingStyle = {
    padding: 5,
  };

  return (
    <div style={{ width: 550 }}>
      <div style={headingStyle}>Plain</div>
      <div id="CounterPlain" style={blockStyle}>
        <Textarea
          value={TEXT_SAMPLE.split('').join(' ')}
          width={400}
          lengthCounter={700}
          showLengthCounter
          spellCheck={false}
        />
      </div>

      <div style={headingStyle}>Autoresize</div>
      <div id="CounterAutoresizeTextarea" style={blockStyle}>
        <Textarea value={TEXT_SAMPLE} width={400} lengthCounter={50} autoResize showLengthCounter spellCheck={false} />
      </div>

      <div style={headingStyle}>Disabled</div>
      <div id="CounterDisabled" style={blockStyle}>
        <Textarea value={TEXT_SAMPLE} width={400} maxLength={50} disabled showLengthCounter spellCheck={false} />
      </div>

      <div style={headingStyle}>With help</div>
      <div id="CounterWithHelp" style={blockStyle}>
        <Textarea
          value={TEXT_SAMPLE}
          width={400}
          maxLength={50}
          showLengthCounter
          counterHelp={'test'}
          spellCheck={false}
        />
      </div>
    </div>
  );
};
TextareaWithCounters.storyName = 'Textarea with length counter';

TextareaWithCounters.parameters = {
  creevey: {
    skip: [
      {
        in: ['firefox', 'firefox8px', 'firefoxFlat8px', 'firefoxDark'],
        reason: 'flacky scrollbars height',
      },
    ],
    tests: {
      async Plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('Plain');
      },
      async Focus() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#CounterPlain textarea' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('Focus');
      },
      async FocusAutoresize() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#CounterAutoresizeTextarea textarea' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('FocusAutoresize');
      },
      async FocusWithHelpClosed() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#CounterWithHelp textarea' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('CounterWithHelp');
      },
      async FocusWithHelpOpened() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '#CounterWithHelp textarea' }))
          .perform();
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="Tooltip"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('CounterWithHelpOpened');
      },
    },
  },
};

export const TextareaWithSingleRow: Story = () => {
  return <Textarea width={400} autoResize spellCheck={false} rows={1} extraRow={false} />;
};
TextareaWithSingleRow.storyName = 'Textarea with single row';

export const TextareaWithDisabledExtraRow: Story = () => {
  const value =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi enim voluptatum esse. sit amet, consectetur adipisicing elit. Modi enim voluptatum esse';
  return <Textarea width={400} autoResize spellCheck={false} extraRow={false} value={value} />;
};
TextareaWithDisabledExtraRow.storyName = 'Textarea with disabled extra row';
