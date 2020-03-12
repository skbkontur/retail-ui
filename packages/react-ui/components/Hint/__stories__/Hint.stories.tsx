import React from 'react';
import { StoryFn } from '@storybook/addons';

import { Hint } from '../Hint';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';
import { PopupPositions } from '../../Popup';
import { Textarea } from '../../Textarea';

export default {
  title: 'Hint',
  decorators: [(story: StoryFn<JSX.Element>) => <div style={{ padding: '100px 300px' }}>{story()}</div>],
};

export const Playground = () => <Hint text="Hello!">Plain hint with knobs</Hint>;
Playground.story = { name: 'playground' };

export const TooMuchHints = () => (
  <Gapped gap={5}>
    {new Array(252).fill(null).map((_el, i) => (
      <Hint text="test" key={i}>
        Hover me!
      </Hint>
    ))}
  </Gapped>
);
TooMuchHints.story = { name: 'too much hints' };

export const Default = () => (
  <Hint text="Something will never be changed" manual opened>
    <span className="hint-content">Ich Liebe dich</span>
  </Hint>
);
Default.story = { name: 'default' };

export const Left = () => (
  <Hint pos="left" text="Something will never be changed" manual opened>
    <span className="hint-content">Je t&apos;aime</span>
  </Hint>
);
Left.story = { name: 'left' };

export const Right = () => (
  <Hint pos="right" text="Something will never be changed" manual opened>
    <span className="hint-content">Ti voglio bene</span>
  </Hint>
);
Right.story = { name: 'right' };

export const Bottom = () => (
  <Hint pos="bottom" text="Something will never be changed" manual opened>
    <span className="hint-content">Te amo</span>
  </Hint>
);
Bottom.story = { name: 'bottom' };

export const WithLargeWord = () => (
  <div style={{ marginTop: -100 }}>
    <Hint
      pos="bottom"
      manual
      opened
      text="Используется на элементах, которые не вмещают полноеназваниеилитребуютнебольшогопояснения. Например: панель действий, иконки без текста, сокращенные слишком длинные..."
    >
      <span className="hint-content">Там длинное слово</span>
    </Hint>
  </div>
);
WithLargeWord.story = { name: 'with large word' };

export const WithBlockElement = () => (
  <Hint pos="right" text="Something will never be changed" manual opened>
    <div
      className="hint-content"
      style={{
        width: 150,
        border: '1px solid',
      }}
    >
      <span>Ti voglio bene</span>
    </div>
  </Hint>
);
WithBlockElement.story = { name: 'with block-element' };

export const With100WidthInput = () => (
  <span style={{ width: '400px', display: 'inline-block' }}>
    <Hint pos="top" text="Something will never be changed" manual opened>
      <Input width="100%" />
    </Hint>
  </span>
);
With100WidthInput.story = { name: 'with 100%-width input' };

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
HintWithoutAnimations.story = { name: 'hint without animations' };

export const HintsWithoutWrapperAroundInlineBlockWith50Width = () => (
  <div style={{ padding: '150px', width: '500px' }}>
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
HintsWithoutWrapperAroundInlineBlockWith50Width.story = {
  name: 'Hints without wrapper around inline-block with 50% width',
};
