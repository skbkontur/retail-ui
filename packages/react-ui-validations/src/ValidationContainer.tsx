import React from 'react';
import warning from 'warning';

import type { Nullable } from '../typings/Types.js';
import { FocusMode } from './FocusMode.js';
import { createPropsGetter } from './utils/createPropsGetter.js';
import { isTestEnv } from './utils/utils.js';
import { ValidationContextWrapper } from './ValidationContextWrapper.js';

export interface ScrollOffset {
  /** Отступ от верхнего края окна при прокрутке к первой ошибке.
   * @default 50 */
  top?: number;
  /** Отступ от нижнего края окна при прокрутке к первой ошибке.
   * @default 0 */
  bottom?: number;
}

export interface ValidationSettings {
  /** Задаёт, какой контрол получит фокус после проверки: первый с ошибкой, первый с ошибкой или предупреждением или никакой.
   * @default FocusMode.Errors */
  focusMode: FocusMode;
}

export type ValidateArgumentType = boolean | ValidationSettings;

export interface ValidationContainerProps {
  /** Атрибут для поиска контейнера в автотестах. Попадает на корневой элемент. */
  'data-tid'?: string;
  /** @ignore */
  children?: React.ReactNode;
  /** Событие изменения валидности формы. Вызывается, когда у контрола появляется или пропадает видимая ошибка, когда контрол удаляется из формы и после вызова `submit` или `validate`.
   *
   * Получает `true`, если в форме нет видимых ошибок. Ошибки с типом `submit` до отправки формы не учитываются. */
  onValidationUpdated?: (isValid?: Nullable<boolean>) => void;
  /** Задаёт отступы от краёв окна при прокрутке к первой ошибке. Пригодится, если на странице есть липкая шапка или футер.
   * @default { top: 50, bottom: 0 } */
  scrollOffset?: ScrollOffset;
  /** Отключает плавную прокрутку к первой ошибке.
   * @default false */
  disableSmoothScroll?: boolean;
}

type DefaultProps = Required<Pick<ValidationContainerProps, 'disableSmoothScroll'>>;

/** Контейнер валидации оборачивает форму и связывает все `ValidationWrapper` внутри неё.
 * Через него форма отправляется на проверку: контейнер показывает все ошибки, прокручивает страницу к первой из них и ставит на неё фокус.
 */
export class ValidationContainer extends React.Component<ValidationContainerProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationContainer';
  public static displayName = 'ValidationContainer';

  public static defaultProps: DefaultProps = {
    disableSmoothScroll: isTestEnv,
  };

  private getProps = createPropsGetter(ValidationContainer.defaultProps);

  private childContext: ValidationContextWrapper | null = null;

  public async submit(withoutFocus?: boolean): Promise<void>;
  public async submit(validationSettings?: ValidationSettings): Promise<void>;

  /** Программно отправляет форму на проверку: показывает все ошибки, в том числе с типом `submit`, прокручивает страницу к первой ошибке и ставит на неё фокус.
   * Чтобы не переводить фокус, передайте `true` или `{ focusMode: FocusMode.None }`.
   * @public
   */
  public async submit(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<void> {
    if (this.childContext) {
      await this.childContext.validate(withoutFocusOrValidationSettings);
    }
    warning(false, 'childContext is not defined');
  }

  public async validate(withoutFocus?: boolean): Promise<boolean>;
  public async validate(validationSettings?: ValidationSettings): Promise<boolean>;

  /** Программно отправляет форму на проверку, как `submit`, и возвращает `true`, если в форме нет ошибок.
   * Предупреждения (`level: 'warning'`) форму невалидной не делают.
   * @public
   */
  public validate(
    withoutFocusOrValidationSettings: ValidateArgumentType = { focusMode: FocusMode.Errors },
  ): Promise<boolean> {
    if (!this.childContext) {
      warning(false, 'childContext is not defined');
      return Promise.resolve(false);
    }
    return this.childContext.validate(withoutFocusOrValidationSettings);
  }

  public render(): React.JSX.Element {
    return (
      <ValidationContextWrapper
        data-tid={this.props['data-tid']}
        ref={this.refChildContext}
        scrollOffset={this.props.scrollOffset}
        disableSmoothScroll={this.getProps().disableSmoothScroll}
        onValidationUpdated={this.props.onValidationUpdated}
      >
        {this.props.children}
      </ValidationContextWrapper>
    );
  }

  private refChildContext = (el: ValidationContextWrapper | null) => {
    this.childContext = el;
  };
}
