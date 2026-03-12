import { useLocaleForControl } from '../../../lib/locale/useLocaleForControl.js';
import { FileUploaderLocaleHelper } from '../locale/index.js';

export const useControlLocale = (): ReturnType<typeof FileUploaderLocaleHelper.get> =>
  useLocaleForControl('FileUploader', FileUploaderLocaleHelper);
