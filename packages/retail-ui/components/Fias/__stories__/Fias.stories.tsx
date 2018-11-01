import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HomeOfficeIcon from '@skbkontur/react-icons/HomeOffice';
import { Fias } from '../index';
import FiasForm from '../Form/FiasForm';
import FiasModal from '../FiasModal';
import { AddressObject, FiasValue } from '../types';
import { FiasAPI } from '../FiasAPI';
import { Address } from '../models/Address';
import { defaultLocale } from '../constants/locale';

storiesOf('Fias', module)
  .add('default', () => <Fias baseUrl={''} />)
  .add('with address value', () => (
    <ExampleFias value={{ address: MOCK_ADDRESS_VALUE.address }} />
  ))
  .add('with stringAddress', () => (
    <ExampleFias value={{ addressString: MOCK_ADDRESS_VALUE.addressString }} />
  ))
  .add('with fiasId', () => (
    <ExampleFias value={{ fiasId: MOCK_ADDRESS_VALUE.fiasId }} />
  ))
  .add('with search', () => <ExampleFias search={true} />)
  .add('with feedback', () => (
    <ExampleFias error={true} feedback={'Заполнено не по ФИАСу'} />
  ))
  .add('readonly', () => (
    <ExampleFias readonly={true} value={MOCK_ADDRESS_VALUE} />
  ))
  .add('customized', () => (
    <ExampleFias
      icon={<HomeOfficeIcon />}
      label={'Юридический адресс'}
      locale={{
        modalTitle: 'Юридический адрес',
        modalButtonOk: '👍',
        modalButtonCancel: '👎'
      }}
    />
  ))
  .add('modal', () => {
    const api = new FiasAPI(BASE_URL);
    return (
      <FiasModal locale={defaultLocale}>
        <FiasForm
          api={api}
          locale={defaultLocale}
          address={Address.createFromAddressValue(MOCK_ADDRESS_VALUE.address!)}
        />
      </FiasModal>
    );
  });

const BASE_URL = 'https://api.dev.kontur/fias/v1/';
const MOCK_ADDRESS_VALUE: FiasValue = {
  address: {
    region: {
      name: 'Москва',
      data: {
        abbreviation: 'г',
        code: '7700000000000',
        fiasId: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
        id: '5c8b06f1-518e-496e-b683-7bf917e0d70b',
        level: 'Region',
        name: 'Москва'
      } as AddressObject
    },
    street: {
      // abbreviation: 'пл',
      // code: '77000000000157500',
      // fiasId: '8e39d017-db1c-413f-ae77-5f0d3b9e7ee9',
      // id: '54e2b3a5-bf2a-453e-9126-bfb6f32a009d',
      // level: 'Street',
      name: 'Красная'
    },
    house: {
      // estateStatus: 'House',
      // fiasId: '0c2c345f-cd7b-4011-9f3b-65095ab4c186',
      // id: '0c2c345f-cd7b-4011-9f3b-65095ab4c186',
      // number: '1',
      // parentFiasId: '8e39d017-db1c-413f-ae77-5f0d3b9e7ee9',
      // postalCode: '125009',
      // structureStatus: 'None',
      name: '1'
    }
  },
  addressString: 'город Москва, площадь Красная, дом 1',
  fiasId: '0c2c345f-cd7b-4011-9f3b-65095ab4c186'
};

class ExampleFias extends React.Component<any> {
  public state = {
    value: this.props.value || {}
  };

  public render(): React.ReactNode {
    const { value, onChange, ...props } = this.props;
    const { errorMessages } = this.state.value;
    const error = errorMessages && Object.keys(errorMessages).length > 0;
    return (
      <Fias
        baseUrl={BASE_URL}
        value={this.state.value}
        onChange={this.handleChange}
        error={error}
        {...props}
      />
    );
  }

  private handleChange = (value: any) => {
    this.setState({ value });
  };
}
