import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';

import { Nullable } from '../../typings/utility-types';

import { PortalProps, RenderContainerProps } from './RenderContainerTypes';

interface RenderInnerContainerProps extends RenderContainerProps {
  domContainer: Nullable<HTMLElement>;
  rootId: string;
}

// Заглушка нужна для корректной гидрации порталов после SSR,
// которую реакт сам пока не поддерживает.
// @see https://github.com/facebook/react/issues/13097
// А также для вставки актуального render-container-id на клиенте.
//
// Дело в том, что во время гидрации, структура HTML на сервере
// и на клиенте должна совпадать, иначе возможны артефакты.
// Алгоритм там примерно такой. Клиент во время гидрации идет
// по этим двум деревьям и сравнивает узлы. Элементы разных типов
// он подменяет на свои. А те, что совпадают, он оставляет как есть
// вместе со всеми атрибутами, навесив только обработчики событий.
//
// Поэтому, для портала, который рендерится только на клиенте,
// нужно использовать серверную заглушку, чтобы при гидрации
// он не испортил какой-то другой элемент. Null не подходит,
// т.к. на сервере он тоже не рендерится.
// А элемент с render-container-id нужно отрендерить с нуля.

const SSRPlaceholder = () => <script data-id="ssr-placeholder" />;

export const Portal = ({ container, rt_rootID, children }: PortalProps) => {
  // container exists only in browser
  return (
    <React.Fragment>
      {container ? ReactDOM.createPortal(children, container) : <SSRPlaceholder />}
      {container ? <noscript data-render-container-id={rt_rootID} /> : <SSRPlaceholder />}
    </React.Fragment>
  );
};

export class RenderInnerContainer extends React.Component<RenderInnerContainerProps> {
  public static __KONTUR_REACT_UI__ = 'RenderInnerContainer';

  public render() {
    const { anchor, children, domContainer, rootId } = this.props;
    let inner = anchor;

    if (children) {
      inner = (
        <React.Fragment>
          {anchor}
          <Portal key="portal-ref" rt_rootID={rootId} container={domContainer}>
            {children}
          </Portal>
        </React.Fragment>
      );
    }

    return inner;
  }
}

Portal.propTypes = {
  container: propTypes.node.isRequired,
  rt_rootID: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};
