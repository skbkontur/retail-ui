import type { Emotion } from '@emotion/css/create-instance';

import { getEmptyDisplayValue } from '../../components/TimePicker/helpers/TimePicker.value.js';
import { memoizeGetStyles } from '../../lib/theming/Emotion.js';
import type { Theme } from '../../lib/theming/Theme.js';

export const getStyles = memoizeGetStyles(({ css }: Emotion) => ({
  root() {
    return css`
      cursor: text;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    `;
  },

  /**
   * Резервируют место под время, когда значения нет: без этого поле с suffix
   * сужается на ширину времени, а при вводе снова расширяется.
   * Плейсхолдер уходит в псевдоэлемент — он занимает ту же ширину, что и время,
   * но не попадает в текст поля и не читается скринридером.
   * Отступы разделителей есть только у отрисованного времени, поэтому их добавляем сюда сами:
   * по одному `letter-spacing` на каждый разделитель — один в формате `HH:mm` и два в `HH:mm:ss`.
   */
  emptyPlaceholderSmall(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm')}';
        visibility: hidden;
        padding-right: ${t.timePickerSeparatorPaddingXSmall};
      }
    `;
  },

  emptyPlaceholderMedium(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm')}';
        visibility: hidden;
        padding-right: ${t.timePickerSeparatorPaddingXMedium};
      }
    `;
  },

  emptyPlaceholderLarge(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm')}';
        visibility: hidden;
        padding-right: ${t.timePickerSeparatorPaddingXLarge};
      }
    `;
  },

  emptyPlaceholderWithSecondsSmall(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm:ss')}';
        visibility: hidden;
        padding-right: calc(${t.timePickerSeparatorPaddingXSmall} * 2);
      }
    `;
  },

  emptyPlaceholderWithSecondsMedium(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm:ss')}';
        visibility: hidden;
        padding-right: calc(${t.timePickerSeparatorPaddingXMedium} * 2);
      }
    `;
  },

  emptyPlaceholderWithSecondsLarge(t: Theme) {
    return css`
      &::before {
        content: '${getEmptyDisplayValue('HH:mm:ss')}';
        visibility: hidden;
        padding-right: calc(${t.timePickerSeparatorPaddingXLarge} * 2);
      }
    `;
  },

  selected(t: Theme) {
    const getSelection = (background: string, color: string) =>
      (background || color) &&
      `& ::selection {
        background: ${background};
        color: ${color};
      }`;

    return css`
      cursor: text;
      ${getSelection(t.timePickerSelectedBgColor, t.timePickerSelectedTextColor)}
    `;
  },

  mask(t: Theme) {
    return css`
      color: ${t.timePickerMaskColor};
    `;
  },

  segment() {
    return css`
      display: inline;
      white-space: pre;
    `;
  },

  separator() {
    return css`
      display: inline;
      position: relative;

      /*
       * Отрисованный разделитель центрируем по строке: у абсолютного псевдоэлемента
       * своя строка с полулидингом, поэтому от верхнего края он оказался бы ниже текста сегментов.
       */
      &::before {
        content: ':';
        content: ':' / '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        letter-spacing: normal;
        text-align: center;
      }
    `;
  },

  /**
   * Разделитель рисует псевдоэлемент, а сам текст только держит место и попадает в выделение.
   * В задизейбленном поле `-webkit-text-fill-color` приходит по наследству и перебивает `color`,
   * поэтому гасим и его — иначе двоеточие отрисуется дважды.
   */
  separatorText() {
    return css`
      color: transparent;
      -webkit-text-fill-color: transparent;
    `;
  },

  separatorSmall(t: Theme) {
    return css`
      letter-spacing: ${t.timePickerSeparatorPaddingXSmall};

      &::before {
        margin-top: ${t.timePickerSeparatorOffsetTopSmall};
      }
    `;
  },

  separatorMedium(t: Theme) {
    return css`
      letter-spacing: ${t.timePickerSeparatorPaddingXMedium};

      &::before {
        margin-top: ${t.timePickerSeparatorOffsetTopMedium};
      }
    `;
  },

  separatorLarge(t: Theme) {
    return css`
      letter-spacing: ${t.timePickerSeparatorPaddingXLarge};

      &::before {
        margin-top: ${t.timePickerSeparatorOffsetTopLarge};
      }
    `;
  },

  separatorFilled() {
    return css`
      color: inherit;
    `;
  },
}));
