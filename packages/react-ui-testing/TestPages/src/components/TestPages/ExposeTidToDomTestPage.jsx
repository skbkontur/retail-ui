import React from 'react';
import { Button } from '@skbkontur/react-ui/components/Button';

import { CaseSuite, Case } from '../Case';

export default class InputTextPage extends React.Component {
  state = {
    case1State: 1,
    case2State: 1,
    case3State: 1,
    case4State: 1,
    case5State: 1,
    case6State: 1,
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Механизм переноса props-ов в DOM">
        <Case title="Разные элементы переключаются между одним дом элементом" data-tid="SameDomElementCase">
          <Case.Body>
            {this.state.case1State == 1 ? (
              <Container data-tid="State1" title="Состояние 1">
                Контент 1
              </Container>
            ) : (
              <Container data-tid="State2" title="Состояние 2">
                Контент 2
              </Container>
            )}
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case1State: this.state.case1State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>
        <Case
          title="Разные элементы переключаются между одним дом элементом (указан key)"
          data-tid="SameDomElementWithKeyCase"
        >
          <Case.Body>
            {this.state.case2State == 1 ? (
              <Container key="State1" data-tid="State1" title="Состояние 1">
                Контент 1
              </Container>
            ) : (
              <Container key="State2" data-tid="State2" title="Состояние 2">
                Контент 2
              </Container>
            )}
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case2State: this.state.case2State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>
        <Case title="Смена data-tid атрибута" data-tid="ChangeDataTidCase">
          <Case.Body>
            <Container
              data-tid={this.state.case3State == 1 ? 'State1' : 'State2'}
              title={this.state.case3State == 1 ? 'Состояние 1' : 'Состояние 2'}
            >
              {this.state.case3State == 1 ? 'Контент 1' : 'Контент 2'}
            </Container>
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case3State: this.state.case3State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>

        <Case title="Вложения корневых компонент" data-tid="NestingComponentsCase">
          <Case.Body>
            <NestingContainer data-tid={'NestingComponentsContainer'} state={this.state.case4State} />
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case4State: this.state.case4State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>

        <Case title="Вложения dom-элементов" data-tid="NestingDomElementsCase">
          <Case.Body>
            <NestingContainer data-tid={'NestingDomContainer'} state={this.state.case5State} />
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case5State: this.state.case5State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>

        <Case title="Двойное вложения комопнент" data-tid="DoubleNestingComponentsCase">
          <Case.Body>
            <DoubleNestingContainer data-tid={'DoubleNestingContainer'} state={this.state.case6State} />
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case6State: this.state.case6State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>

        <Case title="Неверное расположение тэгов" data-tid="DivInsideParagraphCase">
          <Case.Body>
            <p>
              <div data-tid="DivInsideParagraph">Value</div>
            </p>
          </Case.Body>
        </Case>

        <Case title="Таблица" data-tid="TableCase">
          <Case.Body>
            <table data-tid="SimpleTable">
              <thead>
                <tr>
                  <th data-tid="Header1">Header 1</th>
                  <th data-tid="Header2">Header 2</th>
                </tr>
              </thead>
              <tbody data-tid="Rows">
                <tr data-tid="Row">
                  <td data-tid="Cell1">Cell 11</td>
                  <td data-tid="Cell2">Cell 12</td>
                </tr>
                <tr data-tid="Row">
                  <td data-tid="Cell1">Cell 21</td>
                  <td data-tid="Cell2">Cell 22</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td data-tid="Footer1">Footer 1</td>
                  <td data-tid="Footer2">Footer 2</td>
                </tr>
              </tfoot>
            </table>
            <DoubleNestingContainer data-tid={'DoubleNestingContainer'} state={this.state.case6State} />
            <Button
              data-tid="SwitchState"
              onClick={() => this.setState({ case6State: this.state.case6State == 1 ? 2 : 1 })}
            >
              Переключить состояние
            </Button>
          </Case.Body>
        </Case>

        <Case title="Фильтрация пропсов" data-tid="PropsFilteringCase">
          <Case.Body>
            <SomeComponent data-tid="Component1" customProp1={'value-1'} customProp2={'value-0'} />
            <PrefixSomeComponentSuffix data-tid="Component2" customProp2={'value-2'} />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}

function DoubleNestingContainer({ state }) {
  return <NestingContainer state={state} />;
}

function NestingContainer({ state }) {
  if (state === 1) {
    return <NestedComp1 />;
  }
  return <NestedComp2 />;
}

function NestedComp1() {
  return <div>Вложение 1</div>;
}

function NestedComp2() {
  return <span>Вложение 2</span>;
}

function NestingContainerOfDomElement({ state }) {
  if (state === 1) {
    return <div>Вложение 1</div>;
  }
  return <span>Вложение 2</span>;
}

function SomeComponent() {
  return <div>Text</div>;
}

function PrefixSomeComponentSuffix() {
  return <div>Text</div>;
}

function Container({ children, title }) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
