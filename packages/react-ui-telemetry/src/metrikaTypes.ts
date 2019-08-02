import { Guid } from 'guid-typescript';
import { DateTimeISO } from './ConverterProps';

export interface MetrikaEvent {
  id: Guid;
  clientInstanceId?: Guid;
  traceId?: string;
  time: MetrikaEventTime;
  path: MetrikaEventPath;
  variables?: MetrikaVariables;
  TraceId?: string;
  appContext?: MetrikaAppContext;
}

export enum MetrikaVariableType {
  String = 'string',
  Number = 'number',
  Uuid = 'uuid',
  Base64 = 'base64',
}

export interface MetrikaVariable {
  value: string;
  type: MetrikaVariableType;
}

export type MetrikaVariables<P = {}> = {
  [key in Extract<keyof P, string>]?: MetrikaVariable
}

export interface MetrikaEventPath {
  category: string;
  action: string;
  label?: string;
  view?: string;
}

export interface MetrikaEventTime {
  clientTime: DateTimeISO;
  sendFromClientTime: DateTimeISO;
}

interface MetrikaBrowser {
  userAgent: string;
}

interface MetrikaOS {
  name: string;
  version: string;
  bitSet?: string;
}

interface MetrikaAppContext {
  os?: MetrikaOS;
  browser?: MetrikaBrowser;
}
