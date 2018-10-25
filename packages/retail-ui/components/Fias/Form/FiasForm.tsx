import * as React from 'react';
import Gapped from '../../Gapped';
import { FiasAPI } from '../FiasAPI';
import {
  FiasComboBox,
  FiasComboBoxChangeEvent,
  FiasComboBoxProps
} from './FiasComboBox';
import styles from './FiasForm.less';
import {
  ErrorMessages,
  FiasId,
  FormValidation,
  ResponseAddress
} from '../types';
import { Nullable } from '../../../typings/utility-types';
import { Address } from '../models/Address';
import { AddressElement } from '../models/AddressElement';
import Tooltip from '../../Tooltip/Tooltip';
import { InputProps } from '../../Input';
import Input from '../../Input/Input';
import FiasSearch from './FiasSearch';
import { FiasLocale } from '../constants/locale';

interface FiasFormProps {
  api: FiasAPI;
  address: Address;
  locale: FiasLocale;
  search?: boolean;
  limit?: number;
  validationLevel?: FormValidation;
}

interface FiasFormState {
  address: Address;
  errorMessages: ErrorMessages;
}

export class FiasForm extends React.Component<FiasFormProps, FiasFormState> {
  public static defaultProps = {
    validationLevel: 'Error'
  };

  public state: FiasFormState = {
    address: this.props.address,
    errorMessages: {}
  };

