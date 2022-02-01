import React from 'react';
import { ComponentStory } from '@storybook/react';

import { Meta, Story } from '../../../typings/stories';
import { DEFAULT_MAX_WIDTH, DEFAULT_POSITION, Hint, HintProps } from '../Hint';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';
import { PopupPositions } from '../../../internal/Popup';
import { Textarea } from '../../Textarea';
import { delay } from '../../../lib/utils';
import { rootNode, TSetRootNode } from '../../../lib/rootNode';

export default {
  title: 'components/Hint',
  component: Hint,
  decorators: [
    (Story) => (
      <div style={{ padding: '100px 300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    pos: { control: 'select', options: PopupPositions },
  },
} as Meta;

const PlaygroundTemplate: ComponentStory<typeof Hint> = (args) => <Hint {...args} />;

const commonArgs = {
  pos: DEFAULT_POSITION as HintProps['pos'],
  manual: false,
  opened: false,
  maxWidth: DEFAULT_MAX_WIDTH,
  disableAnimations: false,
  useWrapper: false,
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = {
  ...commonArgs,
  text: 'hello',
  children: 'Plain hint with knobs',
};
Playground.storyName = 'playground';
Playground.parameters = { creevey: { skip: [true] } };

export const TooMuchHints = () => (
  <Gapped gap={5}>
    {new Array(252).fill(null).map((_el, i) => (
      <Hint text="test" key={i}>
        Hover me!
      </Hint>
    ))}
  </Gapped>
);
TooMuchHints.storyName = 'too much hints';
TooMuchHints.parameters = { creevey: { skip: [true] } };

const Template: ComponentStory<typeof Hint> = ({ children, ...rest }) => (
  <Hint {...rest}>
    <span className="hint-content">{children}</span>
  </Hint>
);

export const Default = Template.bind({});
Default.args = {
  ...commonArgs,
  text: 'Something will never be changed',
  children: 'Ich Liebe dich',
  manual: true,
  opened: true,
};
Default.storyName = 'default';

export const Left = Template.bind({});
Left.args = {
  ...commonArgs,
  pos: 'left',
  text: 'Something will never be changed',
  children: <span>Je t&apos;aime</span>,
  manual: true,
  opened: true,
};
Left.storyName = 'left';

export const Right = Template.bind({});
Right.args = {
  ...commonArgs,
  pos: 'right',
  text: 'Something will never be changed',
  children: 'Ti voglio bene',
  manual: true,
  opened: true,
};
Right.storyName = 'right';

export const Bottom = Template.bind({});
Bottom.args = {
  ...commonArgs,
  pos: 'bottom',
  text: 'Something will never be changed',
  children: 'Te amo',
  manual: true,
  opened: true,
};
Bottom.storyName = 'bottom';

const WithLargeWordTemplate: ComponentStory<typeof Hint> = ({ children, ...rest }) => (
  <div style={{ marginTop: -100 }}>
    <Hint {...rest}>
      <span className="hint-content">{children}</span>
    </Hint>
  </div>
);

export const WithLargeWord = WithLargeWordTemplate.bind({});
WithLargeWord.args = {
  ...commonArgs,
  pos: 'bottom',
  text: 'Используется на элементах, которые не вмещают полноеназваниеилитребуютнебольшогопояснения. Например: панель действий, иконки без текста, сокращенные слишком длинные...',
  children: 'Там длинное слово',
  manual: true,
  opened: true,
};
WithLargeWord.storyName = 'with large word';

const BlockTemplate: ComponentStory<typeof Hint> = ({ children, ...rest }) => (
  <Hint {...rest}>
    <div
      className="hint-content"
      style={{
        width: 150,
        border: '1px solid',
      }}
    >
      <span>{children}</span>
    </div>
  </Hint>
);
export const WithBlockElement = BlockTemplate.bind({});
WithBlockElement.args = {
  ...commonArgs,
  pos: 'right',
  text: 'Something will never be changed',
  children: 'Ti voglio bene',
  manual: true,
  opened: true,
};
WithBlockElement.storyName = 'with block-element';

const InputTemplate: ComponentStory<typeof Hint> = (args) => (
  <span style={{ width: '400px', display: 'inline-block' }}>
    <Hint {...args}>
      <Input width="100%" />
    </Hint>
  </span>
);
export const With100WidthInput = InputTemplate.bind({});
With100WidthInput.args = {
  ...commonArgs,
  pos: 'top',
  text: 'Something will never be changed',
  manual: true,
  opened: true,
};
With100WidthInput.storyName = 'with 100%-width input';

export const HintWithoutAnimations = () => (
  <div>
    <Hint text="No disableAnimations prop">
      <button>Hover me (No disableAnimations prop)</button>
    </Hint>
    <Hint text="disableAnimations={false}" disableAnimations={false}>
      <button>Hover me (disableAnimations: false)</button>
    </Hint>
    <Hint text="disableAnimations={true}" disableAnimations={true}>
      <button>Hover me (disableAnimations: true)</button>
    </Hint>
  </div>
);
HintWithoutAnimations.storyName = 'hint without animations';
HintWithoutAnimations.parameters = { creevey: { skip: [true] } };

export const HintsWithoutWrapperAroundInlineBlockWith50Width: Story = () => (
  <div style={{ margin: '0 -150px', padding: '50px 0', width: '500px' }}>
    {PopupPositions.reduce(
      (child, position) => (
        <Hint useWrapper={false} text={position} pos={position} manual opened>
          {child}
        </Hint>
      ),
      <Textarea rows={10} resize="none" width="50%">
        {"I'm inline-block with 50% width.\n\nHover me!"}
      </Textarea>,
    )}
  </div>
);
HintsWithoutWrapperAroundInlineBlockWith50Width.storyName = 'Hints without wrapper around inline-block with 50% width';
HintsWithoutWrapperAroundInlineBlockWith50Width.parameters = { creevey: { delay: 500 } };

const HandleClickHint = () => {
  const [manual, setManual] = React.useState(false);

  const onClick = () => setManual(true);

  return (
    <div>
      <Hint text="Should not displayed after click" manual={manual} opened={!manual}>
        <div onClick={onClick} id="main">
          Hover me and click
        </div>
      </Hint>
    </div>
  );
};

export const SetManualAndOpenedPropOnClick: Story = () => <HandleClickHint />;

SetManualAndOpenedPropOnClick.parameters = {
  creevey: {
    tests: {
      async ['click on hint']() {
        await this.browser
          .actions()
          .click(this.browser.findElement({ css: '#main' }))
          .perform();
        await delay(1000);
        await this.expect(await this.browser.takeScreenshot()).to.matchImage('click on hint');
      },
    },
  },
};

@rootNode
class CustomClassComponent extends React.Component<{}, {}> {
  private setRootNode!: TSetRootNode;

  render() {
    return <div ref={this.setRootNode}>children text</div>;
  }
}
const ClassTemplate: ComponentStory<typeof Hint> = (args) => (
  <React.StrictMode>
    <Hint {...args}>
      <CustomClassComponent />
    </Hint>
  </React.StrictMode>
);
export const withClassChildren = ClassTemplate.bind({});
withClassChildren.args = {
  ...commonArgs,
  pos: 'top',
  text: 'Something will never be changed',
  manual: true,
  opened: true,
};
withClassChildren.storyName = 'with class children';
