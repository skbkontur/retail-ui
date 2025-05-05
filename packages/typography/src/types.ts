import type { AriaAttributes, CSSProperties, HTMLAttributes } from 'react';

export type TTextTags = 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TTextSizes = 12 | 14 | 16 | 18 | 20 | 22 | 24 | 28 | 32 | 36 | 40 | 48 | 56;

export interface TTextProps
  extends Pick<AriaAttributes, 'aria-describedby' | 'aria-label' | 'aria-labelledby'>,
    Pick<HTMLAttributes<HTMLElement>, 'id' | 'role' | 'title'> {
  /**
   * Размер шрифта
   */
  size: TTextSizes;
  /**
   * HTML-тег
   */
  tag: TTextTags;
  /**
   * Отключить отступы
   * @default false
   */
  noSpacing?: boolean;
  /**
   * Широкая колонка — от 40 до 60 символов в строке
   * @default false
   */
  wideColumn?: boolean;
  /**
   * Надпись
   */
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  'data-tid'?: string;
}
