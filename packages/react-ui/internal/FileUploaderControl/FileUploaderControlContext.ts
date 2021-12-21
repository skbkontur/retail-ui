import React from 'react';

import { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: FileUploaderFileStatus) => void;
  files: FileUploaderAttachedFile[];
  setFiles: (files: FileUploaderAttachedFile[]) => void;
  removeFile: (fileId: string) => void;
  reset: () => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
