import React from 'react';
import { Input } from '@skbkontur/react-ui/components/Input';

import { CaseSuite, Case } from '../Case';

export default class InputTextPage extends React.Component {
  state = {
    input1: '',
    input2: '',
    input3: '',
  };

  render() {
    return (
      <CaseSuite title="Списки">
        <Case title="Hardcoded-список инпутов без tid-ов">
          <Case.Body data-tid="InputWithoutTidList">
            <Input value={this.state.input1} onValueChange={value => this.setState({ input1: value })} />
            <Input value={this.state.input2} onValueChange={value => this.setState({ input2: value })} />
            <Input value={this.state.input3} onValueChange={value => this.setState({ input3: value })} />
          </Case.Body>
        </Case>
        <Case title="Список составных read-only элементов ">
          <Case.Body data-tid="CompositeReadonlyElementList">
            <div data-tid="Item">
              <div data-tid="Value1">Value 11</div>
              <div data-tid="Value2">Value 12</div>
            </div>
            <div data-tid="Item">
              <div data-tid="Value1">Value 21</div>
              <div data-tid="Value2">Value 22</div>
            </div>
            <div data-tid="Item">
              <div data-tid="Value1">Value 31</div>
              <div data-tid="Value2">Value 32</div>
            </div>
          </Case.Body>
        </Case>
        <Case title="Список без корневого tid-а">
          <Case.Body data-tid="NoRootTidList">
            <div data-tid="Item">
              <div data-tid="Value1">NoRoot Value 11</div>
              <div data-tid="Value2">NoRoot Value 12</div>
            </div>
            <div data-tid="Item">
              <div data-tid="Value1">NoRoot Value 21</div>
              <div data-tid="Value2">NoRoot Value 22</div>
            </div>
            <div data-tid="Item">
              <div data-tid="Value1">NoRoot Value 31</div>
              <div data-tid="Value2">NoRoot Value 32</div>
            </div>
          </Case.Body>
        </Case>
        <Case title="Список списков">
          <Case.Body data-tid="ListOfLists">
            <div data-tid="Table">
              <div data-tid="TableItems">
                <div data-tid="TableItem">row11</div>
                <div data-tid="TableItem">row12</div>
                <div data-tid="TableItem">row13</div>
              </div>
            </div>
            <div data-tid="Table">
              <div data-tid="TableItems">
                <div data-tid="TableItem">row21</div>
                <div data-tid="TableItem">row22</div>
                <div data-tid="TableItem">row23</div>
              </div>
            </div>
            <div data-tid="Table">
              <div data-tid="TableItems">
                <div data-tid="TableItem">row31</div>
                <div data-tid="TableItem">row32</div>
              </div>
            </div>
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
