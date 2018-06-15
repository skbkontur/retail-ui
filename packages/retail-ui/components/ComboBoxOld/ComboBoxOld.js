/* eslint-disable flowtype/no-types-missing-file-annotation */
/* eslint-disable flowtype/no-weak-types */
import * as React from 'react';

import PropTypes from 'prop-types';

import ComboBoxRenderer from './ComboBoxRenderer';
import type { BaseProps, Info, Value } from './ComboBoxRenderer';

type Props = BaseProps & {
  info?: Info | ((v: Value) => Promise<Info>)
};

export default class ComboBoxOld extends React.Component<
  Props,
  $FlowFixMeState
> {
  static propTypes = {
    autoFocus: PropTypes.bool,

    borderless: PropTypes.bool,

    debounceInterval: PropTypes.number,

    /**
     * Не использовать Portal для рендеринга меню.
     * По-умолчанию `false`.
     * См. https://github.com/skbkontur/retail-ui/issues/15
     */
    disablePortal: PropTypes.bool,

    disabled: PropTypes.bool,

    /**
     * Визуально показать наличие ошибки.
     */
    error: PropTypes.bool,

    /**
     * Данные, которые будут переданы в функции для отрисовки значений
     * (`renderValue` и `renderItem`).
     */
    info: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),

    menuAlign: PropTypes.oneOf(['left', 'right']),

    /**
     * Показывать кнопку-треугольник для показа резаультатов.
     */
    openButton: PropTypes.bool,

    placeholder: PropTypes.string,

    /**
     * Функция для обработки неожиданного ввода. Если пользователь ввел что-то в
     * строку поиска и нажал Enter или ушел из поля, не выбрав значение, то
     * будет вызвана эта функция, которая может вернуть значение, которое будет
     * использовано как будто оно было выбрано.
     *
     * Возвращаемое значение может быть `null`, либо объектом такой формы:
     * `{value: any, info?: any}`.
     *
     * Если задать это поле в `true`, то будет использована такая функция:
     * `(searchText) => searchText`.
     */
    recover: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

    renderItem: PropTypes.func,

    /**
     * Сообщение при отсутствии результатов
     *
     * `string | (searchText: string) => React$Element<*> | string`
     */
    renderNotFound: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    /**
     * Общее количество найденных элементов
     *
     * `(foundCount: number, totalCount: number) => React$Element<*> | string`
     */
    renderTotalCount: PropTypes.func,

    renderValue: PropTypes.func,

    source: PropTypes.func.isRequired,

    value: PropTypes.any,

    /**
     * Визуально показать наличие предупреждения.
     */
    warning: PropTypes.bool,

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,

    onChange: PropTypes.func,

    onClose: PropTypes.func,

    onFocus: PropTypes.func,

    /**
     * Вызывается при изменении текста в поле ввода,
     * если результатом функции будет строка,
     * то она станет следующим состояним полем ввода
     *
     * `(value: string) => any`
     */
    onInputChange: PropTypes.func,

    /**
     * Позволяет обработать нажатия клавиш.
     * Можно отменить стандартное поведение, используя `event.preventDefault()`
     *
     * `(event: KeyboardSyntheticEvent) => void`
     */
    onInputKeyDown: PropTypes.func,

    onMouseEnter: PropTypes.func,

    onMouseLeave: PropTypes.func,

    onMouseOver: PropTypes.func,

    onOpen: PropTypes.func
  };

  static defaultProps = {
    menuAlign: 'left',
    placeholder: '',
    width: 250
  };

  state = {
    info: null
  };

  renderer: ComboBoxRenderer;

  _mounted = false;
  _infoPromise: ?Promise<any>;

  render() {
    let info = this.props.info;
    if (typeof info === 'function') {
      info = this.state.info;
    }

    // Flow needs this for some reason.
    const spread: BaseProps = this.props;

    return <ComboBoxRenderer ref={this._ref} {...spread} info={info} />;
  }

  focus() {
    if (this.renderer) {
      this.renderer._focus();
    }
  }

  _ref = (renderer: ComboBoxRenderer) => {
    this.renderer = renderer;
  };

  componentDidMount() {
    this._mounted = true;
    const { value, info } = this.props;
    if (typeof info === 'function') {
      this._fetchInfo(value, info);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps(newProps: Props) {
    this._maybeRefetchInfo(newProps.value, newProps.info);
  }

  _maybeRefetchInfo(value: Value, info: Info) {
    if (typeof info !== 'function') {
      return;
    }

    const props = this.props;

    if (value === props.value && typeof props.info === 'function') {
      // Values hasn't changed and info is still a function. So we are already
      // fetching info.
      return;
    }

    this.setState({ info: null });
    this._fetchInfo(value, info);
  }

  _fetchInfo(value: Value, info: Info) {
    const promise = info(value);
    this._infoPromise = promise;

    promise.then(info => {
      if (this._mounted && this._infoPromise === promise) {
        this.setState({ info });
      }
    });
  }
}
