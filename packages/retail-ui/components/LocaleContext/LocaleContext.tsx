import createReactContext from 'create-react-context';
import * as React from 'react';
import { defaultLangCode } from './constants';
import { LangCodes, LocaleControls } from "./types";

const Context = createReactContext<LocaleContextProps>({
  locale: {},
  langCode: defaultLangCode
});

export interface LocaleContextProps {
  locale?: LocaleControls;
  langCode?: LangCodes;
}

export const LocaleContextConsumer = Context.Consumer;

export default class LocaleContext extends React.Component<LocaleContextProps> {
  public render() {
    return (
      <Context.Provider value={this.props}>{this.props.children}</Context.Provider>
    );
  }
}
