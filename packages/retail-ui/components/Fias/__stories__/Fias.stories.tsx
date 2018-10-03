import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { Fias } from '../index';

storiesOf('Fias', module)
  .add('default', () => <Fias />)
  .add('with modal title', () => <ExampleFias title={'Адрес'} />)
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
      actuality: true,
      code: '7800000000000',
      fiasId: 'c2deb16a-0330-4f05-821f-1d09c93331e6',
      id: 'aad1469e-54ff-4605-af4f-f016c75b84d2',
      ifnsfl: '7800',
      ifnsul: '7800',
      level: 'Region',
      name: 'Санкт-Петербург',
      okato: '40000000000',
      oktmo: '40000000',
      postalCode: '190000'
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
