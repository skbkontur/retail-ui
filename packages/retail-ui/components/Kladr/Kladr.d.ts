import * as React from 'react';
import PropTypes from 'prop-types';
import { Address } from './Types';

interface KladrValue {
  address: Address;
}

export interface KladrProps {
  error?: string;
  title: string;
  value: any;
  warning?: string;
  onChange?: (event: any, value: KladrValue) => void;
}

export interface KladrState {
  opened: boolean;
}

/**
 * DRAFT
 */
export default class Kladr extends React.Component<KladrProps, KladrState> {
  public static propTypes: {
    error: PropTypes.Requireable<any>;
    title: PropTypes.Requireable<any>;
    value: PropTypes.Requireable<any>;
    warning: PropTypes.Requireable<any>;
    onChange: PropTypes.Requireable<any>;
  };
  private renderAddress;
  private renderModal;
  private handleOpen;
  private handleChange;
  private handleClose;
  constructor(props: KladrProps);
  public render(): JSX.Element;
}
