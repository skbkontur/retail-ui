import React from 'react';

import { UploadFile, UploadFileStatus } from '../../lib/fileUtils';

import { UploadFileValidationResult } from './UploadFileValidationResult';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: UploadFileStatus) => void;
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
  removeFile: (fileId: string) => void;

  setFileValidationResult: (fileId: string, validationResult: UploadFileValidationResult) => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
