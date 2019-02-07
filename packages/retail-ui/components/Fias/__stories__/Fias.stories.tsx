import * as React from 'react';
import { storiesOf } from '@storybook/react';
import HomeOfficeIcon from '@skbkontur/react-icons/HomeOffice';
import { Fias } from '../Fias';
import { FiasForm } from '../Form/FiasForm';
import { FiasModal } from '../FiasModal';
import { FiasAPI } from '../api/FiasAPI';
import { Address } from '../models/Address';
import { defaultLocale } from '../constants/locale';
import { MockAPI } from '../api/MockAPI';

const BASE_URL = 'https://api.dev.kontur/fias/v1/';
const MOCK_RESPONSE = require('../api/data.json')[0];
const MOCK_VALUE = Address.createFromResponse(MOCK_RESPONSE).getValue();
const mockApi = new MockAPI();

storiesOf('Fias', module)
  .add('default', () => <Fias />)
  .add('with address value', () => (
    <ExampleFias value={{ address: MOCK_VALUE.address }} />
  ))
  .add('with stringAddress', () => (
    <ExampleFias value={{ addressString: MOCK_VALUE.addressString }} />
  ))
  .add('with fiasId', () => (
    <ExampleFias value={{ fiasId: MOCK_VALUE.fiasId }} />
  ))
  .add('with fias version', () => (
    <ExampleFias value={{ fiasId: MOCK_VALUE.fiasId }} version={'2016-08-25'} />
  ))
  .add('with search', () => <ExampleFias search={true} />)
  .add('with fetch error', () => (
    <ExampleFias
      value={{ fiasId: '3f0affe0-0e2e-4c52-bd20-94767632f968-000-000-000' }}
    />
  ))
  .add('with feedback', () => (
    <ExampleFias error={true} feedback={'Заполнено не по ФИАСу'} />
  ))
  .add('readonly', () => <ExampleFias readonly={true} value={MOCK_VALUE} />)
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
  .add('with mockAPI', () => (
    <ExampleFias api={mockApi} value={MOCK_VALUE} search={true} />
  ))
  .add('modal', () => {
    const api = new FiasAPI(BASE_URL);
    return (
      <FiasModal locale={defaultLocale}>
        <FiasForm api={api} locale={defaultLocale} address={new Address()} />
      </FiasModal>
    );
  })
  .add('with additional fields', () => (
    <ExampleFias
      fieldsSettings={{ postalcode: { visible: true } }}
      value={{ ...MOCK_VALUE, ...{ postalCode: '555555' } }}
    />
  ));

class ExampleFias extends React.Component<any> {
  public state = {
    value: this.props.value || {}
  };

  public render(): React.ReactNode {
    const { value, onChange, ...props } = this.props;
    const { addressErrors } = this.state.value;
    const error = addressErrors && Object.keys(addressErrors).length > 0;
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
