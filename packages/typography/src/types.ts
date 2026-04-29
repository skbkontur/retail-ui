import type { AriaAttributes, HTMLAttributes, PropsWithChildren } from 'react';

export type TTextTags = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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
       */
      tag: TTextTags;
      /**
       * Включить внешние отступы
       * @default false
       */
      spacing?: boolean;
      /**
       * Широкая колонка — от 40 до 60 символов в строке
       * @default false
       */
      wideColumn?: boolean;
      'data-tid'?: string;
    }> {}
