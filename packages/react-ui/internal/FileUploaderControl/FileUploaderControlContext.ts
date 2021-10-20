import React from 'react';

import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';

import { UploadFileValidationResult } from './UploadFileValidationResult';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: UploadFileStatus) => void;
  files: IUploadFile[];
  setFiles: (files: IUploadFile[]) => void;
  removeFile: (fileId: string) => void;

  setFileValidationResult: (fileId: string, validationResult: UploadFileValidationResult) => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
