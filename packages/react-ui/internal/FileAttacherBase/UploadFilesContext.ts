import * as React from "react";
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { ValidationResult } from './ValidationResult';

export interface UploadFilesContextProps {
  setFileStatus: (fileId: string, status: UploadFileStatus) => void;
  files: IUploadFile[];
  setFiles: (files: IUploadFile[]) => void;
  removeFile: (fileId: string) => void;

  setFileValidationResult: (fileId: string, validationResult: ValidationResult) => void;
}

export const UploadFilesContext = React.createContext({} as UploadFilesContextProps);
