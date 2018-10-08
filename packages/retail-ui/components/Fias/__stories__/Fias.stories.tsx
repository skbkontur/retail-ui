import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Fias } from '../index';

storiesOf('Fias', module)
  .add('default', () => <Fias />)
  .add('with modal title', () => <ExampleFias title={'Адрес'} />)
  .add('with value', () => <ExampleFias value={MOCK_ADDRESS} />)
  .add('with search', () => <ExampleFias search={true} />)
  .add('error text', () => <ExampleFias error={'Error :('} />)
  .add('readonly', () => <ExampleFias readOnly={true} value={MOCK_ADDRESS} />)
  .add('custom icon and text', () => (
    <ExampleFias iconTitle={'HomeOffice'} btnTitle={'Юридический адресс'} />
  ));

const BASE_URL = 'https://api.dev.kontur/fias/v1/';
const MOCK_ADDRESS = {
  address: {
    region: {
      abbreviation: 'г',
      code: '7700000000000',
      fiasId: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
      id: '5c8b06f1-518e-496e-b683-7bf917e0d70b',
      level: 'Region',
      name: 'Москва'
    },
    street: {
      abbreviation: 'пл',
      code: '77000000000157500',
      fiasId: '8e39d017-db1c-413f-ae77-5f0d3b9e7ee9',
      id: '54e2b3a5-bf2a-453e-9126-bfb6f32a009d',
      level: 'Street',
      name: 'Красная'
    },
    house: {
      estateStatus: 'House',
      fiasId: '0c2c345f-cd7b-4011-9f3b-65095ab4c186',
      id: '0c2c345f-cd7b-4011-9f3b-65095ab4c186',
      number: '1',
      parentFiasId: '8e39d017-db1c-413f-ae77-5f0d3b9e7ee9',
      postalCode: '125009',
      structureStatus: 'None'
    }
  }
};

class ExampleFias extends React.Component<any> {
  public state = {
    value: this.props.value || {}
  };

  public render(): React.ReactNode {
    const { value, onChange, ...props } = this.props;
    return (
      <Fias
        baseUrl={BASE_URL}
        isShowAddressText={true}
        value={this.state.value}
        onChange={this._handleChange}
        {...props}
      />
    );
  }

  private _handleChange = (value: any) => {
    this.setState({ value });
  };
}
