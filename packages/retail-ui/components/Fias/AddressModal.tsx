import * as React from 'react';

// import { ValidationContainer, ValidationWrapperV1 } from 'react-ui-validations';

import Button from '../Button';
import Gapped from '../Gapped';
import Modal from '../Modal';

// временно, чтобы не дописывать именованный export в ComboBoxOld
const ComboBoxOld = require('../ComboBoxOld').default;

import { FiasAPI } from './FiasAPI';
import { ADDRESS_FIELDS, elementName, getLastFiasId } from './utils';

import styles from './AddressModal.less';
import {
  Address,
  AddressElement,
  isLevelElement,
  Levels,
  Room,
  VerifyResponse
} from './types';

const VERIFY_ERROR_MESSAGE = 'Неверный адрес';

interface ChangeEvent<T> {
  target: {
    value: T;
  };
}

interface FieldProps {
  source: (
    searchText: string
  ) => Promise<{
    values: AddressElement[];
    infos: Array<{ searchText: string; address: Address }>;
  }>;
  onChange: (
    e: ChangeEvent<AddressElement>,
    value: AddressElement,
    inf: { address: Address }
  ) => void;
  renderItem: (
    field: string,
    element: AddressElement,
    info: { address: Address }
  ) => React.ReactNode;
  renderValue: (field: string, element: AddressElement) => React.ReactNode;
  valueToString: (element: AddressElement) => string;
  onInputChange: (e: ChangeEvent<string>, value: string) => void;
  recover: (searchText: string) => { value: { [key: string]: string } };
}

interface Props {
  onChange: (value: { address: Address }) => any;
  onClose: () => void;
  title?: string;
  address?: Address;
  baseUrl?: string;
  validFn?: (address: Address) => any; // errors
}

interface State {
  address: Address;
  errorMessages: any; // TODO
}

export class AddressModal extends React.Component<Props, State> {
  public static defaultProps: Props = {
    onChange: () => null,
    onClose: () => null
  };

  public state: State;

  public api: FiasAPI;

  private _verifyPromise: Promise<VerifyResponse> | null = null;

