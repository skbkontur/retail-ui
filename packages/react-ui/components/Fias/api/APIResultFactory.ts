import { FiasAPIResult } from '../types';

export class FiasAPIResultFactory {
  public static success = <Data>(data: Data): FiasAPIResult<Data> => {
    return {
      success: true,
      data,
    };
  };

  public static fail = <Data>(message = ''): FiasAPIResult<Data> => {
    return {
      success: false,
      error: new Error(message),
    };
  };
}
