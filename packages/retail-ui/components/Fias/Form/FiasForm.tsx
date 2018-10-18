import * as React from 'react';
import Gapped from '../../Gapped';
import { FiasAPI } from '../FiasAPI';
import {
  HighlightingComboBox,
  HighlightingComboBoxProps
} from './HighlightingComboBox';
import styles from './FiasForm.less';
import {
  ErrorMessages,
  Levels,
  VerifyResponse,
  ResponseAddress
} from '../types';
import Fias from '../Fias';
import { Nullable } from '../../../typings/utility-types';
import { Address } from '../models/Address';

interface ChangeEvent<T> {
  target: {
    value: T;
  };
}

interface FiasFormProps {
  api: FiasAPI;
  address: Address;
  validFn?: (address: Address) => ErrorMessages;
  search?: boolean;
}

interface FiasFormState {
  address: Address;
  errorMessages: ErrorMessages;
}

export class FiasForm extends React.Component<FiasFormProps, FiasFormState> {
  public state: FiasFormState;

  private verifyPromise: Promise<VerifyResponse> | null = null;
  private readonly comboboxes: {
    [key: string]: {
      ref: Nullable<HighlightingComboBox<Address>>;
      props: HighlightingComboBoxProps<Address>;
      createRef: (element: HighlightingComboBox<Address>) => void;
    };
  } = {};

  constructor(props: FiasFormProps) {
    super(props);

    this.state = {
      address: props.address,
      errorMessages: {}
    };

    this.comboboxes = [
      'region',
      'district',
      'city',
      'settlement',
      'planningstructure',
      'stead',
      'street',
      'house',
      'room'
    ].reduce((comboboxes, field) => {
      return {
        ...comboboxes,
        [field]: {
          ref: null,
          props: this.createComboBoxProps(field),
          createRef: (element: HighlightingComboBox<Address>) => {
            this.comboboxes[field].ref = element;
          }
        }
      };
    }, {});

    if (props.search) {
      // this._searchProps = this.createSearchProps();
    }
  }

  public createComboBoxProps(
    field: string
  ): HighlightingComboBoxProps<Address> {
    const getItems = async (searchText: string) => {
      const level = Levels[field as keyof typeof Levels];
      const parentFiasId = this.state.address.getClosestParentFiasId(field);
      return this.props.api
        .search(searchText, level, parentFiasId)
        .then((items: ResponseAddress[]) => {
          return items.map((item: ResponseAddress) => {
            return Address.createFromResponse(item);
          });
        });
    };

    const onChange = (e: ChangeEvent<Address>, value: Address) => {
      this.handleAddressChange(value);
    };

    const onUnexpectedInput = (query: string) => {
      const { address } = this.state;
      if (!query) {
        address.fields[field] = null;
      } else {
        // set custom value
      }
      this.handleAddressChange(address);
    };

    const renderItem = (address: Address): string => {
      const element = address.fields[field];
      const hasParents = Boolean(address.getClosestParentFiasId(field));

      const fieldText = element
        ? element.getText(!hasParents && element.isTypeMatchField(field))
        : '';

      if (element && element.data && element.data.level === Levels.region) {
        const regionCode = element.data.code.substr(0, 2);
        return `${regionCode} ${fieldText}`;
      }

      return hasParents
        ? [address.getText(field), fieldText].join(', ')
        : fieldText;
    };

    const renderValue = (address: Address): React.ReactNode => {
      const element = address.fields[field];
      return element && element.getText(element.isTypeMatchField(field));
    };

    const valueToString = (address: Address): string => {
      const element = address.fields[field];
      return element ? element.name : '';
    };

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
    for (const field of Address.FIELDS) {
      if (field === invalidLevel.toLowerCase() && address.fields[field]) {
        isSearchInvalidLevel = true;
      }
      if (
        address.fields[field] &&
        Object.keys(address.fields[field] as object).length &&
        isSearchInvalidLevel
      ) {
        errorMessages[field] = Fias.defaultTexts.not_valid_message;
      }
    }
    return errorMessages;
  }

  public check(address: Address): void {
    const promise = this.props.api.verify(address.toValue());
    this.verifyPromise = promise;

    promise.then(result => {
      if (promise !== this.verifyPromise) {
        return;
      }
      this.verifyPromise = null;

      if (!result || !result[0]) {
        return;
      }

      const newAddress = Address.verify(address, result);

      let errorMessages = {};
      if (!result[0].isValid) {
        errorMessages = this.getInvalidLevelErrors(
          result[0].invalidLevel!,
          newAddress
        );
      }

      // if (this.props.validFn) {
      //   const customErrorMessages = this.props.validFn(result[0].address); // только верифицированный адрес
      //   errorMessages = { ...errorMessages, ...customErrorMessages };
      // }

      this.setState({
        address: newAddress,
        errorMessages
      });
    });
  }

  public handleAddressChange = (value: Address) => {
    const { address } = this.state;
    // TODO: separated method?
    const newAddress = new Address({
      ...address.fields,
      ...value.fields
    });
    // Object.keys(address).forEach(field => {
    //   if (!address[field]) {
    //     delete address[field];
    //   }
    // });
    this.setState({ address: newAddress });
    this.check(newAddress);
    this.resetComboboxes();
  };

  public submit = async (): Promise<FiasFormState> => {
    await this.verifyPromise;
    return {
      ...this.state
    };
  };

  public resetComboboxes = () => {
    for (const field in this.comboboxes) {
      if (this.comboboxes.hasOwnProperty(field)) {
        const combobox = this.comboboxes[field].ref;
        if (combobox) {
          combobox.reset();
        }
      }
    }
  };

  public render() {
    return (
      <div>
        <Gapped vertical>
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>
              {this.renderField('region', 'регион')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>
              {this.renderField('district', 'район')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>
              {this.renderField('city', 'город')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Населенный пункт</div>
            <div className={styles.field}>{this.renderField('settlement')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Иная территория</div>
            <div className={styles.field}>
              {this.renderField('planningstructure')}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Улица</div>
            <div className={styles.field}>{this.renderField('street')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Земельный участок</div>
            <div className={styles.field}>
              {this.renderField('stead', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>
              {this.renderField('house', '', 130)}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              {this.renderField('room', '', 130)}
            </div>
          </div>
        </Gapped>
      </div>
    );
  }

  private renderField = (
    field: string,
    placeholder: string = '',
    width: string | number = '100%'
  ) => {
    const { address, errorMessages } = this.state;
    return (
      <HighlightingComboBox
        {...this.comboboxes[field].props}
        value={address}
        placeholder={placeholder}
        width={width}
        error={errorMessages.hasOwnProperty(field)}
        autocomplete={true}
        ref={this.comboboxes[field].createRef}
      />
    );
  };
}

export default FiasForm;
