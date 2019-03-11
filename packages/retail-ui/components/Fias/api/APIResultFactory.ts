import { APIResult } from '../types';

export class APIResultFactory {
  public static success = <Data>(data: Data): APIResult<Data> => {
    return {
      success: true,
      data,
    };
  };

  public static fail = <Data>(message: string = ''): APIResult<Data> => {
    return {
      success: false,
      error: new Error(message),
    };
  };
}
