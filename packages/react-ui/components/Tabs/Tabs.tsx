import React from 'react';
import PropTypes from 'prop-types';

import { emptyHandler } from '../../lib/utils';
import { ThemeContext } from '../../lib/theming/ThemeContext';
import { Theme } from '../../lib/theming/Theme';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';
import { getRootNode } from '../../lib/rootNode/getRootNode';
import { rootNode, TSetRootNode } from '../../lib/rootNode';

import { Indicator, indicatorDataTid } from './Indicator';
import { styles } from './Tabs.styles';
import { TabsContext, TabsContextType } from './TabsContext';
import { Tab, tabDataTid } from './Tab';

type ValueBaseType = string;
type TabType<T extends ValueBaseType> = {
  getNode: () => Tab<T> | null;
  id: T;
};

export interface TabsProps<T extends ValueBaseType = string> extends CommonProps {
  /**
   * Tab component should be child of Tabs component
   */
  children?: React.ReactNode;

  /**
   * Classname of indicator
   */
  indicatorClassName?: string;

  /**
   * Tabs change event
   */
  onValueChange?: (value: T) => void;

  /**
   * Active tab identifier
   */
  value: T;

  /**
   * Vertical indicator
   * @default false
   */
  vertical: boolean;

  /**
   * Width of tabs container
   */
  width?: number | string;
}

export const tabsDataTid = {
  root: 'Tabs__root',
  tab: tabDataTid,
  indicator: indicatorDataTid,
};

/**
 * Tabs wrapper
 *
 * contains static property `Tab`
 */
@rootNode
export class Tabs<T extends string = string> extends React.Component<TabsProps<T>> {
  public static __KONTUR_REACT_UI__ = 'Tabs';

  public static propTypes = {
    children: PropTypes.node,
    indicatorClassName: PropTypes.string,
    value: PropTypes.string.isRequired,
    vertical: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  public static defaultProps = {
    vertical: false,
  };

  public static Tab = Tab;

  private theme!: Theme;

  private tabs: Array<TabType<T>> = [];

  private tabUpdates = {
    on: (cb: () => void) => {
      const index = this.listeners.push(cb);
      return () => {
        this.listeners.splice(index, 1);
      };
    },
  };

  private listeners: Array<typeof emptyHandler> = [];
  private setRootNode!: TSetRootNode;

  public render(): JSX.Element {
    const { vertical, value, width, children, indicatorClassName } = this.props;

    return (
      <ThemeContext.Consumer>
        {(theme) => {
          this.theme = theme;
          return (
            <CommonWrapper rootNodeRef={this.setRootNode} {...this.props}>
              <div
                data-tid={tabsDataTid.root}
                className={cx(styles.root(this.theme), vertical && styles.vertical())}
                style={{ width }}
              >
                <TabsContext.Provider
                  value={{
                    vertical,
                    activeTab: value,
                    getTab: this.getTab,
                    addTab: this.addTab,
                    removeTab: this.removeTab,
                    notifyUpdate: this.notifyUpdate,
                    shiftFocus: this.shiftFocus,
                    switchTab: this.switchTab,
                  }}
                >
                  {children}
                  <Indicator className={indicatorClassName} tabUpdates={this.tabUpdates} vertical={vertical} />
                </TabsContext.Provider>
              </div>
            </CommonWrapper>
          );
        }}
      </ThemeContext.Consumer>
    );
  }

  private shiftFocus: TabsContextType<T>['shiftFocus'] = (fromTab, delta) => {
    const { tabs } = this;
    const index = tabs.findIndex((x) => x.id === fromTab);
    const newIndex = Math.max(0, Math.min(index + delta, tabs.length - 1));
    const tab = tabs[newIndex];

    const tabNode = tab.getNode();
    const htmlNode = getRootNode(tabNode);

    if (htmlNode && htmlNode instanceof HTMLElement && typeof htmlNode.focus === 'function') {
      htmlNode.focus();
    }
  };

  private notifyUpdate: TabsContextType<T>['notifyUpdate'] = () => {
    this.listeners.forEach((cb) => cb());
  };

  private switchTab: TabsContextType<T>['switchTab'] = (id) => {
    const { onValueChange, value } = this.props;
    if (id !== value && onValueChange) {
      onValueChange(id);
    }
  };

  private getTab: TabsContextType<T>['getTab'] = (id) => {
    const { getNode = null } = this.tabs.find((x) => x.id === id) || {};
    return getNode && getNode();
  };

  private addTab: TabsContextType<T>['addTab'] = (id, getNode) => {
    this.tabs = this.tabs.concat({ id, getNode });
  };

  private removeTab: TabsContextType<T>['removeTab'] = (id) => {
    this.tabs = this.tabs.filter((tab) => tab.id !== id);
  };
}
