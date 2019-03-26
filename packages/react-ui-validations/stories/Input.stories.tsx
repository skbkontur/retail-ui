import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Button from 'retail-ui/components/Button';
import Input from 'retail-ui/components/Input';
import Select from 'retail-ui/components/Select';
import { text, ValidationContainer, ValidationInfo, ValidationWrapperV1 } from '../src';
import { Nullable } from '../typings/Types';

interface Example1State {
  value: string;
}

class Example1 extends React.Component<{}, Example1State> {
  public state: Example1State = {
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
          <ValidationWrapperV1 validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onChange={(_, value) => this.setState({ value })} />
          </ValidationWrapperV1>
        </div>
      </ValidationContainer>
    );
  }
}

interface Example2State {
  value: string;
}

class Example2 extends React.Component<{}, Example2State> {
  public state: Example2State = {
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
          <ValidationWrapperV1 validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onChange={(_, value) => this.setState({ value })} />
          </ValidationWrapperV1>
        </div>
      </ValidationContainer>
    );
  }
}

interface Example3State {
  value: string;
}

class Example3 extends React.Component<{}, Example3State> {
  public state: Example3State = {
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
          <ValidationWrapperV1 validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onChange={(_, value) => this.setState({ value })} />
          </ValidationWrapperV1>
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

type Sex = 'male' | 'female';

interface Example4State {
  type: Nullable<Sex>;
  value: string;
}

class Example4 extends React.Component<{}, Example4State> {
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
          <Select
            items={['male', 'female'] as Sex[]}
            value={this.state.type}
            onChange={(_, value) => this.setState({ type: value })}
          />
          <ValidationWrapperV1 validationInfo={this.validateValue()} renderMessage={text('bottom')}>
            <Input value={this.state.value} onChange={(_, value) => this.setState({ value })} />
          </ValidationWrapperV1>
          <div style={{ height: 1000, backgroundColor: '#eee' }} />
          <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
        </div>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

interface Example5State {
  value: string;
}

class Example5 extends React.Component<{}, Example5State> {
  public state: Example5State = {
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
                <ValidationWrapperV1 validationInfo={this.validateValue()} renderMessage={text('bottom')}>
                  <Input value={this.state.value} onChange={(_, value) => this.setState({ value })} />
                </ValidationWrapperV1>
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

interface Example6State {
  value1: string;
  value2: string;
}

class Example6 extends React.Component<{}, Example6State> {
  public state: Example6State = {
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
            <ValidationWrapperV1 validationInfo={this.validateValue1()}>
              <Input value={this.state.value1} onChange={(_, value) => this.setState({ value1: value })} />
            </ValidationWrapperV1>
          </div>
          <div style={{ position: 'absolute', top: 20 }}>
            <ValidationWrapperV1 validationInfo={this.validateValue2()}>
              <Input value={this.state.value2} onChange={(_, value) => this.setState({ value2: value })} />
            </ValidationWrapperV1>
          </div>
        </div>
        <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

interface Example7State {
  value1: string;
  value2: string;
  value3: string;
}

class Example7 extends React.Component<{}, Example7State> {
  public state: Example7State = {
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
            <ValidationWrapperV1 validationInfo={this.validateValue(value1)}>
              <Input value={value1} onChange={(_, value) => this.setState({ value1: value })} />
            </ValidationWrapperV1>
          </div>
          <div style={{ padding: 20 }}>
            <ValidationWrapperV1 validationInfo={this.validateValue(value2)}>
              <Input value={value2} onChange={(_, value) => this.setState({ value2: value })} />
            </ValidationWrapperV1>
          </div>
          <div style={{ padding: 20 }}>
            <ValidationWrapperV1 validationInfo={this.validateValue(value3)}>
              <Input value={value3} onChange={(_, value) => this.setState({ value3: value })} />
            </ValidationWrapperV1>
          </div>
        </div>
        <Button onClick={() => this.container && this.container.submit()}>Отправить</Button>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
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
  });
