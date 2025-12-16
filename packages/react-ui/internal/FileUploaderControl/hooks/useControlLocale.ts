import { useLocaleForControl } from '../../../lib/locale/useLocaleForControl';
import { FileUploaderLocaleHelper } from '../../../components/FileUploader/locale';

export const useControlLocale = (isVersionGTE5_5 = true) =>
  useLocaleForControl('FileUploader', new FileUploaderLocaleHelper(isVersionGTE5_5));
