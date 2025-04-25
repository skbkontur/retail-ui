import React from 'react';

import type { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';
import type { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: FileUploaderFileStatus) => void;
  files: FileUploaderAttachedFile[];
  setFiles: (files: FileUploaderAttachedFile[]) => void;
  removeFile: (fileId: string) => void;
  reset: () => void;
  isMinLengthReached: boolean;
  setIsMinLengthReached: (value: boolean) => void;

  setFileValidationResult: (fileId: string, validationResult: FileUploaderFileValidationResult) => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