  private readonly comboboxes: {
    [key: string]: {
      ref: Nullable<FiasComboBox>;
      props: FiasComboBoxProps;
      createRef: (element: FiasComboBox) => void;
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

    this.comboboxes = [
      'region',
      'district',
      'city',
      'intracityarea',
      'settlement',
      'planningstructure',
      'street',
      'stead',
      'house'
    ].reduce((comboboxes, field) => {
      return {
        ...comboboxes,
        [field]: {
          ref: null,
          props: this.createComboBoxProps(field),
          tooltip: this.createFieldTooltip(field),
          createRef: (element: FiasComboBox) => {
            this.comboboxes[field].ref = element;
          }
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
  }

  public componentDidMount() {
    this.check();
  }

  public createComboBoxProps(field: string): FiasComboBoxProps {
    const getItems = async (searchText: string) => {
      const parentFiasId = this.state.address.getClosestParentFiasId(field);
      return this.createItemsSource(searchText, field, parentFiasId);
    };

    const onChange = (e: FiasComboBoxChangeEvent, value: Address) => {
      this.handleAddressChange(value);
    };

    const onInputChange = () => {
      if (Object.keys(this.state.errorMessages).length) {
        this.setState({
          errorMessages: {}
        });
      }
    };

    const onUnexpectedInput = (query: string) => {
      const fields = { ...this.state.address.fields };
      if (query) {
        fields[field] = new AddressElement(field, query);
      } else {
        delete fields[field];
      }
      this.handleAddressChange(new Address(fields), true);
    };

    const renderItem = (address: Address): string => {
      const element: Nullable<AddressElement> = address.fields[field];
      const hasParents = Boolean(address.getClosestParentFiasId(field));

      const fieldText = element
        ? element.getText(!hasParents && element.isTypeMatchTheField(field))
        : '';

      if (field === 'region' && element && element.data) {
        const regionCode = element.data.code.substr(0, 2);
        return `${regionCode} ${fieldText}`;
      }

      return hasParents
        ? [address.getText(field), fieldText].join(', ')
        : fieldText;
    };

    const renderValue = (address: Address): React.ReactNode => {
      const element = address.fields[field];
      return element && element.getText(element.isTypeMatchTheField(field));
    };

    const renderNotFound = (): React.ReactNode => {
      const { address } = this.state;
      const { locale } = this.props;
      let messages = [locale[`${field}NotFound`] || locale.addressNotFound];

      if (address.isTheFieldAllowedToFill(field)) {
        if (address.hasOnlyIndirectParent(field)) {
          messages.push(locale.addressFillParentOrSearch);
        }
      } else {
        messages = locale[`${field}FillBefore`]
          ? [locale[`${field}FillBefore`]]
          : messages;
      }

      return (
        <div>
          {messages.map((message, i, m) => (
            <div key={i}>{message + (m[i + 1] ? '.' : '')}</div>
          ))}
        </div>
      );
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
      renderNotFound
    };
  }

  public createInputProps(field: string): InputProps {
    return {
      onChange: (e: React.ChangeEvent, value: string) => {
        const fields = { ...this.state.address.fields };
        if (value) {
          fields[field] = new AddressElement(field, value);
        } else {
          delete fields[field];
        }
        this.handleAddressChange(new Address(fields), true);
      }
    };
  }

  public createItemsSource = async (
    searchText: string,
    field?: string,
    parent?: Nullable<FiasId>
  ) => {
    const { limit } = this.props;
    const { address } = this.state;
    return address.isTheFieldAllowedToFill(field)
      ? this.props.api
          .search(searchText, limit, field, parent)
          .then((items: ResponseAddress[]) => {
            return items.map((item: ResponseAddress) => {
              return Address.createFromResponse(item);
            });
          })
      : Promise.resolve([]);
  };

  public createFieldTooltip = (field: string): React.ReactNode => {
    return () => {
      const { errorMessages } = this.state;
      const { validationLevel } = this.props;
      return (validationLevel !== 'None' && errorMessages[field]) || null;
    };
  };

  public check(): void {
    const { address } = this.state;
    const { api, locale } = this.props;

    api.verify(address.convertForVerification()).then(result => {
      if (!result || !result[0]) {
        return;
      }
      const { address: verifiedAddress, errorMessages } = Address.verify(
        address,
        result,
        locale.addressNotFound
      );

      this.setState({
        address: verifiedAddress,
        errorMessages
      });
    });
  }

  public handleAddressChange = (value: Address, replace: boolean = false) => {
    const address = new Address({
      ...(replace ? {} : this.state.address.fields),
      ...value.fields
    });

    this.setState(
      {
        address
      },
      () => {
        this.resetComboboxes();
        this.check();
      }
    );
  };

  public submit = async (): Promise<FiasFormState> => {
    await this.props.api.verifyPromise;
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
          {this.props.search && (
            <div className={styles.row}>
              <div className={styles.field}>
                <FiasSearch
                  source={this.createItemsSource}
                  address={address}
                  onChange={this.handleAddressChange}
                  limit={this.props.limit}
                  locale={this.props.locale}
                />
              </div>
            </div>
          )}
          <div className={styles.row}>
            <div className={styles.label}>Регион</div>
            <div className={styles.field}>{this.renderField('region')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Район</div>
            <div className={styles.field}>{this.renderField('district')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Город</div>
            <div className={styles.field}>{this.renderField('city')}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Внутригородская территория</div>
            <div className={styles.field}>
              {this.renderField('intracityarea')}
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
            <div className={styles.field}>{this.renderField('stead', 130)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Дом, сооружение</div>
            <div className={styles.field}>{this.renderField('house', 130)}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>Квартира, офис</div>
            <div className={styles.field}>
              <Input
                {...this.inputs.room.props}
                value={address.fields.room ? address.fields.room.name : ''}
                error={errorMessages.hasOwnProperty('room')}
                placeholder={this.props.locale.roomPlaceholder}
                width={130}
              />
            </div>
          </div>
        </Gapped>
      </div>
    );
  }

  private renderField = (field: string, width: string | number = '100%') => {
    const { address, errorMessages } = this.state;
    const { locale, validationLevel } = this.props;
    const { props, createRef, tooltip } = this.comboboxes[field];
    const error =
      errorMessages.hasOwnProperty(field) && validationLevel === 'Error';
    const warning =
      errorMessages.hasOwnProperty(field) && validationLevel === 'Warning';
    return (
      <Tooltip pos={'right middle'} render={tooltip}>
        <FiasComboBox
          {...props}
          value={address}
          placeholder={locale[`${field}Placeholder`]}
          width={width}
          error={error}
          warning={warning}
          autocomplete={true}
          limit={this.props.limit}
          ref={createRef}
        />
      </Tooltip>
    );
  };
}

export default FiasForm;
