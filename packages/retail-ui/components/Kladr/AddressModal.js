
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';

import Button from '../Button';
import ComboBox from '../ComboBoxOld';
import Gapped from '../Gapped';
import Input from '../Input';
import Modal from '../Modal';

import { search, verify } from './KladrAPI';
import type { Address, Place, PlaceDescription, VerifyResult } from './Types';
import * as util from './util';

import styles from './AddressModal.less';

type Props = {
  address: Address,
  title: string,
  onChange: (value: { address: Address }) => void,
  onClose: () => void
};

type State = {
  address: Address,
  invalidField: ?string
};

type Info = {
  searchText: string,
  address: Address
};
type SourceResult = {
  values: Array<PlaceDescription>,
  infos: Array<Info>
};
type SourceFunction = (searchText: string) => Promise<SourceResult>;
type HandlerFunction = (e: any, value: PlaceDescription, info?: Info) => void;
type FieldProps = {
  source: SourceFunction,
  onChange: HandlerFunction,
  renderItem: Function,
  renderValue: Function,
  valueToString: (value: PlaceDescription) => string,
  recover: Function
};
type SimpleFieldProps = {
  onChange: (event: mixed, value: string) => void
};

const PLACES = {
  '0': 'index',
  '1': 'region',
  '2': 'district',
  '4': 'city',
  '8': 'settlement',
  '16': 'street'
};

export default class AddressModal extends React.Component<Props, State> {
  _regionProps: FieldProps;
  _districtProps: FieldProps;
  _cityProps: FieldProps;
  _settlementProps: FieldProps;
  _streetProps: FieldProps;
  _houseProps: SimpleFieldProps;
  _buildingProps: SimpleFieldProps;
  _roomProps: SimpleFieldProps;

  _verifyPromise: ?Promise<VerifyResult>;

  constructor(props: Props) {
    super(props);

    this.state = {
      address: props.address || {},
      invalidField: null
    };

    this._regionProps = this.createFieldProps('region', [], 'Region');
    this._districtProps = this.createFieldProps(
      'district',
      ['region'],
      'District'
    );
    this._cityProps = this.createFieldProps(
      'city',
      ['region', 'district'],
      'City'
    );
    this._settlementProps = this.createFieldProps(
      'settlement',
      ['region', 'district', 'city'],
      'Settlement'
    );
    this._streetProps = this.createFieldProps(
      'street',
      ['region', 'district', 'city', 'settlement'],
      'Street'
    );
    this._houseProps = this.createSimpleFieldProps('house');
    this._buildingProps = this.createSimpleFieldProps('building');
    this._roomProps = this.createSimpleFieldProps('room');
  }

  createFieldProps(
    field: Place,
    parents: Array<Place>,
    level: string
  ): FieldProps {
    return {
      source: this.createSource(field, parents, level),
      onChange: this.createHandler(field),
      renderItem: this._renderItem.bind(this, field, parents),
      renderValue: renderValue.bind(null, field),
      valueToString: renderValue.bind(null, field),
      recover
    };
  }

  createSimpleFieldProps(
    field: 'house' | 'room' | 'building'
  ): SimpleFieldProps {
    return {
      onChange: (event, value) => {
        const address: $Shape<Address> = {
          ...this.state.address,
          [field]: value
        };
        this.setState({ address });
      }
    };
  }

  createHandler(place: string): HandlerFunction {
    return (e, value, info) => {
      const address = { ...this.state.address };
      if (info) {
        for (const item in PLACES) {
          const itemPlace = PLACES[item];
          if (itemPlace !== place && info.address[itemPlace]) {
            address[itemPlace] = info.address[itemPlace];
          } else if (itemPlace === place) {
            address[place] = value;
            break;
          }
        }
      } else if (value.name) {
        address[place] = value;
      } else {
        address[place] = null;
      }

      this.setState({ address });
      this.check(address);
    };
  }

