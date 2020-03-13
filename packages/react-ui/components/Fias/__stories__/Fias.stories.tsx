import React from 'react';
import HomeOfficeIcon from '@skbkontur/react-icons/HomeOffice';

import { Fias } from '../Fias';
import { FiasForm } from '../Form/FiasForm';
import { FiasModal } from '../FiasModal';
import { FiasAPI } from '../api/FiasAPI';
import { FiasAddress } from '../models/FiasAddress';
import { FiasMockAPI } from '../api/FiasMockAPI';

const BASE_URL = 'https://api.testkontur.ru/fias/v1/';
const MOCK_RESPONSE = require('../api/data.json')[0];
const MOCK_VALUE = FiasAddress.createFromResponse(MOCK_RESPONSE).getValue(false);
const mockApi = new FiasMockAPI();

export default { title: 'Fias', parameters: { creevey: { skip: [true] } } };

export const Default = () => <Fias />;
Default.story = { name: 'default' };

export const WithAddressValue = () => <ExampleFias value={{ address: MOCK_VALUE.address }} />;
WithAddressValue.story = { name: 'with address value' };

export const WithStringAddress = () => <ExampleFias value={{ addressString: MOCK_VALUE.addressString }} />;
WithStringAddress.story = { name: 'with stringAddress' };

export const WithFiasId = () => <ExampleFias value={{ fiasId: MOCK_VALUE.fiasId }} />;
WithFiasId.story = { name: 'with fiasId' };

export const WithFiasVersion = () => <ExampleFias value={{ fiasId: MOCK_VALUE.fiasId }} version={'2016-08-25'} />;
WithFiasVersion.story = { name: 'with fias version' };

export const WithSearch = () => <ExampleFias search={true} />;
WithSearch.story = { name: 'with search' };

export const WithFetchError = () => (
  <ExampleFias value={{ fiasId: '3f0affe0-0e2e-4c52-bd20-94767632f968-000-000-000' }} />
);
WithFetchError.story = { name: 'with fetch error' };

export const WithFeedback = () => <ExampleFias error={true} feedback={'Заполнено не по ФИАСу'} />;
WithFeedback.story = { name: 'with feedback' };

export const Readonly = () => <ExampleFias readonly={true} value={MOCK_VALUE} />;
Readonly.story = { name: 'readonly' };

export const Customized = () => (
  <ExampleFias
    icon={<HomeOfficeIcon />}
    label={'Юридический адресс'}
    locale={{
      modalTitle: 'Юридический адрес',
      modalButtonOk: '👍',
      modalButtonCancel: '👎',
    }}
  />
);
Customized.story = { name: 'customized' };

export const WithMockApi = () => <ExampleFias api={mockApi} value={MOCK_VALUE} search={true} />;
WithMockApi.story = { name: 'with mockAPI' };

export const Modal = () => {
  const api = new FiasAPI(BASE_URL);
  return (
    <FiasModal>
      <FiasForm api={api} address={new FiasAddress()} />
    </FiasModal>
  );
};
Modal.story = { name: 'modal' };

export const WithFieldsSettings = () => (
  <ExampleFias
    fieldsSettings={{
      region: { visible: false },
      district: { visible: false },
      postalcode: { visible: true },
    }}
    value={{ ...MOCK_VALUE, ...{ postalCode: '555555' } }}
  />
);
WithFieldsSettings.story = { name: 'with fields settings' };

class ExampleFias extends React.Component<any> {
  public state = {
    value: this.props.value || {},
  };

  public render(): React.ReactNode {
    const { value, onValueChange, ...props } = this.props;
    const { addressErrors } = this.state.value;
    const error = addressErrors && Object.keys(addressErrors).length > 0;
    return (
      <Fias baseUrl={BASE_URL} value={this.state.value} onValueChange={this.handleChange} error={error} {...props} />
    );
  }

  private handleChange = (value: any) => {
    this.setState({ value });
  };
}
