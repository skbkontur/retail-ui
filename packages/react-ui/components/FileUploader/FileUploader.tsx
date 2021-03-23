import React, { useCallback, useContext, useState } from 'react';
import { withUploadFilesProvider } from '../../internal/FileAttacherBase/UploadFilesProvider';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { FileAttacherBase, FileAttacherBaseProps, FileError } from '../../internal/FileAttacherBase';
import { UploadFilesContext } from '../../internal/FileAttacherBase/UploadFilesContext';
import { useValidationSetter } from '../../internal/FileAttacherBase/FileAttacherBaseHooks';

// FIXME @mozalov: подумать как делать abort запроса по крестику
// FIXME @mozalov: добавить типы ошибок

export type RequestFunction = (
  file: IUploadFile,
  onSuccess: () => void,
  onError: (error: object) => void,
) => void;

export interface FileUploaderProps extends Omit<FileAttacherBaseProps, 'fileError'> {
  request: RequestFunction;
  fileValidation?: (file: IUploadFile) => Promise<string>;
}

export const FileUploader = withUploadFilesProvider((props: FileUploaderProps) => {
  const {request, controlError, fileValidation} = props;
  const {setFileStatus} = useContext(UploadFilesContext);

  const [fileErrors, setFileErrors] = useState<FileError[]>([]);

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

  const handleSelect = useCallback((files: IUploadFile[]) => {
    if (!controlError) {
      files.forEach(async file => {
        const validationMessage = fileValidation && await fileValidation(file);

        console.log({validationMessage});

        if (!validationMessage) {
          upload(file);
        } else {
          setFileErrors(state => [...state, {fileId: file.id, message: validationMessage}]);
        }
      });
    }
  }, [upload, controlError, fileValidation]);

  useValidationSetter(fileErrors);

  return (
    <FileAttacherBase
      {...props}
      onSelect={handleSelect}
    />
  );
});
