import { Meta, Story } from '@skbkontur/react-ui/typings/stories';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Group } from '@skbkontur/react-ui/components/Group';

import { isNonNullable } from '../../../../src/utils/isNonNullable';
import { createValidator, text, ValidationContainer, ValidationWrapper } from '../../../../src';
import { Form } from '../../../Common/Form';

export default {
  title: 'Examples/ArrayExample',
  parameters: { creevey: { skip: true } },
} as Meta;

export const ArrayExample: Story = () => {
  const getDuplicatesFor = (items: string[], index: number): number[] => {
    return items
      .map((x, i) => (x === items[index] && i !== index ? i : null))
      .filter((x) => isNonNullable(x)) as number[];
  };

  const validate = createValidator<string[]>((b, a) => {
    b.array(
      (x) => x,
      (b, v, i) => {
        b.invalid((x) => !x, 'Укажите значение', 'submit');
        b.invalid((x) => !/^\d+$/.test(x), 'Только цифры');
        const d = getDuplicatesFor(a, i);
        b.invalid(() => !!d.length, 'Дубль со строками ' + d.map((x) => x + 1).join(', '));
      },
    );
  });

  const container = React.useRef<ValidationContainer>(null);
  const [values, setValues] = React.useState<string[]>(['']);
  const validation = validate(values);

  function handleChange(value: string, index: number): void {
    setValues((values) => values.map((x, i) => (i === index ? value : x)));
  }

  function handleAdd(): void {
    setValues((values) => [...values, '']);
  }

  function handleRemove(index: number): void {
    setValues((values) => {
      const filtered = values.filter((x, i) => i !== index);
      return filtered.length ? filtered : [''];
    });
  }

  async function handleSubmit() {
    if (await container.current?.validate()) {
      alert('success');
    }
  }

  return (
    <ValidationContainer ref={container}>
      <Form>
        <Form.Line title="">
          <Button onClick={handleAdd}>
            <b>+</b> Добавить
          </Button>
        </Form.Line>

        {values.map((value, i) => (
          <Form.Line key={i} title={`Значение #${i + 1}`}>
            <Group>
              <Button onClick={() => handleRemove(i)}>
                <b>x</b>
              </Button>
              <ValidationWrapper validationInfo={validation.getNodeByIndex(i).get()} renderMessage={text()}>
                <Input placeholder={'Только цифры'} value={value} onValueChange={(v) => handleChange(v, i)} />
              </ValidationWrapper>
            </Group>
          </Form.Line>
        ))}

        <Form.ActionsBar>
          <Button use={'primary'} onClick={handleSubmit}>
            Submit
          </Button>
        </Form.ActionsBar>
      </Form>
    </ValidationContainer>
  );
};
