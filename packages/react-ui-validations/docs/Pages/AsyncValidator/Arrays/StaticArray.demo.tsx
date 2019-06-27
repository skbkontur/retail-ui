import * as React from 'react';
import Input from 'retail-ui/components/Input';
import { ValidationContainer, ValidationWrapperV1 } from '../../../../src';
import Form from '../../../Common/Form';
import { createValidation } from '../../../../stories/AsyncStories/Validations';

interface DataContract {
  items: DataItem[];
}
interface DataItem {
  value: string;
}

function delay(timeout: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(() => resolve(), timeout));
}

async function isInvalidFormat(value: string): Promise<boolean> {
  await delay(1000);
  return !/^\d*$/.test(value);
}

/* tslint:disable:no-shadowed-variable */
const validation = createValidation<DataContract>(b => {
  b.array(
    x => x.items,
    b => {
      b.prop(
        x => x.value,
        b => {
          b.invalid(x => isInvalidFormat(x), 'Только цифры', 'lostfocus');
        },
      );
    },
  );
});

interface State {
  data: DataContract;
}

export default class StaticArrayDemo extends React.Component<{}, State> {
  public state: State = {
    data: {
      items: [{ value: '' }, { value: '' }, { value: '' }],
    },
  };

  private validator = validation.createValidator(
    this.state.data,
    this.forceUpdate.bind(this),
  );

  public componentDidUpdate(): void {
    this.validator.setValue(this.state.data);
  }

  public render() {
    const itemsValidation = this.validator.reader.getNode(x => x.items);
    const { items } = this.state.data;
    return (
      <ValidationContainer>
        <Form>
          {items.map((x, i) => {
            const itemValidation = itemsValidation.getNodeByIndex(i);
            const validationInfo = itemValidation.getNode(x => x.value).get();
            return (
              <Form.Line key={i} title={'#' + i}>
                <ValidationWrapperV1 validationInfo={validationInfo}>
                  <Input
                    placeholder={'Только цифры'}
                    value={this.state.data.items[i].value}
                    onChange={(_, value) => this.handleChange({ value }, i)}
                    onBlur={this.handleBlur}
                  />
                </ValidationWrapperV1>
              </Form.Line>
            );
          })}
        </Form>
      </ValidationContainer>
    );
  }

  private handleChange = (item: Partial<DataItem>, index: number): void => {
    this.setState(state => ({
      data: {
        ...state.data,
        items: state.data.items.map((x, i) => (i === index ? { ...x, ...item } : x)),
      },
    }));
  };

  private handleBlur = (): void => {
    this.validator.lostfocus();
  };
}
