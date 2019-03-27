import warning from 'warning';

export class Logger {
  public static warnings = {
    baseUrlOrApiIsRequired: 'property "baseUrl" or "api" is required',
    noBaseUrl: 'baseUrl is not specified',
    fetchError: 'fetch error',
  };

  public static log = (message: string, details?: string) => {
    warning(false, `[Fias] ${message}` + (details ? `: ${details}` : ``));
  };
}

export default Logger;
