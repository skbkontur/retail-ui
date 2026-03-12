import type { PropsWithChildren } from 'react';
import React, { useCallback, useState } from 'react';

import { useMemoObject } from '../../hooks/useMemoObject.js';
import { useEffectWithoutInitCall } from '../../hooks/useEffectWithoutInitCall.js';

import type { FileUploaderAttachedFile } from './fileUtils.js';
import { FileUploaderFileStatus, getAttachedFile } from './fileUtils.js';
import { FileUploaderControlContext } from './FileUploaderControlContext.js';
import { useControlLocale } from './hooks/useControlLocale.js';
import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult.js';

export interface FileUploaderControlProviderProps {
  initialFiles?: File[];
  onAttach?: (files: FileUploaderAttachedFile[]) => void;
  onRemove?: (fileId: string) => void;
  onValueChange?: (files: FileUploaderAttachedFile[]) => void;
}

const updateFile = (
  files: FileUploaderAttachedFile[],
  fileId: string,
  getFileUpdatedProps: (file: FileUploaderAttachedFile) => Partial<FileUploaderAttachedFile>,
): FileUploaderAttachedFile[] => {
  const fileIndex = files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) {
    return files;
  }

  const newFiles = [...files];
  const file = files[fileIndex];

  const updatedProps = getFileUpdatedProps(file);

  newFiles[fileIndex] = {
    ...file,
    ...updatedProps,
  };

  return newFiles;
};

export const FileUploaderControlProvider = React.memo(
  (
    props: PropsWithChildren<
      FileUploaderControlProviderProps & {
        multiple?: boolean;
      }
    >,
  ) => {
    const { initialFiles, multiple, children, onValueChange, onRemove, onAttach } = props;

    const [files, setFiles] = useState<FileUploaderAttachedFile[]>(() => {
      if (initialFiles && initialFiles.length > 0) {
        const attachedFiles = initialFiles.map((item: File) => getAttachedFile(item));

        return multiple ? attachedFiles : [attachedFiles[0]];
      }
      return [];
    });
    const locale = useControlLocale();

    useEffectWithoutInitCall(() => {
      onValueChange?.(files);
    }, [files]);

    const setFileStatus = useCallback(
      (fileId: string, status: FileUploaderFileStatus) => {
        setFiles((files) =>
          updateFile(files, fileId, (file) => ({
            status,
            validationResult:
              status === FileUploaderFileStatus.Error || status === FileUploaderFileStatus.Warning
                ? FileUploaderFileValidationResult.error(locale.requestErrorText)
                : file.validationResult,
          })),
        );
      },
      [locale],
    );

    const handleExternalSetFiles = useCallback(
      (files: FileUploaderAttachedFile[]) => {
        onAttach?.(files);
        setFiles((state) => [...state, ...files]);
      },
      [onAttach],
    );

    const removeFile = useCallback(
      (fileId: string) => {
        onRemove?.(fileId);
        setFiles((state) => state.filter((file) => file.id !== fileId));
      },
      [onRemove],
    );

    const setFileValidationResult = useCallback(
      (fileId: string, validationResult: FileUploaderFileValidationResult, status?: FileUploaderFileStatus) => {
        setFiles((files) => updateFile(files, fileId, () => ({ validationResult, status })));
      },
      [],
    );

    const reset = React.useCallback(() => {
      setFiles(() => [] as FileUploaderAttachedFile[]);
    }, []);

    return (
      <FileUploaderControlContext.Provider
        value={useMemoObject({
          setFileStatus,
          files,
          setFiles: handleExternalSetFiles,
          removeFile,
          setFileValidationResult,
          reset,
        })}
      >
        {children}
      </FileUploaderControlContext.Provider>
    );
  },
);

FileUploaderControlProvider.displayName = 'FileUploaderControlProvider';