  private readonly _regionProps: FieldProps;
  private readonly _districtProps: FieldProps;
  private readonly _cityProps: FieldProps;
  private readonly _settlementProps: FieldProps;
  private readonly _streetProps: FieldProps;
  private readonly _houseProps: FieldProps;
  private readonly _steadProps: FieldProps;
  private readonly _roomProps: FieldProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      address: { ...this.props.address } || {},
      errorMessages: {}
    };

    this.api = new FiasAPI(this.props.baseUrl);

    this._regionProps = this.createFieldProps('region', 0, Levels.Region);
    this._districtProps = this.createFieldProps('district', 1, Levels.District);
    this._cityProps = this.createFieldProps('city', 2, Levels.City);
    this._settlementProps = this.createFieldProps(
      'settlement',
      3,
      Levels.Settlement
    );
    this._streetProps = this.createFieldProps('street', 5, Levels.Street);
    this._houseProps = this.createFieldProps('house', 6, Levels.House);
    this._steadProps = this.createFieldProps('stead', 6, Levels.Stead);
    this._roomProps = {
      ...this.createFieldProps('room', 8, Levels.Room),
      onChange: (e, value, info) => {
        const roomField = 'room';
        const address = { ...this.state.address };
        if (info) {
          for (const i in ADDRESS_FIELDS) {
            if (ADDRESS_FIELDS.hasOwnProperty(i)) {
              const addressField = ADDRESS_FIELDS[i];
              if (addressField !== roomField && info.address[addressField]) {
                address[addressField] = info.address[addressField] as Room;
              } else if (addressField === roomField) {
                address[roomField] = value as Room;
                break;
              }
            }
          }
        } else {
          address[roomField] = value as Room;
        }
        this.setState({ address });
      },
      recover: searchText => ({ value: { flatNumber: searchText } })
    };
  }

  public createFieldProps(
    field: string,
    depth: number,
    level: Levels
  ): FieldProps {
    return {
      source: this.createSource(field, depth, level),
      onChange: this.createHandler(field),
      renderItem: this._renderItem.bind(this, field),
      renderValue: renderValue.bind(null, field),
      valueToString: renderValue.bind(null, field),
      onInputChange: this.createInputHandler(field),
      recover: searchText => ({ value: { name: searchText } })
    };
  }

  public createHandler(field: string) {
    return (
      e: ChangeEvent<AddressElement>,
      value: AddressElement,
      info: { address: Address }
    ) => {
      const address = { ...this.state.address };
      if (info) {
        for (const i in ADDRESS_FIELDS) {
          if (ADDRESS_FIELDS.hasOwnProperty(i)) {
            const addressField = ADDRESS_FIELDS[i];
            if (addressField !== field && info.address[addressField]) {
              address[addressField] = info.address[addressField];
            } else if (addressField === field) {
              address[field] = value;
              break;
            }
          }
        }
      } else if (isLevelElement(value)) {
        address[field] = value;
      } else {
        delete address[field];
      }

      this.setState({ address });
      this.check(address);
    };
  }

  public createInputHandler(field: string) {
    return (e: ChangeEvent<string>, value: string) => {
      if (!value) {
        const errorMessages = { ...this.state.errorMessages };
        delete errorMessages[field];
        this.setState({ errorMessages });
      }
    };
  }

  public getInvalidLevelErrors(invalidLevel: Levels, address: Address): any {
    const errorMessages: any = {};
    let isSearchInvalidLevel = false;
    for (const field of ADDRESS_FIELDS) {
      if (field === invalidLevel.toLowerCase() && address[field]) {
        isSearchInvalidLevel = true;
      }
      if (
        address[field] &&
        Object.keys(address[field] as object).length &&
        isSearchInvalidLevel
      ) {
        errorMessages[field] = VERIFY_ERROR_MESSAGE;
      }
    }
    return errorMessages;
  }

  public check(address: Address): void {
    const promise = this.api.verify(address);
    this._verifyPromise = promise;

    promise.then(result => {
      if (promise !== this._verifyPromise) {
        return;
      }
      this._verifyPromise = null;

      if (!result || !result[0]) {
        return;
      }

      const newAddress = {
        ...this.state.address, // здесь сохраняются поля, которые не одобрил метод verify
        ...result[0].address
      };

      let errorMessages = {};
      if (!result[0].isValid) {
        errorMessages = this.getInvalidLevelErrors(
          result[0].invalidLevel!,
          newAddress
        );
      }

      if (this.props.validFn) {
        const customErrorMessages = this.props.validFn(result[0].address); // только верифицированный адрес
        errorMessages = { ...errorMessages, ...customErrorMessages };
      }

      this.setState({
        address: newAddress,
        errorMessages
      });
    });
  }

  public createSource(field: string, depth: number, level: Levels) {
    return (searchText: string) => {
      const parentFiasId = getLastFiasId(
        this.state.address,
        ADDRESS_FIELDS.slice(0, depth)
      );

      return this.api.search(searchText, level, parentFiasId).then(values => ({
        values: values.map(address => address[field]),
        infos: values.map(address => ({ searchText, address }))
      }));
    };
  }

  public setStateAddress(key: string, value: AddressElement) {
    this.setState({
      address: {
        ...this.state.address,
        [key]: value
      }
    });
  }

  public render() {
    return (
      <Modal width={500} onClose={this._handleClose}>
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Body>{this._renderForm()}</Modal.Body>
        <Modal.Footer panel>
          <Gapped>
            <Button size="medium" use="primary" onClick={this._handleSave}>
              Найти объект
            </Button>
            <Button size="medium" onClick={this._handleClose}>
              Отменить
            </Button>
          </Gapped>
        </Modal.Footer>
      </Modal>
    );
  }

  private _renderItem(
    field: string,
    element: AddressElement,
    info: { address: Address }
  ) {
    // TODO fias возвращает линейную структуру - надо или в несколько запросов её восстанавливать или забить
    const parentNames = [];
    const parents = ADDRESS_FIELDS.slice(
      0,
      ADDRESS_FIELDS.indexOf(field) + 1
    ).reverse();
    for (const i in parents) {
      if (parents.hasOwnProperty(i)) {
        const parentField = parents[i];
        if (this.state.address[parentField]) {
          break;
        }

        const parent = info.address[parentField];
        if (parent && typeof parent === 'object' && parentField !== field) {
          let parentName = elementName(parent, parentField);
          if (parentField === 'region') {
            parentName = parent.code.substr(0, 2) + ' ' + parentName;
          }
          parentNames.unshift(parentName);
        }
      }
    }

    return (
      <div>
        {elementName(element, field)}
        {parentNames.length > 0 && (
          <div className={styles.menuItemParents}>{parentNames.join(', ')}</div>
        )}
      </div>
    );
  }

  private _handleSave = async () => {
    await this._verifyPromise;

    if (
      this.state.errorMessages &&
      Object.keys(this.state.errorMessages).length
    ) {
      // this.refs.fiasValidContainer.submit(); // посмотреть, как работает
      return; // как по гайдам?
    }

    // let invalidLevel = false;
    // let address = { ...this.state.address };
    //
    // for (let place of ADDRESS_FIELDS) {
    //   if ( this.state.invalidLevel && place.toLowerCase() === this.state.invalidLevel.toLowerCase()) {
    //     invalidLevel = true;
    //   }
    //   if (!(typeof address[place] === "object" && !invalidLevel)) {
    //     delete address[place];
    //   }
    // }

    this.props.onChange({ address: { ...this.state.address } });
    this.props.onClose();
  };

  private _handleClose = async () => {
    await this._verifyPromise;
    this.props.onClose();
  };

  private _renderForm() {
    const {
      address
      // errorMessages
    } = this.state;

    return (
      <div>
        {/*<ValidationContainer ref="fiasValidContainer">*/}
        <Gapped vertical>
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.region && {message: errorMessages.region}}>*/}
              <ComboBoxOld
                {...this._regionProps}
                value={address.region}
                placeholder="Можно вводить код или название"
                width="100%"
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.district && {message: errorMessages.district}}>*/}
              <ComboBoxOld
                {...this._districtProps}
                value={address.district}
                width="100%"
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.city && {message: errorMessages.city}}>*/}
              <ComboBoxOld
                {...this._cityProps}
                value={address.city}
                width="100%"
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.settlement && {message: errorMessages.settlement}}>*/}
              <ComboBoxOld
                {...this._settlementProps}
                value={address.settlement}
                width="100%"
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.street && {message: errorMessages.street}}>*/}
              <ComboBoxOld
                {...this._streetProps}
                value={address.street}
                width="100%"
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>
              <ComboBoxOld
                {...this._steadProps}
                value={address.stead}
                width={130}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>
              {/*<ValidationWrapperV1 validationInfo={!!errorMessages.house && {message: errorMessages.house}}>*/}
              <ComboBoxOld
                {...this._houseProps}
                value={address.house}
                width={130}
              />
              {/*</ValidationWrapperV1>*/}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              <ComboBoxOld
                {...this._roomProps}
                value={address.room}
                width={130}
              />
            </div>
          </div>
        </Gapped>
        {/*</ValidationContainer>*/}
      </div>
    );
  }
}

export default AddressModal;

function renderValue(type: string, element: AddressElement) {
  return element ? elementName(element, type) : '';
}
