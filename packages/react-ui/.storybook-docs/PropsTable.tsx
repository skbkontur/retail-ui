import React, { useRef, useState } from 'react';
import { ArgTypes, useOf } from '@storybook/blocks';

import { css } from '../lib/theming/Emotion';

import type { PublicMethod } from './MethodsTable';
import { PublicMethods } from './MethodsTable';

export const PropsTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const detailsStyles = css`
    & {
      margin-top: 8px;
      margin-bottom: 40px;
    }

    & summary {
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      padding: 16px;
      background: #fcfdff;
      border: 1px solid #d9dfe3;
      color: #222 !important;
      user-select: none;
      transition: background-color 0.1s ease;
      cursor: pointer;
    }

    & summary::-webkit-details-marker {
      display: none;
    }

    & summary::marker {
      content: none;
    }

    & summary:before {
      content: '';
      display: inline-block;
      position: relative;
      top: 3px;
      left: -4.5px;
      width: 16px;
      height: 16px;
      background: url(https://s.kontur.ru/common-v2/icons-ui/black/arrow-c-right/arrow-c-right-16-Regular.svg);
      transition: transform 0.1s ease;
    }

    &:not([open]):hover summary {
      background: #f9fafc !important;
      border: 1px solid #dde4ea;
    }

    &:not([open]):active summary {
      background: #f6f7fb !important;
      border: 1px solid #d1dae1;
    }

    &[open] summary {
      border: 1px solid #dde4ea;
    }

    &[open] summary:before {
      transform: rotate(90deg);
    }

    &[open] summary,
    &[open] summary:hover {
      background: #f9fafc !important;
    }

    &[open] summary:active {
      background: #f5f7fb !important;
    }

    &[open] table {
      margin-top: 4px !important;
    }
  `;

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const useMethods = (): PublicMethod[] => {
    try {
      const resolved = useOf('meta') as any;
      const __methodsDocgenInfo = resolved.preparedMeta.component.__methodsDocgenInfo ?? [];
      return __methodsDocgenInfo.map((method: any) => ({
        name: method.name,
        description: method.description,
        params: method.params,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  const methods = useMethods();

  return (
    <details className={detailsStyles} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
      <summary>{isOpen ? 'Скрыть список пропсов и методов' : 'Показать список пропсов и методов'}</summary>
      <div ref={tableContainerRef}>
        <ArgTypes />
      </div>
      {methods.length > 0 && (
        <div style={{ marginTop: -16 }}>
          <PublicMethods methods={methods} className={tableContainerRef?.current?.querySelector('table')?.className} />
        </div>
      )}
    </details>
  );
};
