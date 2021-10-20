import {
  IFileUploaderControlProviderProps,
  withFileUploaderControlProvider,
} from '../../internal/FileUploaderControl/FileUploaderControlProvider';

import { _FileUploader, _IFileUploaderProps } from './_FileUploader';

export interface IFileUploaderProps extends _IFileUploaderProps, IFileUploaderControlProviderProps {}

export const FileUploader = withFileUploaderControlProvider(_FileUploader);
FileUploader.displayName = 'FileUploader';
