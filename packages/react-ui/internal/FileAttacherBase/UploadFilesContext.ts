import * as React from "react";
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { ValidationResult } from './ValidationResult';
import { FileAttacherBaseValidationError } from './FileAttacherBase';

export interface UploadFilesContextProps {
  setFileStatus: (fileId: string, status: UploadFileStatus) => void;
  files: IUploadFile[];
  setFiles: (files: IUploadFile[]) => void;
  removeFile: (fileId: string) => void;
  validationResult: ValidationResult<FileAttacherBaseValidationError>;
}

export const UploadFilesContext = React.createContext({} as UploadFilesContextProps);
