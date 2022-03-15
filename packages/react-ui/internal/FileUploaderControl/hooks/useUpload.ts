import { useCallback, useContext } from 'react';

import { Nullable } from '../../../typings/utility-types';
import { FileUploaderAttachedFile, FileUploaderFileStatus } from '../fileUtils';
import { FileUploaderControlContext } from '../FileUploaderControlContext';

export const useUpload = (
  request: Nullable<(file: FileUploaderAttachedFile) => Promise<void>>,
  onRequestSuccess?: Nullable<(fileId: string) => void>,
  onRequestError?: Nullable<(fileId: string) => void>,
) => {
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
      switchToLoading(id);

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
