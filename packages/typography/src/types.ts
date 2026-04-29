import type { AriaAttributes, HTMLAttributes, PropsWithChildren } from 'react';

export type TTextTags =
  | 'span'
  | 'div'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'label'
  | 'time'
  | 'data'
  | 'abbr'
  | 'cite'
  | 'small'
  | 'mark'
  | 'code'
  | 'address';

export type TTextSizes = 12 | 14 | 16 | 18 | 20 | 22 | 24 | 28 | 32 | 36 | 40 | 48 | 56;

export interface TTextProps
  extends
    Pick<AriaAttributes, 'aria-describedby' | 'aria-label' | 'aria-labelledby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id' | 'role' | 'title' | 'className' | 'style'>,
    PropsWithChildren<{
      /**
       * Размер шрифта
       */
      size: TTextSizes;
      /**
       * HTML-тег
       * @default span
       */
      as?: TTextTags;
      /**
       * Включить внешние отступы
       * @default false
       */
      spacing?: boolean;
      /**
       * Широкая колонка — от 40 символов в строке
       * @default false
       */
      wide?: boolean;
      'data-tid'?: string;
    }> {}
