import * as React from 'react';
import Gapped from '../../Gapped';
import { FiasAPI } from './../FiasAPI';
import {
  HighlightingComboBox,
  HighlightingComboBoxProps
} from './HighlightingComboBox';
import {
  getAddressElementName,
  getAddressElementText,
  getLastFiasId,
  isAddressObject,
  isEmptyAddress
} from '../utils';
import styles from './FiasForm.less';
import {
  Address,
  ADDRESS_FIELDS,
  AddressFieldName,
  ErrorMessages,
  Levels,
  Room,
  VerifyResponse
} from '../types';
import Input from '../../Input/Input';

const VERIFY_ERROR_MESSAGE = 'Неверный адрес';

interface ChangeEvent<T> {
  target: {
    value: T;
  };
}

interface Props {
  api: FiasAPI;
  address?: Address;
  validFn?: (address: Address) => ErrorMessages;
  search?: boolean;
}

interface State {
  address: Address;
  errorMessages: ErrorMessages;
}

export class FiasForm extends React.Component<Props, State> {
  public state: State;

  private _verifyPromise: Promise<VerifyResponse> | null = null;
  private readonly _combos: {
    [key: string]: {
      ref: React.RefObject<HighlightingComboBox<Address>>;
      props: HighlightingComboBoxProps<Address>;
    };
  } = {};
  // private readonly _searchProps: ComboBoxProps<Address> = {};

  constructor(props: Props) {
    super(props);

    this.state = {
      address: { ...this.props.address } || {},
      errorMessages: {}
    };

    this._combos = ADDRESS_FIELDS.reduce((combos, field: AddressFieldName) => {
      return {
        ...combos,
        [field]: {
          ref: React.createRef(),
          props: this.createComboBoxProps(field)
        }
      };
    }, {});

    if (props.search) {
      // this._searchProps = this.createSearchProps();
    }
  }

  public createComboBoxProps(
    field: AddressFieldName
  ): HighlightingComboBoxProps<Address> {
    const getItems = (searchText: string) => {
      const parentFiasId = getLastFiasId(
        this.state.address,
        ADDRESS_FIELDS.slice(0, ADDRESS_FIELDS.indexOf(field))
      );
      return this.props.api.search(searchText, Levels[field], parentFiasId);
    };

    const onChange = (e: ChangeEvent<Address>, value: Address) => {
      this.handleAddressChange(value);
    };

    const onUnexpectedInput = (query: string) => {
      const address = { ...this.state.address };
      if (!query) {
        address[field] = undefined;
      } else {
        // address[field] = { name: query };
      }
      this.handleAddressChange(address);
    };

    const renderItem = (item: Address): string => {
      const { address } = this.props;
      const element = item[field]!;
      const parents = ADDRESS_FIELDS.slice(0, ADDRESS_FIELDS.indexOf(field));
      const hasParent =
        !isEmptyAddress(address) && getLastFiasId(address!, parents);
      let text = getAddressElementText(element, hasParent ? field : undefined);

      if (isAddressObject(element) && element.level === Levels.region) {
        const regionCode = element.code.substr(0, 2);
        text = regionCode + ' ' + text;
      }

      const parentTexts: string[] = [];
      parents
        .filter(key => Boolean(item[key]))
        .forEach((parentField: string) => {
          const parent = item[parentField];
          if (parent) {
            parentTexts.push(getAddressElementText(parent));
          }
        });

      return [...parentTexts, text].join(', ');
    };

    const renderValue = (address: Address): React.ReactNode => {
      const element = address[field];
      // console.log(field, element);
      return element ? getAddressElementText(element, field) : '';
    };

    const valueToString = (address: Address): string =>
      getAddressElementName(address[field]);

    return {
      getItems,
      onChange,
      onUnexpectedInput,
      renderItem,
      renderValue,
      valueToString,
      renderNotFound: () => 'Не найдено ничего'
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
    const promise = this.props.api.verify(address);
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

  public handleRoomChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    this.setState({
      address: {
        ...this.state.address,
        room: { flatNumber: value } as Room
      }
    });
  };

  public handleAddressChange = (value: Address) => {
    const address = {
      ...this.state.address,
      ...value
    };
    Object.keys(address).forEach(field => {
      if (!address[field]) {
        delete address[field];
      }
    });
    this.setState({ address });
    this.check(address);
    this.resetCombos();
  };

  public submit = async (): Promise<State> => {
    await this._verifyPromise;
    return {
      ...this.state
    };
  };

  public resetCombos = () => {
    for (const field in this._combos) {
      if (this._combos.hasOwnProperty(field)) {
        const { ref } = this._combos[field];
        if (ref && ref.current) {
          // ref.current.reset();
        }
      }
    }
  };

  public render() {
    return (
      <div>
        <Gapped vertical>
          {/*{this.props.search && (*/}
          {/*<div className={styles.row}>*/}
          {/*<div className={styles.field}>*/}
          {/*<ComboBox*/}
          {/*{...this._searchProps}*/}
          {/*value={address}*/}
          {/*placeholder="Начните вводить адрес в свободной форме"*/}
          {/*autocomplete={true}*/}
          {/*width="100%"*/}
          {/*/>*/}
          {/*</div>*/}
          {/*</div>*/}
          {/*)}*/}
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>
              {this._renderField('region', 'регион')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>
              {this._renderField('district', 'район')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>
              {this._renderField('city', 'город')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>
              {this._renderField('settlement')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Иная территория</div>
            <div className={styles.field}>
              {this._renderField('planningstructure')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>{this._renderField('street')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>
              {this._renderField('stead', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>
              {this._renderField('house', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              <Input
                onChange={this.handleRoomChange}
                value={
                  this.state.address.room
                    ? this.state.address.room.flatNumber
                    : ''
                }
                width={130}
              />
            </div>
          </div>
        </Gapped>
      </div>
    );
  }

  private _renderField = (
    field: AddressFieldName,
    placeholder: string = '',
    width: string | number = '100%'
  ) => {
    const { address, errorMessages } = this.state;
    return (
      <HighlightingComboBox
        {...this._combos[field].props}
        value={address}
        placeholder={placeholder}
        width={width}
        error={errorMessages.hasOwnProperty(field)}
        autocomplete={true}
        ref={this._combos[field].ref}
      />
    );
  };
}

export default FiasForm;
