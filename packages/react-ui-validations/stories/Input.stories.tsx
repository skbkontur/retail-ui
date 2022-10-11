import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Select } from '@skbkontur/react-ui/components/Select';
import { Gapped } from '@skbkontur/react-ui';

import { text, ValidationBehaviour, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

class Example1 extends React.Component {
  public state = {
    value: '',
  };

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: 'Значение должно состоять из двух слов', type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    );
  }
}

class Example2 extends React.Component {
  public state = {
    value: '',
  };

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    );
  }
}

class Example3 extends React.Component {
  public state = {
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 10 }}>
          <Button onClick={() => this.submit()}>Отправить</Button>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
          <Button onClick={() => this.submit()}>Отправить</Button>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <Button onClick={() => this.submit()}>Отправить</Button>
        </div>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);

  private submit(): Promise<void> | void {
    if (this.container) {
      return this.container.submit();
    }
  }
}

class Example8 extends React.Component {
  public state = {
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer} scrollOffset={{ top: 150, bottom: 150 }}>
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: 0,
            right: 0,
            left: 0,
            background: '#1e79be',
            padding: 10,
            height: 80,
          }}
        >
          <Button onClick={() => this.submit()}>Отправить сверху</Button>
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ height: 600, backgroundColor: '#eee' }} />
          <ValidationWrapper validationInfo={this.validateValue()}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
        </div>
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            top: 600,
            right: 0,
            left: 0,
            bottom: 0,
            background: '#1e79be',
            padding: 10,
            height: 80,
          }}
        >
          <Button onClick={() => this.submit()}>Отправить снизу</Button>
        </div>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);

  private submit(): Promise<void> | void {
    if (this.container) {
      return this.container.submit();
    }
  }
}

type Sex = 'male' | 'female';

