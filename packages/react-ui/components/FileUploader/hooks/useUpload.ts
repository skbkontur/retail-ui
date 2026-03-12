import { useCallback, useContext } from 'react';
import ReactDOM from 'react-dom';

import type { Nullable } from '../../../typings/utility-types.js';
import type { FileUploaderAttachedFile } from '../fileUtils.js';
import { FileUploaderFileStatus } from '../fileUtils.js';
import { FileUploaderControlContext } from '../FileUploaderControlContext.js';

export const useUpload = (
  request: Nullable<(file: FileUploaderAttachedFile) => Promise<void>>,
  onRequestSuccess?: Nullable<(fileId: string) => void>,
  onRequestError?: Nullable<(fileId: string) => void>,
): ((file: FileUploaderAttachedFile) => Promise<void>) => {
  const { setFileStatus } = useContext(FileUploaderControlContext);

  const switchToLoading = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, FileUploaderFileStatus.Loading);
    },
    [setFileStatus],
  );

  const switchToSuccess = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, FileUploaderFileStatus.Uploaded);
      onRequestSuccess?.(fileId);
    },
    [setFileStatus, onRequestSuccess],
  );

  const switchToError = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, FileUploaderFileStatus.Error);
      onRequestError?.(fileId);
    },
    [setFileStatus, onRequestError],
  );

  return useCallback(
    async (file: FileUploaderAttachedFile) => {
      const { id } = file;
      ReactDOM.flushSync(() => {
        switchToLoading(id);
      });
      try {
        await request?.(file);
        switchToSuccess(id);
      } catch {
        switchToError(id);
      }
    },
    [request, switchToSuccess, switchToLoading, switchToError],
  );
};
