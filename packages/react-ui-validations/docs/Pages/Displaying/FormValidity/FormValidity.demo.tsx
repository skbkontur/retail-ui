import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Gapped from 'retail-ui/components/Gapped';
import {
  ValidationContainer,
  ValidationWrapperV1,
  ValidationInfo,
  ValidationBehaviour,
} from '../../../../src';
import { Nullable } from '../../../../typings/Types';
import Form from '../../../Common/Form';

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
            <ValidationWrapperV1 validationInfo={this.validate(immediate, 'immediate')}>
              <Input
                placeholder={'Только цифры'}
                value={immediate}
                onChange={(_, value) => this.handleChange({ immediate: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title={'lostfocus'}>
            <ValidationWrapperV1 validationInfo={this.validate(lostfocus, 'lostfocus')}>
              <Input
                placeholder={'Только цифры'}
                value={lostfocus}
                onChange={(_, value) => this.handleChange({ lostfocus: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.Line title={'submit'}>
            <ValidationWrapperV1 validationInfo={this.validate(submit, 'submit')}>
              <Input
                placeholder={'Только цифры'}
                value={submit}
                onChange={(_, value) => this.handleChange({ submit: value })}
              />
            </ValidationWrapperV1>
          </Form.Line>

          <Form.ActionsBar>
            <Gapped>
              <Button use={'primary'} onClick={this.handleSubmit}>Submit</Button>
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
