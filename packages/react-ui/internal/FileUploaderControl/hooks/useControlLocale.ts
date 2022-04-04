import { useLocaleForControl } from '../../../lib/locale/useLocaleForControl';
import { FileUploaderLocaleHelper } from '../../../components/FileUploader/locale';

export const useControlLocale = () => useLocaleForControl('FileUploader', FileUploaderLocaleHelper);