  check(address: Address) {
    const promise = verify(address);
    this._verifyPromise = promise;

    promise.then(result => {
      if (promise !== this._verifyPromise) {
        return;
      }
      this._verifyPromise = null;

      let invalidField = null;
      if (!result.isKladrAddress) {
        invalidField = PLACES[result.invalidItem];
      }
      this.setState({
        address: {
          ...this.state.address, // Saving the `building` field.
          ...result.address
        },
        invalidField
      });
    });
  }

  createSource(field: string, parents: Array<Place>, level: string) {
    return (searchText: string) => {
      let parentCode = null;
      for (const parentName of parents) {
        const parent = this.state.address[parentName];
        if (parent && typeof parent === 'object' && parent.code) {
          parentCode = parent.code;
        }
      }

      return search(searchText, `[${level}]`, parentCode).then(values => ({
        values: values.map(address => address[field]),
        infos: values.map(address => ({ searchText, address }))
      }));
    };
  }

  setStateAddress(key: string, value: PlaceDescription | string) {
    this.setState({
      address: {
        ...this.state.address,
        [key]: value
      }
    });
  }

  render() {
    return (
      <Modal width={520} onClose={this.props.onClose}>
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Body>{this._renderForm()}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={this._handleSave}>
              Сохранить
            </Button>
            <Button size="medium" onClick={this.props.onClose}>
              Отмена
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  _renderForm() {
    const { invalidField } = this.state;

    return (
      <Gapped vertical>
        <div className={styles.row}>
          <div className={styles.label}>Индекс</div>
          <div className={styles.field}>
            <Input
              value={this.state.address.index}
              width="100%"
              onChange={e => {
                this.setStateAddress('index', e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Регион</div>
          <div className={styles.field}>
            <ComboBox
              value={this.state.address.region}
              error={invalidField === 'region'}
              placeholder="Можно вводить код или название"
              width="100%"
              {...this._regionProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Район</div>
          <div className={styles.field}>
            <ComboBox
              value={this.state.address.district}
              error={invalidField === 'district'}
              width="100%"
              {...this._districtProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Город</div>
          <div className={styles.field}>
            <ComboBox
              value={this.state.address.city}
              error={invalidField === 'city'}
              width="100%"
              {...this._cityProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Населенный пункт</div>
          <div className={styles.field}>
            <ComboBox
              value={this.state.address.settlement}
              error={invalidField === 'settlement'}
              width="100%"
              {...this._settlementProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Улица</div>
          <div className={styles.field}>
            <ComboBox
              value={this.state.address.street}
              error={invalidField === 'street'}
              width="100%"
              {...this._streetProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Дом</div>
          <div className={styles.field}>
            <Input
              value={this.state.address.house}
              width={100}
              {...this._houseProps}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Корпус</div>
          <div className={styles.field}>
            <Input
              value={this.state.address.building || ''}
              width={100}
              {...this._buildingProps}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Квартира / офис</div>
          <div className={styles.field}>
            <Input
              value={this.state.address.room}
              width="100px"
              {...this._roomProps}
            />
          </div>
        </div>
      </Gapped>
    );
  }

  _renderItem(
    field: Place,
    parents: Array<Place>,
    place: PlaceDescription,
    info: Info
  ) {
    const parentNames = [];
    for (let i = parents.length - 1; i >= 0; --i) {
      const parentField = parents[i];
      if (this.state.address[parentField]) {
        break;
      }

      const parent = info.address[parentField];
      if (parent && typeof parent === 'object') {
        let parentName = parent.name;
        if (parentField === 'region') {
          parentName = parent.code.substr(0, 2) + ' ' + parentName;
        }
        parentNames.unshift(parentName);
      }
    }
    return (
      <div>
        {util.placeName(place, field)}
        {parentNames.length > 0 && (
          <div className={styles.menuItemParents}>{parentNames.join(', ')}</div>
        )}
      </div>
    );
  }

  _handleSave = () => {
    this.props.onChange({ address: this.state.address });
    this.props.onClose();
  };
}

function renderValue(type: Place, place: ?PlaceDescription) {
  return place ? util.placeName(place, type) : 'null';
}

function recover(searchText) {
  return {
    value: { name: searchText }
  };
}
