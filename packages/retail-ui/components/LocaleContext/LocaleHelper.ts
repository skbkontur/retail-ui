import { defaultLangCode } from './constants';
import { LangCodes } from "./types";

export class LocaleHelper<C> {
  private readonly locales: {[key in LangCodes]?: C} = {};
  private readonly langCode: LangCodes = defaultLangCode;

  public constructor(locales: {[key in LangCodes]?: C}, langCode?: LangCodes) {
    this.locales = locales;
    this.langCode = langCode || this.langCode;
  }

  public get(langCode: LangCodes = this.langCode): object | C {
    return this.locales[langCode] || {};
  }
}

