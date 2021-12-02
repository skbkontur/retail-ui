import React from 'react';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';
import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: FileUploaderFileStatus) => void;
  files: FileUploaderAttachedFile[];
  setFiles: (files: FileUploaderAttachedFile[]) => void;
  removeFile: (fileId: string) => void;
  reset: () => void;

  setFileValidationResult: (fileId: string, validationResult: FileUploaderFileValidationResult) => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
