import { Keyof } from 'retail-ui/typings/utility-types';
import { MetrikaVariable, MetrikaVariables, MetrikaVariableType } from './metrikaTypes';

export class DateTimeISO {
  public static now = () => {
    return new Date().toISOString();
  };
  public static from = (date: Date) => {
    return date.toISOString();
  };
  private readonly dateTimeISO: string;
  public constructor(date: Date = new Date()) {
    this.dateTimeISO = date.toISOString();
  }
  public toString = (): string => this.dateTimeISO;
}

export enum ConvertType {
  SubstitutionString = 'SubstitutionString',
  JSONStringify = 'JSONStringify',
}

export default class ConverterProps<P> {
  public static substitutionString = (value: string): string => {
    let str = '';
    while (str.length < value.length) {
      str += Math.random()
        .toString(36)
        .substring(2, 12);
    }
    return str.substring(0, value.length);
  };

  private readonly originalProps: P;
  private readonly convertedProps: MetrikaVariables<P> = {};
  private readonly customConvertedPropNames: Array<Keyof<P>> = [];

  constructor(props: P) {
    this.originalProps = props;
  }

  public convertProp = (propsName: Keyof<P>, convertType: ConvertType): ConverterProps<P> => {
    this.customConvertedPropNames.push(propsName);
    const value = this.originalProps[propsName];
    let convertedValue;
    if (convertType === ConvertType.SubstitutionString && typeof value === 'string') {
      convertedValue = ConverterProps.substitutionString(value);
    }
    if (convertType === ConvertType.JSONStringify) {
      convertedValue = JSON.stringify(value);
    }
    if (convertedValue !== undefined) {
      this.convertedProps[propsName] = {
        value: convertedValue,
        type: MetrikaVariableType.String,
      };
    }
    return this;
  };

  public customConvertProp = (
    propsName: Keyof<P>,
    customConverter: (propValue: any) => { value: string; type?: MetrikaVariableType } | null,
  ): ConverterProps<P> => {
    this.customConvertedPropNames.push(propsName);
    const convertedValue = customConverter(this.originalProps[propsName]);
    if (convertedValue !== null) {
      this.convertedProps[propsName] = {
        type: MetrikaVariableType.String,
        ...convertedValue,
      } as MetrikaVariable;
    }
    return this;
  };

  public getConvertedProps = (): MetrikaVariables => {
    this.convert();
    return this.convertedProps;
  };

  private convert = () => {
    for (const key in this.originalProps) {
      if (!(this.originalProps as any).hasOwnProperty(key) || this.customConvertedPropNames.includes(key)) {
        continue;
      }
      const value = this.originalProps[key];
      let convertedValue: string | undefined;
      let type: MetrikaVariableType = MetrikaVariableType.String;

      if (value === null) {
        convertedValue = 'null';
      } else if (typeof value === 'function') {
        convertedValue = 'true';
      } else if (typeof value === 'boolean') {
        convertedValue = String(value);
      } else if (key === 'children') {
        convertedValue = String(value != null);
      } else if (typeof value === 'number') {
        convertedValue = String(value);
        type = MetrikaVariableType.Number;
      } else if (typeof value === 'string') {
        convertedValue = value;
      } else if (value === undefined || convertedValue === undefined) {
        continue;
      }

      this.convertedProps[key] = {
        type,
        value: convertedValue,
      };
    }
  };
}
