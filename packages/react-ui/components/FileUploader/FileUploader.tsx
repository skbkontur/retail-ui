import {
  IFileUploaderControlProviderProps,
  withFileUploaderControlProvider,
} from '../../internal/FileUploaderControl/FileUploaderControlProvider';

import { _FileUploader, _IFileUploaderProps, IFileUploaderRef } from './_FileUploader';

export interface IFileUploaderProps extends _IFileUploaderProps, IFileUploaderControlProviderProps {}

export const FileUploader = withFileUploaderControlProvider<IFileUploaderProps, IFileUploaderRef>(_FileUploader);
FileUploader.displayName = 'FileUploader';
