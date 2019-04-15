import createReactContext from 'create-react-context';
import { Tab } from './Tab';
import { emptyHandler } from '../../lib/utils';

export interface TabsContextType {
  vertical: boolean;
  activeTab: string;
  getTab: (id: string) => Tab | null | void;
  addTab: (id: string, getNode: () => Tab) => void;
  notifyUpdate: () => void;
  removeTab: (id: string) => void;
  shiftFocus: (fromTab: string, delta: number) => void;
  switchTab: (id: string) => void;
}

export const TabsContext = createReactContext<TabsContextType>({
  vertical: false,
  activeTab: '',
  getTab: emptyHandler,
  addTab: emptyHandler,
  notifyUpdate: emptyHandler,
  removeTab: emptyHandler,
  shiftFocus: emptyHandler,
  switchTab: emptyHandler,
});
