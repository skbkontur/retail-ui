import { defaultLangCode } from './constants';
import { LangCodes } from './types';

export class LocaleHelper<C> {
  private readonly locales: { [key in LangCodes]?: C };
  private readonly defaultLangCode: LangCodes;

  public constructor(locales: { [key in LangCodes]?: C }, langCode: LangCodes = defaultLangCode) {
    this.locales = locales;
    this.defaultLangCode = langCode;
  }

  public get(langCode: LangCodes = this.defaultLangCode): C {
    return this.locales[langCode] || this.locales[this.defaultLangCode] || ({} as C);
  }
}
