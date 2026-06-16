import { Token, TokenDataTids } from '@skbkontur/react-ui/components/Token';
import { useLocaleForControl } from '@skbkontur/react-ui/lib/locale/useLocaleForControl';
import { ThemeContext } from '@skbkontur/react-ui/lib/theming/ThemeContext';
import { ThemeFactory } from '@skbkontur/react-ui/lib/theming/ThemeFactory';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { TableLocaleHelper } from '../../../locale/index.js';
import { TableDataTids } from '../TableDataTids.js';

export interface TableTokenProps {
  caption: string;
  className?: string;
  onRemove: () => void;
  removeButtonAriaLabel?: string;
}

export const TableToken = forwardRef<HTMLElement, TableTokenProps>(
  ({ caption, className, onRemove, removeButtonAriaLabel }, ref) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const onRemoveRef = useRef(onRemove);
    const [focusElement, setFocusElement] = useState<HTMLElement | null>(null);
    onRemoveRef.current = onRemove;

    const locale = useLocaleForControl('Table', TableLocaleHelper);
    const ariaLabel = removeButtonAriaLabel ?? `${locale.removeTokenLabel}: ${caption}`;

    // TODO: убрать этот хак, когда у Token в @skbkontur/react-ui крестик
    // удаления станет доступным с клавиатуры. Сейчас CloseButtonIcon внутри
    // Token рендерится с tabbable: false (tabindex=-1), поэтому удалить токен
    // клавиатурой штатно невозможно — обходим через DOM-патч после монтирования.
    useEffect(() => {
      const root = rootRef.current;
      if (!root) {
        return;
      }
      const removeIcon = root.querySelector<HTMLElement>(`[data-tid="${TokenDataTids.removeIcon}"]`);
      if (!removeIcon) {
        return;
      }

      const innerButton = removeIcon.querySelector<HTMLElement>('button');

      removeIcon.removeAttribute('role');
      removeIcon.removeAttribute('tabindex');
      removeIcon.removeAttribute('aria-label');

      if (!innerButton) {
        setFocusElement(null);
        return;
      }

      innerButton.setAttribute('tabindex', '0');
      innerButton.setAttribute('aria-label', ariaLabel);
      innerButton.setAttribute('data-tid', TableDataTids.removeToken);
      setFocusElement(innerButton);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onRemoveRef.current();
        }
      };
      // Нативная кнопка по Enter/Space сама порождает click (detail === 0),
      // который всплыл бы к span-обёртке Token и вызвал onRemove повторно.
      // Гасим только синтезированный с клавиатуры click; мышиный (detail > 0)
      // пропускаем — его штатно обрабатывает onRemove самого Token.
      const handleClick = (e: MouseEvent) => {
        if (e.detail === 0) {
          e.stopPropagation();
        }
      };
      innerButton.addEventListener('keydown', handleKeyDown);
      innerButton.addEventListener('click', handleClick);
      return () => {
        innerButton.removeEventListener('keydown', handleKeyDown);
        innerButton.removeEventListener('click', handleClick);
      };
    }, [ariaLabel]);

    useImperativeHandle(ref, () => (focusElement ?? rootRef.current) as HTMLElement, [focusElement]);

    return (
      <span
        ref={(node) => {
          rootRef.current = node;
        }}
        style={{ display: 'inline-flex' }}
      >
        <ThemeContext.Consumer>
          {(theme) => (
            <ThemeContext.Provider
              value={ThemeFactory.create(
                {
                  tokenPaddingXMedium: '8px',
                  tokenBg: theme.bgDefault,
                  tokenBgHover: theme.bgDefault,
                  tokenBorderWidth: '0',
                  tokenBorderRadius: '16px',
                  tokenPaddingYSmall: '4px',
                  tokenPaddingXSmall: '8px',
                },
                theme
              )}
            >
              <Token className={className} onRemove={onRemove} data-tid={TableDataTids.appliedFilterToken}>
                <span>{caption}</span>
              </Token>
            </ThemeContext.Provider>
          )}
        </ThemeContext.Consumer>
      </span>
    );
  }
);
TableToken.displayName = 'TableToken';
