import { useLocaleForControl } from '../../../lib/locale/useLocaleForControl.js';
import { FileUploaderLocaleHelper } from '../../../components/FileUploader/locale/index.js';

export const useControlLocale = () => useLocaleForControl('FileUploader', FileUploaderLocaleHelper);
