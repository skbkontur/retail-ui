import * as React from 'react';
import { Address } from './Types';
import { Nullable } from '../../typings/utility-types';

export interface AddressModalProps {
  address: Address;
  title: string;
  onChange: (
    value: {
      address: Address;
    }
  ) => void;
  onClose: () => void;
}

export interface AddressModalState {
  address: Address;
  invalidField: Nullable<string>;
}

export default class AddressModal extends React.Component<
  AddressModalProps,
  AddressModalState
> {
  private _regionProps;
  private _districtProps;
  private _cityProps;
  private _settlementProps;
  private _streetProps;
  private _houseProps;
  private _buildingProps;
  private _roomProps;
  private _verifyPromise;
  private createFieldProps;
  private createSimpleFieldProps;
  private createHandler;
  private check;
  private createSource;
  private handleChangeIndexField;
  private _renderForm;
  private _renderItem;
  private _handleSave;

  constructor(props: AddressModalProps);
  public render(): JSX.Element;
}
