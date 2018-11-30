import * as React from 'react';
import {
  ValidationContainer,
  ValidationInfo,
  ValidationWrapperV1
} from 'react-ui-validations';
import DatePicker from 'retail-ui/components/DatePicker/DatePicker';
import Button from 'retail-ui/components/Button/Button';
import Input from 'retail-ui/components/Input/Input';

interface DateTestProps {}

export class DateTest extends React.Component<
  DateTestProps,
  {
    start?: string;
    end?: string;
    str1?: string;
    str2?: string;
  }
> {
  private ValidationContainer;

  constructor(props: any, state: any) {
    super(props, state);
    this.state = { start: null, end: null, str1: '', str2: '' };
    this.ValidationContainer = React.createRef();
  }

  public render(): JSX.Element {
    const { start, end, str1, str2 } = this.state;

    const strValidation: ValidationInfo = {
      type: 'submit',
      message: 'long input'
    };

    return (
      <div style={{ width: 500, height: 500, padding: 100 }}>
        <ValidationContainer ref={this.ValidationContainer}>
          <div style={{ marginBottom: 40 }}>
            <ValidationWrapperV1
              validationInfo={str1.length > 1 ? strValidation : null}
            >
              <Input
                value={str1}
                onChange={(e, v) => this.setState({ str1: v })}
              />
            </ValidationWrapperV1>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ValidationWrapperV1 validationInfo={this.validateEmptyDate(start)}>
              <DatePicker
                value={start}
                onFocus={() => console.log('focus start')}
                onBlur={() => console.log('blur start')}
                onChange={(e, v) => this.setState({ start: v })}
              />
            </ValidationWrapperV1>

            <ValidationWrapperV1 validationInfo={this.validateEmptyDate(end)}>
              <DatePicker
                value={end}
                onFocus={() => console.log('focus end')}
                onBlur={() => console.log('blur end')}
                onChange={(e, v) => this.setState({ end: v })}
              />
            </ValidationWrapperV1>
          </div>

          <div style={{ marginTop: 40 }}>
            <ValidationWrapperV1
              validationInfo={str2.length > 1 ? strValidation : null}
            >
              <Input
                value={str2}
                onChange={(e, v) => this.setState({ str2: v })}
              />
            </ValidationWrapperV1>
          </div>

          <div style={{ marginTop: 40 }}>
            <Button onClick={() => this.ValidationContainer.current.submit()}>
              Submit
            </Button>
          </div>
        </ValidationContainer>
      </div>
    );
  }

  private validateEmptyDate = (date: string): ValidationInfo => {
    if (!date) {
      return { type: 'submit', message: 'empty date' };
    } else {
      return this.validateDate();
    }
  };

  private validateDate = (): ValidationInfo => {
    if (true) {
      return { type: 'submit', message: 'wrong period' };
    }

    return null;
  };
}