interface Example4State {
  type: Nullable<Sex>;
  value: string;
}
class Example4 extends React.Component {
  public state: Example4State = {
    type: null,
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue(): Nullable<ValidationInfo> {
    const { type, value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (type !== null && value !== type) {
      return { message: <span>Значение должно быть равно type.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 10 }}>
          <Select<Nullable<Sex>>
            items={['male', 'female']}
            value={this.state.type}
            onValueChange={(value) => this.setState({ type: value })}
          />
          <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
        </div>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

class Example5 extends React.Component {
  public state = {
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 50 }}>
          <br />
          <br />
          <br />
          <br />
          <div style={{ height: 300, width: 300, overflow: 'scroll' }}>
            <div style={{ height: 1000, width: 1000, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 500, left: 500 }}>
                <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
                  <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
                </ValidationWrapper>
              </div>
            </div>
          </div>
          <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
        </div>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

class Example6 extends React.Component {
  public state = {
    value1: '',
    value2: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue1(): Nullable<ValidationInfo> {
    const { value1 } = this.state;
    if (value1 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value1.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public validateValue2(): Nullable<ValidationInfo> {
    const { value2 } = this.state;
    if (value2 === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value2.split(' ').length !== 2) {
      return { message: <span>Значение должно состоять из двух слов.</span>, type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refContainer}>
        <div style={{ padding: 50, height: 200, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 100 }}>
            <ValidationWrapper validationInfo={this.validateValue1()}>
              <Input value={this.state.value1} onValueChange={(value) => this.setState({ value1: value })} />
            </ValidationWrapper>
          </div>
          <div style={{ position: 'absolute', top: 20 }}>
            <ValidationWrapper validationInfo={this.validateValue2()}>
              <Input value={this.state.value2} onValueChange={(value) => this.setState({ value2: value })} />
            </ValidationWrapper>
          </div>
        </div>
        <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

class Example7 extends React.Component {
  public state = {
    value1: '',
    value2: '',
    value3: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue(value: string): Nullable<ValidationInfo> {
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return { message: 'Значение должно состоять из двух слов.', type: 'lostfocus' };
    }
    return null;
  }

  public render() {
    const { value1, value2, value3 } = this.state;
    return (
      <ValidationContainer ref={this.refContainer}>
        <div>
          <div style={{ padding: 20 }}>
            <ValidationWrapper validationInfo={this.validateValue(value1)}>
              <Input value={value1} onValueChange={(value) => this.setState({ value1: value })} />
            </ValidationWrapper>
          </div>
          <div style={{ padding: 20 }}>
            <ValidationWrapper validationInfo={this.validateValue(value2)}>
              <Input value={value2} onValueChange={(value) => this.setState({ value2: value })} />
            </ValidationWrapper>
          </div>
          <div style={{ padding: 20 }}>
            <ValidationWrapper validationInfo={this.validateValue(value3)}>
              <Input value={value3} onValueChange={(value) => this.setState({ value3: value })} />
            </ValidationWrapper>
          </div>
        </div>
        <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

class Example9 extends React.Component {
  public state = {
    value: '',
  };

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    return !value ? { message: 'Error msg', type: 'lostfocus' } : null;
  }

  public render() {
    return (
      <ValidationContainer>
        <div style={{ padding: 10 }}>
          <ValidationWrapper validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onValueChange={(value) => this.setState({ value })} />
          </ValidationWrapper>
        </div>
      </ValidationContainer>
    );
  }
}

interface Example10State {
  immediate: string;
  lostfocus: string;
  submit: string;
  isValid: boolean | null;
}

class Example10 extends React.Component<Record<string, never>, Example10State> {
  container: ValidationContainer | null = null;

  state: Example10State = {
    immediate: '',
    lostfocus: '',
    submit: '',
    isValid: null,
  };

  render() {
    const { immediate, lostfocus, submit } = this.state;
    return (
      <ValidationContainer ref={this.refContainer}>
        <ValidationWrapper validationInfo={this.validate(immediate, 'immediate')}>
          <Input
            placeholder={'Только цифры'}
            value={immediate}
            onValueChange={(value) => this.handleChange({ immediate: value })}
          />
        </ValidationWrapper>

        <ValidationWrapper validationInfo={this.validate(lostfocus, 'lostfocus')}>
          <Input
            placeholder={'Только цифры'}
            value={lostfocus}
            onValueChange={(value) => this.handleChange({ lostfocus: value })}
          />
        </ValidationWrapper>

        <ValidationWrapper validationInfo={this.validate(submit, 'submit')}>
          <Input
            placeholder={'Только цифры'}
            value={submit}
            onValueChange={(value) => this.handleChange({ submit: value })}
          />
        </ValidationWrapper>

        <Gapped wrap verticalAlign="middle">
          <Button use={'primary'} onClick={this.handleSubmit}>
            Submit
          </Button>
          {this.renderFormState()}
        </Gapped>
      </ValidationContainer>
    );
  }

  renderFormState = () => {
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

  validate = (v: string, type: ValidationBehaviour): ValidationInfo | null => {
    return !/^\d*$/.test(v) ? { message: 'Только цифры', level: 'warning', type } : null;
  };

  handleChange = (value: any) => {
    this.setState({ ...value, isValid: null });
  };

  handleSubmit = async (): Promise<void> => {
    if (!this.container) {
      throw new Error('invalid state');
    }
    const isValid = await this.container.validate();
    this.setState({ isValid });
  };

  refContainer = (el: ValidationContainer | null) => (this.container = el);
}

storiesOf('Input', module)
  .add('#1', () => {
    return <Example1 />;
  })
  .add('#2 ReactElement в сообщении', () => {
    return <Example2 />;
  })
  .add('#3 Промотка сообщении', () => {
    return <Example3 />;
  })
  .add('#4 Зависимые поля', () => {
    return <Example4 />;
  })
  .add('#5 Промотка внутри котейнера', () => {
    return <Example5 />;
  })
  .add('#6 Выбор первого контра для валидации', () => {
    return <Example6 />;
  })
  .add('#7 Три невалидных поля по сабмиту', () => {
    return <Example7 />;
  })
  .add('#8 Промотка с фиксированной плашкой снизу', () => {
    return <Example8 />;
  })
  .add('#9 lostfocus не срабатывает после первого рендера', () => {
    return <Example9 />;
  })
  .add('#10 валидация формы с level = warning', () => {
    return <Example10 />;
  });
