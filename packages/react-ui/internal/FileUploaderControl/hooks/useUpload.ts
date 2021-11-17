import { useCallback, useContext } from 'react';

import { Nullable } from '../../../typings/utility-types';
import { UploadFile, UploadFileStatus } from '../../../lib/fileUtils';
import { FileUploaderControlContext } from '../FileUploaderControlContext';

export const useUpload = (
  request: Nullable<(file: UploadFile) => Promise<void>>,
  onRequestSuccess?: Nullable<(fileId: string) => void>,
  onRequestError?: Nullable<(fileId: string) => void>,
) => {
  const { setFileStatus } = useContext(FileUploaderControlContext);

  const switchToLoading = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Loading);
    },
    [setFileStatus],
  );

  const switchToSuccess = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Uploaded);
      onRequestSuccess?.(fileId);
    },
    [setFileStatus, onRequestSuccess],
  );

  const switchToError = useCallback(
    (fileId: string) => {
      setFileStatus(fileId, UploadFileStatus.Error);
      onRequestError?.(fileId);
    },
    [setFileStatus, onRequestError],
  );

  return useCallback(
    async (file: UploadFile) => {
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
