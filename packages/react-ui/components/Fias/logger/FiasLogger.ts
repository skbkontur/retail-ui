import warning from 'warning';

export class FiasLogger {
  public static warnings = {
    baseUrlOrApiIsRequired: 'property "baseUrl" or "api" is required',
    noBaseUrl: 'baseUrl is not specified',
    fetchError: 'fetch error',
  };

  public static log = (message: string, details?: string) => {
    warning(false, `[Fias] ${message}` + (details ? `: ${details}` : ``));
  };
}
