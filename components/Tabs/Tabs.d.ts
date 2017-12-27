import * as React from 'react';
import Tab from './Tab';

export interface TabsProps {
  value: string;
  active?: boolean;
  children?: React.ReactNode;
  indicatorClassName?: string;
  onChange?: (ev: { target: { value: string } }, value: string) => void;
  vertical?: boolean;
  width?: number | string;
}

declare class Tabs extends React.Component<TabsProps, any> {
  static Tab: typeof Tab;
}

export default Tabs;
