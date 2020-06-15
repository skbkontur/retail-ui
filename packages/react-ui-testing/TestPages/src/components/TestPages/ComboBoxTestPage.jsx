import React from 'react';
import { ComboBox } from '@skbkontur/react-ui/components/ComboBox';

import { Case, CaseSuite } from '../Case';

function withDelay(timeout, result) {
  return (...args) => new Promise(resolve => setTimeout(() => resolve(result(...args)), timeout));
}

const testItems = [
  { id: '1', value1: 'Item 1', value2: 'Item Second Value 1' },
  { id: '2', value1: 'Item 2', value2: 'Item Second Value 2' },
  { id: '3', value1: 'Item 3', value2: 'Item Second Value 3' },
  { id: '4', value1: 'Item 4', value2: 'Item Second Value 4' },
  { id: '5', value1: 'Item 5', value2: 'Item Second Value 5' },
  { id: '6', value1: 'Item 6', value2: 'Item Second Value 6' },
  { id: '7', value1: 'Item 7', value2: 'Item Second Value 7' },
  { id: '8', value1: 'Item 8', value2: 'Item Second Value 8' },
  { id: '9', value1: 'Item 9', value2: 'Item Second Value 9' },
  { id: '10', value1: 'Item 10', value2: 'Item Second Value 10' },
  { id: '11', value1: 'Item 11', value2: 'Item Second Value 11' },
  { id: '12', value1: 'Item 12', value2: 'Item Second Value 12' },
  { id: '13', value1: 'Item 13', value2: 'Item Second Value 13' },
  { id: '14', value1: 'Item 14', value2: 'Item Second Value 14' },
  { id: '15', value1: 'Item 15', value2: 'Item Second Value 15' },
  { id: '16', value1: 'Item 16', value2: 'Item Second Value 16' },
  { id: '17', value1: 'Item 17', value2: 'Item Second Value 17' },
];

export default class ComboBoxTestPage extends React.Component {
  state = {
    simpleComboBoxValue: null,
    filledComboBoxValue: testItems[0],
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Комбобоксы">
        <Case title="Простой комбобокс">
          <Case.Body>
            <ComboBox
              data-tid="SimpleComboBox"
              getItems={withDelay(1000, q => testItems.filter(x => x.value1.includes(q)))}
              value={this.state.simpleComboBoxValue}
              onValueChange={value => this.setState({ simpleComboBoxValue: value })}
              renderItem={x => x.value1}
              valueToString={x => x.value1}
              renderValue={x => x.value1}
              itemToValue={x => x.id}
            />
          </Case.Body>
        </Case>
        <Case title="Комбобокс без портала">
          <Case.Body style={{ height: '500px' }}>
            <ComboBox
              data-tid="ComboBoxNoPortal"
              disablePortal
              getItems={withDelay(1000, q => testItems.filter(x => x.value1.includes(q)))}
              value={this.state.simpleComboBoxValue}
              onValueChange={value => this.setState({ simpleComboBoxValue: value })}
              renderItem={x => x.value1}
              valueToString={x => x.value1}
              renderValue={x => x.value1}
              itemToValue={x => x.id}
            />
          </Case.Body>
        </Case>

        <Case title="Заблокированный комбобокс">
          <Case.Body>
            <ComboBox data-tid="DisabledComboBox" value={''} getItems={() => Promise.resolve({})} disabled />
          </Case.Body>
        </Case>

        <Case title="Заполненный комбобокс">
          <Case.Body>
            <ComboBox
              data-tid="FilledComboBox"
              getItems={withDelay(1000, q => testItems.filter(x => x.value1.includes(q)))}
              value={this.state.filledComboBoxValue}
              onValueChange={value => this.setState({ filledComboBoxValue: value })}
              renderItem={x => x.value1}
              valueToString={x => x.value1}
              renderValue={x => x.value1}
              itemToValue={x => x.id}
            />
          </Case.Body>
        </Case>
        <Case title="Комбобокс, который ничего не находит">
          <Case.Body>
            <ComboBox
              data-tid="NotFoundComboBox"
              getItems={withDelay(2000, q => [])}
              value={null}
              renderItem={x => x.value1}
              valueToString={x => x.value1}
              renderValue={x => x.value1}
              itemToValue={x => x.id}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
