/* @flow */

import React from 'react';

import Button from '../Button';
import Gapped from '../Gapped';
import Input from '../Input';
import Modal from '../Modal';
import Select from '../Select';

import type {Address} from './Types';

import styles from './AddressModal.less';

type Props = {
  address: Address,
  onClose: () => void,
};

type State = {
  address: Address,
};

export default class AddressModal extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      address: props.address,
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
            <Input width="100%" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Район</div>
          <div className={styles.field}>
            <Input width="100%" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Город</div>
          <div className={styles.field}>
            <Input width="100%" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Населенный пункт</div>
          <div className={styles.field}>
            <Input width="100%" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Улица</div>
          <div className={styles.field}>
            <Input width="100%" />
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
