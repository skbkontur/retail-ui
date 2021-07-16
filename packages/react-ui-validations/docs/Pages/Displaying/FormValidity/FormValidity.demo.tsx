import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Gapped } from '@skbkontur/react-ui/components/Gapped';

import {
  ValidationBehaviour,
  ValidationContainer,
  ValidationInfo,
  ValidationWrapper,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import { Form } from '../../../Common/Form';

interface State {
  immediate: string;
  lostfocus: string;
  submit: string;
  isValid: boolean | null;
}

export default class FormValidityDemo extends React.Component<{}, State> {
  public state: State = {
    immediate: '',
    lostfocus: '',
    submit: '',
    isValid: null,
  };

  private container: Nullable<ValidationContainer> = null;

  public render() {
    const { immediate, lostfocus, submit } = this.state;
    return (
      <ValidationContainer ref={this.refContainer}>
        <Form>
          <Form.Line title={'immediate'}>
            <ValidationWrapper validationInfo={this.validate(immediate, 'immediate')}>
              <Input
                placeholder={'Только цифры'}
                value={immediate}
                onValueChange={(value) => this.handleChange({ immediate: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title={'lostfocus'}>
            <ValidationWrapper validationInfo={this.validate(lostfocus, 'lostfocus')}>
              <Input
                placeholder={'Только цифры'}
                value={lostfocus}
                onValueChange={(value) => this.handleChange({ lostfocus: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.Line title={'submit'}>
            <ValidationWrapper validationInfo={this.validate(submit, 'submit')}>
              <Input
                placeholder={'Только цифры'}
                value={submit}
                onValueChange={(value) => this.handleChange({ submit: value })}
              />
            </ValidationWrapper>
          </Form.Line>

          <Form.ActionsBar>
            <Gapped wrap verticalAlign="middle">
              <Button use={'primary'} onClick={this.handleSubmit}>
                Submit
              </Button>
              {this.renderFormState()}
            </Gapped>
          </Form.ActionsBar>
        </Form>
      </ValidationContainer>
    );
  }

  private renderFormState = () => {
    switch (this.state.isValid) {
      case null:
        return <b>Отправьте форму</b>;
      case false:
        return <b style={{ color: '#d70c17' }}>Форма невалидна</b>;
      case true:
        return <b style={{ color: '#5199db' }}>Форма валидна</b>;
      default:
        throw new Error('Invalid state');
    }
  };

  private validate = (v: string, type: ValidationBehaviour): Nullable<ValidationInfo> => {
    return !/^\d*$/.test(v) ? { message: 'Только цифры', type } : null;
  };

  private handleChange = (value: Partial<State>) => {
    this.setState({ ...value, isValid: null } as any);
  };

  private handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    const isValid = await this.container.validate();
    this.setState({ isValid });
  };

  private refContainer = (el: Nullable<ValidationContainer>) => (this.container = el);
}
