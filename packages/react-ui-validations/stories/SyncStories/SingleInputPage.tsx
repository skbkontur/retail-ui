import React from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import { createPropsGetter } from '@skbkontur/react-ui/lib/createPropsGetter';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../../src';
import { Nullable } from '../../typings/Types';
import { ValidationState } from '../ValidationHelper';

interface SingleInputPageProps {
  initialValue?: string;
  validationType: ValidationInfo['type'];
  validationLevel?: ValidationInfo['level'];
}
interface SingleInputPageState {
  sending: boolean;
  value: string;
  level: ValidationInfo['level'];
  validation: ValidationState;
  focused: boolean;
}

type DefaultProps = Required<Pick<SingleInputPageProps, 'validationLevel'>>;

export class SingleInputPage extends React.Component<SingleInputPageProps, SingleInputPageState> {
  private getProps = createPropsGetter(SingleInputPage.defaultProps);

  public state: SingleInputPageState = {
    sending: false,
    value: this.props.initialValue || '',
    level: this.getProps().validationLevel,
    validation: 'none',
    focused: false,
  };

  public static defaultProps: DefaultProps = {
    validationLevel: 'error',
  };

  private container: ValidationContainer | null = null;

  public validate(): Nullable<ValidationInfo> {
    if (this.state.value.substr(0, 3) === 'bad') {
      return {
        message: 'incorrect value',
        type: this.props.validationType,
        level: this.state.level,
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 30 }}>
          <Gapped vertical>
            <ValidationWrapper data-tid="InputValidation" validationInfo={this.validate()} renderMessage={text()}>
              <Input
                data-prop-focused={String(this.state.focused)}
                data-tid={'Input'}
                value={this.state.value}
                onValueChange={(value) => this.setState({ value })}
                onFocus={() => this.setState({ focused: true })}
                onBlur={() => this.setState({ focused: false })}
              />
            </ValidationWrapper>
            <Select<ValidationInfo['level']>
              value={this.state.level}
              data-tid={'ValidationLevel'}
              items={['error', 'warning']}
              onValueChange={(level) => this.setState({ level })}
            />
            <Gapped wrap verticalAlign="middle">
              <Button data-tid={'SubmitButton'} loading={this.state.sending} onClick={this.handleSubmit}>
                Submit
              </Button>
              <span data-tid={'ValidationState'}>{this.state.validation}</span>
            </Gapped>
          </Gapped>
        </div>
      </ValidationContainer>
    );
  }

  public handleSubmit = () => {
    this.setState({ sending: true, validation: 'validating' }, async () => {
      if (this.container) {
        const isValid = await this.container.validate();
        this.setState({ sending: false, validation: isValid ? 'valid' : 'invalid' });
      }
    });
  };

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}
