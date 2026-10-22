import React from 'react';

import type { Nullable } from '../typings/Types.js';
import { tooltip } from './ErrorRenderer.js';
import type {
  RenderErrorMessage,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
  ValidationWrapperInternalProps,
} from './ValidationWrapperInternal.js';
import { ValidationWrapperInternal } from './ValidationWrapperInternal.js';

export interface ValidationInfo {
  /** Задаёт, когда показать ошибку: после потери фокуса (`lostfocus`), после отправки формы (`submit`) или сразу (`immediate`).
   * @default 'lostfocus' */
  type?: Nullable<ValidationBehaviour>;
  /** Уровень валидации: ошибка (`error`) или предупреждение (`warning`). Предупреждение не мешает отправить форму.
   * @default 'error' */
  level?: Nullable<ValidationLevel>;
  /** Текст сообщения. Можно передать любую вёрстку. */
  message: React.ReactNode;
  /** Делает валидацию независимой: контрол проверяется только при потере собственного фокуса, а не любого контрола формы.
   * @default false */
  independent?: boolean;
}

export interface ValidationWrapperProps extends Pick<ValidationWrapperInternalProps, 'data-tid'> {
  /** @ignore */
  children?: React.ReactElement<any>;
  /** Результат проверки контрола: `null`, если ошибок нет, или объект с сообщением, типом и уровнем. */
  validationInfo: Nullable<ValidationInfo>;
  /** Задаёт, как показать сообщение: в тултипе — `tooltip(pos)`, текстом — `text(pos)` или своей функцией.
   * @default tooltip('right top') */
  renderMessage?: Nullable<RenderErrorMessage>;
}

/** Обёртка валидации оборачивает один контрол: подсвечивает его и показывает сообщение.
 * Когда показать ошибку, обёртка решает сама по правилам Контур.Гайда — передавайте в `validationInfo` актуальный результат проверки.
 */
export class ValidationWrapper extends React.Component<ValidationWrapperProps> {
  public static __KONTUR_REACT_UI__ = 'ValidationWrapper';
  public static displayName = 'ValidationWrapper';

  public render(): React.JSX.Element {
    const { children, validationInfo, renderMessage, 'data-tid': datTid } = this.props;
    const validation: Nullable<Validation> = validationInfo
      ? {
          level: validationInfo.level || 'error',
          behaviour: validationInfo.type || 'lostfocus',
          message: validationInfo.message,
          independent: validationInfo.independent || false,
        }
      : null;

    return (
      <ValidationWrapperInternal
        data-tid={datTid}
        errorMessage={renderMessage || tooltip('right top')}
        validation={validation}
      >
        {children}
      </ValidationWrapperInternal>
    );
  }
}
