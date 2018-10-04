import * as React from 'react';
import Button from '../Button';
import Gapped from '../Gapped';
import Modal from '../Modal';
import ComboBox from '../ComboBox';
import { FiasAPI } from './FiasAPI';
import { getAddressElementName, getLastFiasId, isHouse, isRoom } from './utils';
import styles from './AddressModal.less';
import {
  Address,
  ADDRESS_FIELDS,
  AddressElement,
  ErrorMessages,
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
  getItems: (searchText: string) => Promise<Address[]>;
  onChange: (e: ChangeEvent<Address>, value: Address) => void;
  renderItem: (address: Address) => React.ReactNode;
  renderValue: (address: Address) => React.ReactNode;
  valueToString: (address: Address) => string;
  onInputChange: (value: string) => void;
  onUnexpectedInput: (searchText: string) => void;
}

interface Props {
  onChange: (value: { address: Address }) => any;
  onClose: () => void;
  title?: string;
  address?: Address;
  baseUrl?: string;
  validFn?: (address: Address) => ErrorMessages;
}

interface State {
  address: Address;
  errorMessages: ErrorMessages;
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
      onChange: (e, newAddress) => {
        const roomField = 'room';
        const element = newAddress[roomField];
        const currentAddress = { ...this.state.address };
        if (newAddress) {
          for (const i in ADDRESS_FIELDS) {
            if (ADDRESS_FIELDS.hasOwnProperty(i)) {
              const addressField = ADDRESS_FIELDS[i];
              if (addressField !== roomField && newAddress[addressField]) {
                currentAddress[addressField] = newAddress[addressField] as Room;
              } else if (addressField === roomField) {
                currentAddress[roomField] = element as Room;
                break;
              }
            }
          }
        } else {
          currentAddress[roomField] = element as Room;
        }
        this.setState({ address: currentAddress });
      }
    };
  }

  public createFieldProps(
    field: string,
    depth: number,
    level: Levels
  ): FieldProps {
    return {
      getItems: this.createSource(field, depth, level),
      onChange: this.createChangeHandler(field),
      renderItem: this.createItemRenderer(field),
      renderValue: this.createValueRenderer(field),
      valueToString: this.createValueToStringConverter(field),
      onInputChange: this.createInputHandler(field),
      onUnexpectedInput: this.createUnexpectedInputHandler(field)
    };
  }

  public createChangeHandler(field: string) {
    return (e: ChangeEvent<Address>, newAddress: Address) => {
      const currentAddress = { ...this.state.address };
      const element = newAddress[field]!;
      if (newAddress) {
        for (const i in ADDRESS_FIELDS) {
          if (ADDRESS_FIELDS.hasOwnProperty(i)) {
            const addressField = ADDRESS_FIELDS[i];
            if (addressField !== field && newAddress[addressField]) {
              currentAddress[addressField] = newAddress[addressField];
            } else if (addressField === field) {
              currentAddress[field] = element;
              break;
            }
          }
        }
      }
      this.setState({ address: currentAddress });
      this.check(currentAddress);
    };
  }

  public createInputHandler(field: string) {
    return (value: string) => {
      if (!value) {
        const errorMessages = { ...this.state.errorMessages };
        delete errorMessages[field];
        this.setState({ errorMessages });
      }
    };
  }

  public createUnexpectedInputHandler(field: string) {
    return (searchText: string) => {
      if (!searchText) {
        const address = { ...this.state.address };
        delete address[field];
        this.setState({ address });
      }
    };
  }

  public createItemRenderer(field: string) {
    return (address: Address): React.ReactNode => {
      // TODO fias возвращает линейную структуру - надо или в несколько запросов её восстанавливать или забить
      const element = address[field];
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
          const parent = address[parentField];
          if (parent && typeof parent === 'object' && parentField !== field) {
            let parentName = getAddressElementName(parent, parentField);
            if (parentField === 'region') {
              parentName = parent.code.substr(0, 2) + ' ' + parentName;
            }
            parentNames.unshift(parentName);
          }
        }
      }

      return (
        element && (
          <div>
            {getAddressElementName(element, field)}
            {parentNames.length > 0 && (
              <div className={styles.menuItemParents}>
                {parentNames.join(', ')}
              </div>
            )}
          </div>
        )
      );
    };
  }

  public createValueRenderer(field: string) {
    return (address: Address) => {
      const element = address[field];
      return element ? getAddressElementName(element, field) : '';
    };
  }

  public createValueToStringConverter(field: string) {
    return (address: Address) => {
      const element = address[field];
      if (!element) {
        return '';
      } else if (element.name) {
        return element.name;
      } else if (isHouse(element)) {
        return element.number;
      } else if (isRoom(element)) {
        return element.flatNumber;
      }
      return '';
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

      return this.api.search(searchText, level, parentFiasId);
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
    const { address, errorMessages } = this.state;

    return (
      <div>
        <Gapped vertical>
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>
              <ComboBox
                {...this._regionProps}
                value={address}
                placeholder="Можно вводить код или название"
                error={errorMessages.hasOwnProperty('region')}
                autocomplete={true}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>
              <ComboBox
                {...this._districtProps}
                value={address}
                error={errorMessages.hasOwnProperty('district')}
                autocomplete={true}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>
              <ComboBox
                {...this._cityProps}
                value={address}
                error={errorMessages.hasOwnProperty('city')}
                autocomplete={true}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>
              <ComboBox
                {...this._settlementProps}
                value={address}
                error={errorMessages.hasOwnProperty('settlement')}
                autocomplete={true}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>
              <ComboBox
                {...this._streetProps}
                value={address}
                error={errorMessages.hasOwnProperty('street')}
                autocomplete={true}
                width="100%"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>
              <ComboBox
                {...this._steadProps}
                value={address}
                error={errorMessages.hasOwnProperty('stead')}
                autocomplete={true}
                width={130}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>
              <ComboBox
                {...this._houseProps}
                value={address}
                error={errorMessages.hasOwnProperty('house')}
                autocomplete={true}
                width={130}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              <ComboBox
                {...this._roomProps}
                value={address}
                error={errorMessages.hasOwnProperty('room')}
                autocomplete={true}
                width={130}
              />
            </div>
          </div>
        </Gapped>
      </div>
    );
  }
}

export default AddressModal;
