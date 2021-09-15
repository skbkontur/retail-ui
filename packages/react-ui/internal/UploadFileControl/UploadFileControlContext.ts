import * as React from "react";
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { UploadFileControlValidationResult } from './UploadFileControlValidationResult';

export interface UploadFilesContextProps {
  setFileStatus: (fileId: string, status: UploadFileStatus) => void;
  files: IUploadFile[];
  setFiles: (files: IUploadFile[]) => void;
  removeFile: (fileId: string) => void;

  setFileValidationResult: (fileId: string, validationResult: UploadFileControlValidationResult) => void;
}

export const UploadFileControlContext = React.createContext({} as UploadFilesContextProps);
