import createReactContext from 'create-react-context';
import * as React from 'react';
import { defaultLangCode } from './constants';
import { LangCodes, LocaleControls } from './types';

const LocaleContext = createReactContext<LocaleProviderProps>({
  locale: {},
  langCode: defaultLangCode,
});

export interface LocaleProviderProps {
  locale?: LocaleControls;
  langCode?: LangCodes;
}

export const LocaleConsumer = LocaleContext.Consumer;

export default class LocaleProvider extends React.Component<LocaleProviderProps> {
  public render() {
    return <LocaleContext.Provider value={this.props}>{this.props.children}</LocaleContext.Provider>;
  }
}
