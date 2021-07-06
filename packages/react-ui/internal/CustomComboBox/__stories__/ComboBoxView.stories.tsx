import React from 'react';
import OkIcon from '@skbkontur/react-icons/Ok';

import { Story } from '../../../typings/stories';
import { ComboBoxView } from '../ComboBoxView';
import { Gapped } from '../../../components/Gapped';
import { Modal } from '../../../components/Modal';
import { MenuItem } from '../../../components/MenuItem';

export default { title: 'ComboBoxView' };

export const InputLikeText: Story = () => (
  <Gapped vertical>
    <ComboBoxView renderValue={simpleRenderValue} value={{ value: 1, label: 'hello' }} />
    <ComboBoxView renderValue={simpleRenderValue} value={{ value: 1, label: 'hello' }} align="center" />
    <ComboBoxView renderValue={simpleRenderValue} value={{ value: 1, label: 'hello' }} align="right" />
    <ComboBoxView value={{ id: 1, name: 'hello' }} renderValue={complexRenderValue} />
    <ComboBoxView value={{ id: 1, name: 'looooooooooooooooooooooong hello' }} renderValue={complexRenderValue} />
    <div>
      <ComboBoxView value={{ id: 1, name: 'looooooooooooooooooooooong hello' }} renderValue={complexRenderValue} />{' '}
      hello
    </div>
    <div>
      <ComboBoxView
        size="medium"
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={complexRenderValue}
      />{' '}
      hello
    </div>
    <div>
      <ComboBoxView
        size="large"
        value={{ id: 1, name: 'looooooooooooooooooooooong hello' }}
        renderValue={complexRenderValue}
      />{' '}
      hello
    </div>
    <ComboBoxView placeholder="placeholder" disabled />
    <ComboBoxView error textValue="error" />
    <ComboBoxView drawArrow />
    <ComboBoxView loading items={new Array(2)} value="Hello" />
    <div>
      <ComboBoxView loading rightIcon={OkIcon} items={new Array(2)} value="Hello" /> ComboBoxView с правой иконкой в
      состоянии загрузки
    </div>
  </Gapped>
);
InputLikeText.storyName = 'input like text';

InputLikeText.parameters = {
  creevey: {
    tests: {
      async plain() {
        await this.expect(await this.takeScreenshot()).to.matchImage('plain');
      },
      async ['focused first element']() {
        await this.browser
          .actions({
            bridge: true,
          })
          .click(this.browser.findElement({ css: '[data-comp-name~="InputLikeText"]' }))
          .perform();
        await this.expect(await this.takeScreenshot()).to.matchImage('focused first element');
      },
    },
  },
};

export const InputLikeTextWithPlaceholder = () => (
  <Gapped vertical>
    <ComboBoxView placeholder="placeholder" />
    <ComboBoxView placeholder="looooooooooooooooooooooong placeholder" />
    <div>
      <ComboBoxView placeholder="looooooooooooooooooooooong placeholder" />
      Hello
    </div>
  </Gapped>
);
InputLikeTextWithPlaceholder.storyName = 'input like text with placeholder';

export const Opened = () => (
  <table>
    <tbody>
      <tr>
        <td style={{ paddingBottom: 60, paddingRight: 10 }}>
          <ComboBoxView editing opened />
        </td>
        <td style={{ paddingBottom: 60 }}>
          <ComboBoxView editing loading opened textValue="loading" />
        </td>
      </tr>
      <tr>
        <td style={{ paddingBottom: 120, paddingRight: 10 }}>
          <ComboBoxView editing items={[]} opened textValue="nothing" renderNotFound={() => 'Не найдено'} />
        </td>
        <td style={{ paddingBottom: 120 }}>
          <ComboBoxView
            editing
            textValue="one"
            opened
            items={[
              { id: 2, name: 'two' },
              { id: 3, name: 'three' },
            ]}
            renderItem={complexRenderValue}
            totalCount={221}
            renderTotalCount={(found, total) => `Показано ${found} из ${total}`}
          />
        </td>
      </tr>
      <tr>
        <td style={{ paddingBottom: 120, paddingRight: 10 }}>
          <ComboBoxView editing items={[]} opened textValue="null" renderNotFound={() => null} />
        </td>
        <td style={{ paddingBottom: 120 }}>
          <ComboBoxView
            editing
            items={[]}
            opened
            textValue="something"
            renderAddButton={query => <MenuItem>Add {query}</MenuItem>}
          />
        </td>
      </tr>
    </tbody>
  </table>
);
Opened.storyName = 'opened';

export const WithItems = () => (
  <div style={{ paddingBottom: 400 }}>
    <ComboBoxView
      editing
      textValue="one"
      opened
      items={[
        { id: 2, name: 'two' },
        { id: 3, name: 'three' },
        { id: 4, name: 'four' },
        { id: 5, name: 'five' },
        { id: 6, name: 'six' },
        { id: 7, name: 'seven' },
        { id: 8, name: 'eight' },
        { id: 9, name: 'nine' },
        { id: 10, name: 'ten' },
        { id: 11, name: 'eleven' },
        { id: 12, name: 'twelve' },
      ]}
      renderItem={complexRenderValue}
    />
  </div>
);
WithItems.storyName = 'with items';

export const InFlexModal = () => (
  <Modal width="250px">
    <Modal.Body>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 2 }}>
          <ComboBoxView value={'Hello world! '.repeat(5)} width="100%" />
        </div>
      </div>
    </Modal.Body>
  </Modal>
);
InFlexModal.storyName = 'in flex modal';
InFlexModal.parameters = { creevey: { captureElement: null } };

function simpleRenderValue(value: { value: number; label: string }) {
  return value.label;
}

function complexRenderValue({ id, name }: { id: React.ReactNode; name: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{name}</span>
      <span>{id}</span>
    </div>
  );
}
