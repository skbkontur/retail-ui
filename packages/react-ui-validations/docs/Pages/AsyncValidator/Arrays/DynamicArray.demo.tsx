import * as React from 'react';
import Input from 'retail-ui/components/Input';
import Gapped from 'retail-ui/components/Gapped';
import Button from 'retail-ui/components/Button';
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

export default class DynamicArrayDemo extends React.Component<{}, State> {
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
          <Form.Line title={''}>
            <Button width={250} onClick={this.handleAdd}>
              Add
            </Button>
          </Form.Line>
          {items.map((x, i) => {
            const itemValidation = itemsValidation.getNodeByIndex(i);
            const validationInfo = itemValidation.getNode(x => x.value).get();
            return (
              <Form.Line key={i} title={'#' + i}>
                <Gapped verticalAlign={'baseline'}>
                  <ValidationWrapperV1 validationInfo={validationInfo}>
                    <Input
                      placeholder={'Только цифры'}
                      value={this.state.data.items[i].value}
                      onChange={(_, value) => this.handleChange({ value }, i)}
                      onBlur={this.handleBlur}
                    />
                  </ValidationWrapperV1>
                  <Button use={'link'} onClick={() => this.handleRemove(i)}>
                    X
                  </Button>
                </Gapped>
              </Form.Line>
            );
          })}
        </Form>
      </ValidationContainer>
    );
  }

  private handleAdd = (): void => {
    this.setState(state => ({
      data: {
        ...state.data,
        items: [...state.data.items, { value: '' }],
      },
    }));
  };

  private handleRemove = (index: number): void => {
    this.setState(state => {
      const items = state.data.items.filter((x, i) => i !== index);
      return {
        data: {
          ...state.data,
          items: items.length ? items : [{ value: '' }],
        },
      };
    });
  };

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
