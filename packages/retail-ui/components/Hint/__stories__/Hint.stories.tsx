import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Hint } from '../Hint';
import { Gapped } from '../../Gapped';
import { Input } from '../../Input';
import { PopupPositions } from '../../Popup';
import { Textarea } from '../../Textarea';

storiesOf('Hint', module)
  .addDecorator(story => <div style={{ padding: '100px 300px' }}>{story()}</div>)
  .add('playground', () => <Hint text="Hello!">Plain hint with knobs</Hint>)
  .add('too much hints', () => (
    <Gapped gap={5}>
      {new Array(252).fill(null).map((_el, i) => (
        <Hint text="test" key={i}>
          Hover me!
        </Hint>
      ))}
    </Gapped>
  ))
  .add('default', () => (
    <Hint text="Something will never be changed" manual opened>
      <span className="hint-content">Ich Liebe dich</span>
    </Hint>
  ))
  .add('left', () => (
    <Hint pos="left" text="Something will never be changed" manual opened>
      <span className="hint-content">Je t&apos;aime</span>
    </Hint>
  ))
  .add('right', () => (
    <Hint pos="right" text="Something will never be changed" manual opened>
      <span className="hint-content">Ti voglio bene</span>
    </Hint>
  ))
  .add('bottom', () => (
    <Hint pos="bottom" text="Something will never be changed" manual opened>
      <span className="hint-content">Te amo</span>
    </Hint>
  ))
  .add('with large word', () => (
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
  ))
  .add('with block-element', () => (
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
  ))
  .add('with 100%-width input', () => (
    <span style={{ width: '400px', display: 'inline-block' }}>
      <Hint pos="top" text="Something will never be changed" manual opened>
        <Input width="100%" />
      </Hint>
    </span>
  ))
  .add('hint without animations', () => (
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
  ));

storiesOf('Hint', module).add('Hints without wrapper around inline-block with 50% width', () => (
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
));
