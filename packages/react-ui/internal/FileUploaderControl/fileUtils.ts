import { getGuid } from '../../lib/guidUtils';

import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export enum FileUploaderFileStatus {
  Attached = 'Attached',
  Loading = 'Loading',
  Uploaded = 'Uploaded',
  Error = 'Error',
}

export interface FileUploaderAttachedFile {
  id: string;
  originalFile: File;
  status: FileUploaderFileStatus;
  validationResult: FileUploaderFileValidationResult;
}

export const getAttachedFile = (file: File): FileUploaderAttachedFile => {
  return {
    id: getGuid(),
    originalFile: file,
    status: FileUploaderFileStatus.Attached,
    validationResult: FileUploaderFileValidationResult.ok(),
  };
};
