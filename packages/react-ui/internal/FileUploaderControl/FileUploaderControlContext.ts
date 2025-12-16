import React from 'react';

import type { FileUploaderAttachedFile, FileUploaderFileStatus } from './fileUtils';
import type { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export interface FileUploaderControlContextProps {
  setFileStatus: (fileId: string, status: FileUploaderFileStatus) => void;
  files: FileUploaderAttachedFile[];
  setFiles: (files: FileUploaderAttachedFile[]) => void;
  removeFile: (fileId: string) => void;
  reset: () => void;
  /**
   * @deprecated Не используется в коде. Будет удалена в следующем мажоре.
   */
  isMinLengthReached: boolean;
  /**
   * @deprecated Не используется в коде. Будет удалена в следующем мажоре.
   */
  setIsMinLengthReached: (value: boolean) => void;

  setFileValidationResult: (
    fileId: string,
    validationResult: FileUploaderFileValidationResult,
    status?: FileUploaderFileStatus,
  ) => void;
}

export const FileUploaderControlContext = React.createContext({} as FileUploaderControlContextProps);
