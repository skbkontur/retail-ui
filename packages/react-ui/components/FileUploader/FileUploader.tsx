import React, { useCallback, useContext } from 'react';
import { withUploadFilesProvider } from '../../internal/FileAttacherBase/UploadFilesProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { FileAttacherBase, FileAttacherBaseProps } from '../../internal/FileAttacherBase';
import { UploadFilesContext } from '../../internal/FileAttacherBase/UploadFilesContext';

// FIXME @mozalov: подумать как делать abort запроса по крестику
// FIXME @mozalov: добавить типы ошибок

export type RequestFunction = (
  file: IUploadFile,
  onSuccess: () => void,
  onError: (error: object) => void,
) => void;

export interface FileUploaderProps extends FileAttacherBaseProps {
  request: RequestFunction;
}

export const FileUploader = withUploadFilesProvider((props: FileUploaderProps) => {
  const {request, controlError} = props;
  const {setFileStatus} = useContext(UploadFilesContext);

  const handleStart = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Loading);
  }, []);

  const handleSuccess = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Uploaded);
  }, []);

  const handleError = useCallback((fileId: string) => {
    setFileStatus(fileId, UploadFileStatus.Error);
  }, []);

  const upload = useCallback((file: IUploadFile) => {
    const {id} = file;
    handleStart(id);
    request(file, () => handleSuccess(id), () => handleError(id));
  }, [request, handleSuccess, handleError, handleStart])

  const handleChange = useCallback((files: IUploadFile[]) => {
    !controlError && files.forEach(file => upload(file));
  }, [upload, controlError]);

  return (
    <FileAttacherBase
      {...props}
      onChange={handleChange}
    />
  );
});
