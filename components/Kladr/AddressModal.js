/* @flow */

import React from 'react';

import Button from '../Button';
import ComboBox from '../ComboBox';
import Gapped from '../Gapped';
import Input from '../Input';
import Modal from '../Modal';
import Select from '../Select';

import {search} from './KladrAPI';
import type {Address, PlaceDescription} from './Types';

import styles from './AddressModal.less';

type Props = {
  address: Address,
  onClose: () => void,
};

type State = {
  address: Address,
};

type SourceFunction = (searchText: string) => Promise<PlaceDescription>;
type HandlerFunction = (e: any, value: PlaceDescription) => void;
type FieldProps = {
  source: SourceFunction,
  onChange: HandlerFunction,
  renderItem: Function,
  renderValue: Function,
  recover: Function,
}

export default class AddressModal extends React.Component {
  props: Props;
  state: State;

  _regionProps: FieldProps;
  _districtProps: FieldProps;
  _cityProps: FieldProps;
  _settlementProps: FieldProps;
  _streetProps: FieldProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      address: props.address || {},
    };

    this._regionProps = this.createFieldProps('region', [], 'Region');
    this._districtProps = this.createFieldProps(
      'district', ['region'], 'District'
    );
    this._cityProps = this.createFieldProps(
      'city', ['region', 'district'], 'City'
    );
    this._settlementProps = this.createFieldProps(
      'settlement', ['region', 'district', 'city'], 'Settlement'
    );
    this._streetProps = this.createFieldProps(
      'street', ['region', 'district', 'city', 'settlement'], 'Street'
    );
  }

  createFieldProps(field: string, parents: Array<string>, level: string): FieldProps {
    return {
      source: this.createSource(field, parents, level),
      onChange: this.createHandler(field),
      renderItem: renderValueOrItem,
      renderValue: renderValueOrItem,
      recover: recover,
    }
  }

  createHandler(place: string): HandlerFunction {
    return (e, value) => {
      this.setState({
        address: {
          ...this.state.address,
          [place]: value,
        }
      })
    }
  }

  createSource(field: string, parents: Array<string>, level: string): SourceFunction {
    return (searchText) => {
      let parentCode = null;
      for (let parentName of parents) {
        const parent = this.state.address[parentName];
        if (parent && parent.code) {
          parentCode = parent.code;
          break;
        }
      }

      return search(searchText, `[${level}]`, parentCode).then((values) => ({
        values: values.map(address => address[field]),
      }));
    };
  }

  render() {
    return (
      <Modal width={520} onClose={this.props.onClose}>
        <Modal.Header>123</Modal.Header>
        <Modal.Body>
          {this._renderForm()}
        </Modal.Body>
        <Modal.Footer>
          <Gapped>
            <Button>Сохранить</Button>
            <Button onClick={this.props.onClose}>Отмена</Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  _renderForm() {
    return (
      <Gapped vertical>
        <div className={styles.row}>
          <div className={styles.label}>Индекс</div>
          <div className={styles.field}>
            <Input width="100%" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Регион</div>
          <div className={styles.field}>
            <ComboBox value={this.state.address.region} {...this._regionProps} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Район</div>
          <div className={styles.field}>
            <ComboBox value={this.state.address.district}
              {...this._districtProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Город</div>
          <div className={styles.field}>
            <ComboBox value={this.state.address.city}
              {...this._cityProps}
              />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Населенный пункт</div>
          <div className={styles.field}>
            <ComboBox value={this.state.address.settlement}
              {...this._settlementProps}
              />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Улица</div>
          <div className={styles.field}>
            <ComboBox value={this.state.address.street}
              {...this._streetProps}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            <Select width="100%" items={[]} />
          </div>
          <div className={styles.field}>
            <Input width="100px" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>
            <Select width="100%" items={[]} />
          </div>
          <div className={styles.field}>
            <Input width="100px" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>
            <Select width="100%" items={[]} />
          </div>
          <div className={styles.field}>
            <Input width="100px" />
          </div>
        </div>
      </Gapped>
    );
  }
}

function renderValueOrItem(place) {
  return place ? place.name : 'null';
}

function recover(searchText) {
  return {
    value: {name: searchText},
  };
}
