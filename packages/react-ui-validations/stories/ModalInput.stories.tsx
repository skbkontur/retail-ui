import { storiesOf } from '@storybook/react';
import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Center } from '@skbkontur/react-ui/components/Center';
import { Input } from '@skbkontur/react-ui/components/Input';
import { Modal } from '@skbkontur/react-ui/components/Modal';

import { text, ValidationContainer, ValidationInfo, ValidationWrapper } from '../src';
import { Nullable } from '../typings/Types';

storiesOf('ModalWithSingleInput', module)
  .add('Example1', () => <ModalInputStory />)
  .add('Example2', () => <SmallModalInputStory />);

interface ModalInputStoryState {
  value: string;
}

class ModalInputStory extends React.Component<{}, ModalInputStoryState> {
  public state = {
    value: '',
  };

  private container: ValidationContainer | null = null;

  public validateValue1(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return {
        message: 'Значение должно состоять из двух слов',
        type: 'lostfocus',
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer scrollOffset={115} ref={this.refContainer}>
        <Modal>
          <Modal.Header>Заголовок</Modal.Header>
          <Modal.Body>
            <div style={{ padding: 10 }}>
              <div
                style={{
                  height: 1000,
                  backgroundColor: '#eee',
                }}
              />
              <div
                data-tid="ClickArea"
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                  padding: 10,
                  border: '1px solid #ddd',
                }}
              >
                Click here
              </div>
              <ValidationWrapper
                data-tid="ValidationWrapper"
                validationInfo={this.validateValue1()}
                renderMessage={text('bottom')}
              >
                <Input
                  data-tid="SingleInput"
                  value={this.state.value}
                  onValueChange={value => this.setState({ value })}
                />
              </ValidationWrapper>
              <div
                style={{
                  height: 1000,
                  backgroundColor: '#eee',
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.container && this.container.submit()} use="primary">
              Кнопка
            </Button>
          </Modal.Footer>
        </Modal>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
}

interface SmallModalInputStoryState {
  value: string;
}

class SmallModalInputStory extends React.Component<{}, SmallModalInputStoryState> {
  public state: SmallModalInputStoryState = {
    value: '',
  };

  private container: ValidationContainer | null = null;
  private outerContainer: ValidationContainer | null = null;

  public componentDidMount() {
    window.scrollTo(1000, 1000);
  }

  public validateValue(): Nullable<ValidationInfo> {
    const { value } = this.state;
    if (value === '') {
      return { message: 'Должно быть не пусто', type: 'submit' };
    }
    if (value.split(' ').length !== 2) {
      return {
        message: 'Значение должно состоять из двух слов',
        type: 'lostfocus',
      };
    }
    return null;
  }

  public render() {
    return (
      <ValidationContainer ref={this.refOuterContainer}>
        <div>
          <h1>
            <Center>Header</Center>
          </h1>
          <div
            style={{
              height: 3000,
              width: 3000,
              background: `repeating-linear-gradient(
                              45deg,
                              #606dbc,
                              #606dbc 10px,
                              #465298 10px,
                              #465298 20px
                            )`,
            }}
          />

          <ValidationWrapper
            data-tid="ValidationWrapper"
            validationInfo={this.validateValue()}
            renderMessage={text('bottom')}
          >
            <Input data-tid="SingleInput" value={this.state.value} onValueChange={value => this.setState({ value })} />
          </ValidationWrapper>
          <h2>
            <Center>Footer</Center>
          </h2>
        </div>

        <Modal>
          <ValidationContainer scrollOffset={115} ref={this.refContainer}>
            <Modal.Header>Заголовок</Modal.Header>
            <Modal.Body>
              <div style={{ padding: 10 }}>
                <div
                  data-tid="ClickArea"
                  style={{
                    textAlign: 'center',
                    marginBottom: 10,
                    padding: 10,
                    border: '1px solid #ddd',
                  }}
                >
                  Click here
                </div>
                <ValidationWrapper
                  data-tid="ValidationWrapper"
                  validationInfo={this.validateValue()}
                  renderMessage={text('bottom')}
                >
                  <Input
                    data-tid="SingleInput"
                    value={this.state.value}
                    onValueChange={value => this.setState({ value })}
                  />
                </ValidationWrapper>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  if (this.container) {
                    this.container.submit();
                  }
                  if (this.outerContainer) {
                    this.outerContainer.submit();
                  }
                }}
                use="primary"
              >
                Кнопка
              </Button>
            </Modal.Footer>
          </ValidationContainer>
        </Modal>
      </ValidationContainer>
    );
  }

  private refContainer = (el: ValidationContainer | null) => (this.container = el);
  private refOuterContainer = (el: ValidationContainer | null) => (this.outerContainer = el);
}
