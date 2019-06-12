import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Group from 'retail-ui/components/Group';
import {
  ValidationContainer,
  ValidationWrapperV1,
  createValidator,
  text,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

interface State {
  values: string[];
}

const getDuplicatesFor = (items: string[], index: number): number[] => {
  return items
    .map((x, i) => (x === items[index] && i !== index ? i : null))
    .filter(x => x != null) as number[];
};

/* tslint:disable:no-shadowed-variable */
const validate = createValidator<string[]>((b, a) => {
  b.array(
    x => x,
    (b, v, i) => {
      b.invalid(x => !x, 'Укажите значение', 'submit');
      b.invalid(x => !/^\d+$/.test(x), 'Только цифры');
      const d = getDuplicatesFor(a, i);
      b.invalid(x => !!d.length, 'Дубль со строками ' + d.map(x => x + 1).join(', '));
    },
  );
});
/* tslint:enable:no-shadowed-variable */

export default class ArrayExampleDemo extends React.Component<{}, State> {
  public state: State = {
    values: [''],
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { values } = this.state;
    const validation = validate(values);
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title="">
            <Button onClick={this.handleAdd}>
              <b>+</b> Добавить
            </Button>
          </Form.Line>

          {values.map((value, i) => (
            <Form.Line key={i} title={`Значение #${i + 1}`}>
              <Group>
                <Button onClick={() => this.handleRemove(i)}>
                  <b>x</b>
                </Button>
                <ValidationWrapperV1
                  validationInfo={validation.getNodeByIndex(i).get()}
                  renderMessage={text()}
                >
                  <Input
                    placeholder={'Только цифры'}
                    value={value}
                    onChange={(_, v) => this.handleChange(v, i)}
                  />
                </ValidationWrapperV1>
              </Group>
            </Form.Line>
          ))}

          <Form.ActionsBar>
            <Button use={'primary'} onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (value: string, index: number): void => {
    this.setState({ values: this.state.values.map((x, i) => (i === index ? value : x)) });
  };

  private handleAdd = (): void => {
    this.setState({ values: [...this.state.values, ''] });
  };

  private handleRemove = (index: number): void => {
    const values = this.state.values.filter((x, i) => i !== index);
    this.setState({ values: values.length ? values : [''] });
  };

  private handleSubmit = async () => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    if (await this.container.validate()) {
      alert('success');
    }
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
