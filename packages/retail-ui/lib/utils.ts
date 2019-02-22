import {Nullable} from "../typings/utility-types";

type CustomErrorCode = number | string;

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const emptyHandler = () => undefined;

export class CustomError extends Error {
  public code: Nullable<CustomErrorCode>;

  constructor(message?: string, code?: CustomErrorCode) {
    super(message);
    this.code = code;
  }
}
