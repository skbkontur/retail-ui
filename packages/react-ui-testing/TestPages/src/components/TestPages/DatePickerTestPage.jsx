import React from 'react';
import { DatePicker } from '@skbkontur/react-ui/components/DatePicker';

import { Case, CaseSuite } from '../Case';

export default class DatePickerTestPage extends React.Component {
  state = {
    date1: '29.08.2016',
    date2: '31.12.2017',
  };

  render(): React.Element<*> {
    return (
      <CaseSuite title="Дейтпикеры">
        <Case title="Простой дейтпикер">
          <Case.Body>
            <DatePicker
              data-tid="SimpleDatePicker"
              value={this.state.value}
              onValueChange={value => this.setState({ value: value })}
            />
          </Case.Body>
        </Case>
        <Case title="Дейтпикер с датой">
          <Case.Body>
            <DatePicker
              data-tid="FilledDatePicker"
              value={this.state.date1}
              onValueChange={value => this.setState({ date1: value })}
            />
          </Case.Body>
        </Case>
        <Case title="Задизабленный дейтпикер с датой">
          <Case.Body>
            <DatePicker
              data-tid="DisabledDatePicker"
              value={this.state.date2}
              onValueChange={value => this.setState({ date2: value })}
              disabled={true}
            />
          </Case.Body>
        </Case>
      </CaseSuite>
    );
  }
}
