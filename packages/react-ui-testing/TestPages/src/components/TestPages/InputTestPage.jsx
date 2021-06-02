import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';
import { Input } from '@skbkontur/react-ui/components/Input';

import { CaseSuite, Case } from '../Case';

export default class InputTextPage extends React.Component {
  state = {
    simpleInputValue: '',
    inputWithDelayValue: '',
    inputAppearsAfterTimeout: '',
    showInput: false,
  };

  render() {
    return (
      <CaseSuite title="Текстовые поля">
        <Case title="Простой инпут">
          <Case.Body>
            <Input
              data-tid="SimpleInput"
              value={this.state.simpleInputValue}
              onValueChange={value => this.setState({ simpleInputValue: value })}
            />
          </Case.Body>
        </Case>

        <Case title="Задизабленный инпут">
          <Case.Body>
            <Input
              data-tid="DisabledInput"
              disabled
              value={this.state.simpleInputValue}
              onValueChange={value => this.setState({ simpleInputValue: value })}
            />
          </Case.Body>
        </Case>

        <Case title="Инпут появляющийся после нажатия кнопки">
          <Case.Body>
            <Button
              data-tid="ShowInputAppearsAfterTimeout"
              onClick={() =>
                !this.state.showInput
                  ? setTimeout(() => this.setState({ showInput: true }), 2000)
                  : this.setState({ showInput: false })
              }
            >
              Показать инпут с задержкой
            </Button>
            {this.state.showInput && (
              <Input
                data-tid="InputAppearsAfterTimeout"
                value={this.state.inputAppearsAfterTimeout}
                onValueChange={value => this.setState({ inputAppearsAfterTimeout: value })}
              />
            )}
          </Case.Body>
        </Case>

        <Case title="Инпут с задержкой появления текста">
          <Case.Body>
            <Input
              data-tid="InputWithDelay"
              value={this.state.inputWithDelayValue}
              onValueChange={value => this.setState({ inputWithDelayValue: value })}
            />
            <Button
              data-tid="UpdateInputWithDelay"
              onClick={() => setTimeout(() => this.setState({ inputWithDelayValue: 'NewText' }), 1000)}
            >
              Показать текст с задержкой
            </Button>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
