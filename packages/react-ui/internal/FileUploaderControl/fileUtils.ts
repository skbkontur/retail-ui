import { getUid } from '../../lib/uidUtils';

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
}

export const getAttachedFile = (file: File): FileUploaderAttachedFile => {
  return {
    id: getUid(),
    originalFile: file,
    status: FileUploaderFileStatus.Attached
  };
};
