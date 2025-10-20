import React, { useContext, useState } from 'react';
import type { KeyboardEvent } from 'react';

import type { Story } from '../../typings/stories';
import { Gapped } from '../../components/Gapped';
import { blink } from '../blink';
import { isKeyChar } from '../events/keyboard/identifiers';
import { Input } from '../../components/Input';
import { ThemeContext } from '../theming/ThemeContext';
import type { Theme } from '../theming/Theme';

export default { title: 'Lib/blink' };

export const Animate: Story = () => {
  const t = useContext(ThemeContext);
  const [key, setKey] = useState('default-key');

  return (
    <Gapped vertical>
      <table cellPadding={5}>
        <tbody>
          <tr>
            <td>
              <code>1</code>
            </td>
            <td>включает долгую анимацию для тестов</td>
          </tr>
          <tr>
            <td>
              <code>2</code>
            </td>
            <td>сбрасывает долгую анимацию для тестов</td>
          </tr>
          <tr>
            <td>
              <code>/[a-zа-я\d]/i</code>
            </td>
            <td>обычные символы вызывают обычную анимацию</td>
          </tr>
        </tbody>
      </table>
      <Gapped style={{ caretColor: 'transparent' }}>
        <Input key={key} onKeyDown={handleBlink(t)} />
        <button data-tid="update-input" onClick={() => setKey(Math.random().toString())}>
          update Input
        </button>
      </Gapped>
    </Gapped>
  );
};

export const Demo: Story = () => {
  const [value, setValue] = useState('');

  return (
    <Gapped vertical>
      <Gapped>
        <Input value={value} onValueChange={setValue} maxLength={5} />
        <code>animate</code>
      </Gapped>
      <Gapped>
        <Input ref={deleteAnimate} value={value} onValueChange={setValue} maxLength={5} />
        <code>fallback</code>
      </Gapped>
    </Gapped>
  );
};
Demo.parameters = { creevey: { skip: true } };

function handleBlink(t: Theme) {
  return function (e: KeyboardEvent<HTMLElement>) {
    if (e.target instanceof HTMLElement && isKeyChar(e)) {
      e.preventDefault();
      const label = e.target.closest('label');
      if (e.key === '1') {
        blink({
          el: label,
          blinkColor: t.inputBlinkColor,
          options: { duration: 50000 },
        });
      } else if (e.key === '2') {
        blink({
          el: label,
          blinkColor: t.inputBlinkColor,
          options: { duration: 0 },
        });
      } else {
        blink({
          el: label,
          blinkColor: t.inputBlinkColor,
        });
      }
    }
  };
}

function deleteAnimate(input: Input | null) {
  if (input?.labelRef?.current) {
    // @ts-expect-error: remove animate to make fallback work
    input.labelRef.current.animate = undefined;
  }
}
