import * as React from 'react';
import Gapped from '../../Gapped';
import { FiasAPI } from '../FiasAPI';
import { FiasComboBox, FiasComboBoxProps } from './FiasComboBox';
import styles from './FiasForm.less';
import {
  ErrorMessages,
  Levels,
  VerifyResponse,
  ResponseAddress
} from '../types';
import { Nullable } from '../../../typings/utility-types';
import { Address } from '../models/Address';
import { AddressElement } from '../models/AddressElement';
import Fias from '../Fias';
import Tooltip from '../../Tooltip/Tooltip';
import { InputProps } from '../../Input';
import Input from '../../Input/Input';

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
  errorMessages?: ErrorMessages;
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
      ref: Nullable<FiasComboBox<Address>>;
      props: FiasComboBoxProps<Address>;
      createRef: (element: FiasComboBox<Address>) => void;
      tooltip: () => Nullable<React.ReactNode>;
    };
  } = {};
  private readonly inputs: {
    [key: string]: {
      props: InputProps;
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
      'house'
    ].reduce((comboboxes, field) => {
      return {
        ...comboboxes,
        [field]: {
          ref: null,
          props: this.createComboBoxProps(field),
          createRef: (element: FiasComboBox<Address>) => {
            this.comboboxes[field].ref = element;
          },
          tooltip: () => this.state.errorMessages[field] || null
        }
      };
    }, {});

    this.inputs = ['room'].reduce((inputs, field) => {
      return {
        ...inputs,
        [field]: {
          props: this.createInputProps(field)
        }
      };
    }, {});

    if (props.search) {
      // this._searchProps = this.createSearchProps();
    }
  }

  public componentDidMount() {
    this.check();
  }

  public createComboBoxProps(field: string): FiasComboBoxProps<Address> {
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

    const onInputChange = () => {
      const errorMessages = { ...this.state.errorMessages };
      if (errorMessages.hasOwnProperty(field)) {
        delete errorMessages[field];
        this.setState({
          errorMessages
        });
      }
    };

    const onUnexpectedInput = (query: string) => {
      this.handleAddressChange(
        new Address({
          [field]: query ? new AddressElement(field, query) : undefined
        })
      );
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
      onInputChange,
      onUnexpectedInput,
      renderItem,
      renderValue,
      valueToString,
      renderNotFound: () => 'Не найдено ничего'
    };
  }

  public createInputProps(field: string): InputProps {
    return {
      onChange: (e: ChangeEvent<string>, value: string) => {
        this.handleAddressChange(
          new Address({
            [field]: value ? new AddressElement(field, value) : undefined
          })
        );
      }
    };
  }

  public check(): void {
    const { address } = this.state;
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

      const verifiedAddress: Address = Address.verify(address, result);
      const errorMessages: ErrorMessages = {};
      const { isValid, invalidLevel } = result[0];

      if (!isValid && invalidLevel) {
        errorMessages[String(invalidLevel).toLowerCase()] =
          Fias.defaultTexts.not_valid_message;
      }

      this.setState({
        address: verifiedAddress,
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

    this.setState(
      {
        address: newAddress
      },
      () => {
        this.check();
        this.resetComboboxes();
      }
    );
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
    const { address, errorMessages } = this.state;
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
              <Input
                value={address.fields.room ? address.fields.room.name : ''}
                {...this.inputs.room.props}
                error={errorMessages.hasOwnProperty('room')}
                width={130}
              />
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
    const { props, createRef, tooltip } = this.comboboxes[field];
    return (
      <Tooltip pos={'right middle'} render={tooltip}>
        <FiasComboBox
          {...props}
          value={address}
          placeholder={placeholder}
          width={width}
          error={errorMessages.hasOwnProperty(field)}
          autocomplete={true}
          ref={createRef}
        />
      </Tooltip>
    );
  };
}

export default FiasForm;
