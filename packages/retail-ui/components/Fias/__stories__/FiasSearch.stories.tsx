import { action } from '@storybook/addon-actions';
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import FiasSearch from '../FiasSearch';
import { Address } from '../models/Address';

const BASE_URL = 'https://api.testkontur.ru/fias/v1/';
const MOCK_RESPONSE = require('../api/data.json')[0];
const MOCK_VALUE = Address.createFromResponse(MOCK_RESPONSE).getValue(false);

storiesOf('FiasSearch', module)
  .add('default', () => <ExampleFiasSearch />)
  .add('placeholder', () => <ExampleFiasSearch locale={{searchPlaceholder: "А-та-та плэйсхолдер"}}/>)
  .add('predefined', () => <ExampleFiasSearch value={{ addressString: MOCK_VALUE.addressString }} />)
  .add('error', () => <ExampleFiasSearch error />)
  .add('warning', () => <ExampleFiasSearch warning />);


class ExampleFiasSearch extends React.Component<any> {
  public state = {
    value: this.props.value || {},
  };

  public render(): React.ReactNode {
    return (
      <FiasSearch
        {...this.props}
        baseUrl={BASE_URL}
        value={this.state.value}
        onChange={this.handleChange}
        width={500}
      />
    );
  }

  private handleChange = (value: any) => {
    this.setState({ value });
    action("change")(value);
  };
}
