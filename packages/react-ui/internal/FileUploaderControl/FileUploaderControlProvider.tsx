import React, {
  ComponentType,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';

import { useMemoObject } from '../../hooks/useMemoObject';
import { IUploadFile, UploadFileStatus } from '../../lib/fileUtils';
import { _IFileUploaderProps } from '../../components/FileUploader/_FileUploader';

import { FileUploaderControlContext } from './FileUploaderControlContext';
import { UploadFileValidationResult } from './UploadFileValidationResult';
import { useControlLocale } from './hooks/useControlLocale';

export interface IFileUploaderControlProviderProps {
  /** Срабатывает при валидном чтении файла (превращение байтов в base64) */
  onSelect?: (files: IUploadFile[]) => void;
  /** Срабатывает при удалении файла из контрола */
  onRemove?: (fileId: string) => void;
  /** Срабатывает при onSelect и onRemove*/
  onValueChange?: (files: IUploadFile[]) => void;
}

const updateFile = (
  files: IUploadFile[],
  fileId: string,
  getFileUpdatedProps: (file: IUploadFile) => Partial<IUploadFile>,
): IUploadFile[] => {
  const fileIndex = files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) return files;

  const newFiles = [...files];
  const file = files[fileIndex];

  const updatedProps = getFileUpdatedProps(file);

  newFiles[fileIndex] = {
    ...file,
    ...updatedProps,
  };

  return newFiles;
};

export const FileUploaderControlProvider = (props: PropsWithChildren<IFileUploaderControlProviderProps>) => {
  const { children, onValueChange, onRemove, onSelect } = props;

  // в files попадат только те, что попали в onSelect
  const [files, setFiles] = useState<IUploadFile[]>([]);
  const locale = useControlLocale();

  const setFileStatus = useCallback(
    (fileId: string, status: UploadFileStatus) => {
      setFiles((files) => {
        return updateFile(files, fileId, (file) => {
          return {
            status,
            validationResult:
              status === UploadFileStatus.Error
                ? UploadFileValidationResult.error(locale.requestErrorText)
                : file.validationResult,
          };
        });
      });
    },
    [locale],
  );

  const handleExternalSetFiles = useCallback(
    (files: IUploadFile[]) => {
      onSelect?.(files);
      setFiles((state) => {
        const newFiles = [...state, ...files];
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange, onSelect],
  );

  const removeFile = useCallback(
    (fileId: string) => {
      onRemove?.(fileId);
      setFiles((state) => {
        const newFiles = state.filter((file) => file.id !== fileId);
        onValueChange?.(newFiles);
        return newFiles;
      });
    },
    [onValueChange, onRemove],
  );

  const setFileValidationResult = useCallback((fileId: string, validationResult: UploadFileValidationResult) => {
    setFiles((files) => updateFile(files, fileId, () => ({ validationResult })));
  }, []);

  return (
    <FileUploaderControlContext.Provider
      value={useMemoObject({
        setFileStatus,
        files,
        setFiles: handleExternalSetFiles,
        removeFile,
        setFileValidationResult,
      })}
    >
      {children}
    </FileUploaderControlContext.Provider>
  );
};

FileUploaderControlProvider.displayName = 'FileUploaderControlProvider';

export const withFileUploaderControlProvider = <TProps extends _IFileUploaderProps, TRef extends object>(
  Component: ComponentType<TProps>,
) =>
  React.forwardRef<TRef, TProps>((props: TProps, ref) => (
    <FileUploaderControlProvider {...props}>
      <Component ref={ref} {...props} />
    </FileUploaderControlProvider>
  ));
