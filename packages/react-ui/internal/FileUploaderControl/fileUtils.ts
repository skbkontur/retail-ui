import { getUid } from '../../lib/uidUtils.js';

import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult.js';

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
    id: getUid(),
    originalFile: file,
    status: FileUploaderFileStatus.Attached,
    validationResult: FileUploaderFileValidationResult.ok(),
  };
};
