import { getUid } from '../../lib/uidUtils';

import { FileUploaderFileValidationResult } from './FileUploaderFileValidationResult';

export type FileUploaderView = 'row' | 'tile';

export type FileUploaderUploadButtonPosition = 'start' | 'end';

export type FileUploaderValidationSummary = 'auto' | 'enabled' | 'disabled';

export enum FileUploaderFileStatus {
  Attached = 'Attached',
  Loading = 'Loading',
  Uploaded = 'Uploaded',
  Error = 'Error',
  Warning = 'Warning',
}

export interface FileUploaderAttachedFile {
  id: string;
  originalFile: File;
  status: FileUploaderFileStatus;
  validationResult: FileUploaderFileValidationResult;
}

export type FileType =
  | 'pdf'
  | 'code'
  | 'picture'
  | 'presentation'
  | 'table'
  | 'text'
  | 'archive'
  | 'folder'
  | 'unknown';

export type FileUploaderIconType = FileType | 'error' | 'warning';

export const getAttachedFile = (file: File): FileUploaderAttachedFile => {
  return {
    id: getUid(),
    originalFile: file,
    status: FileUploaderFileStatus.Attached,
    validationResult: FileUploaderFileValidationResult.ok(),
  };
};

export const codeFileExtensions = ['xml', 'html', 'json'];
export const pictureFileExtensions = ['jpg', 'png'];
export const presentationFileExtensions = ['pptx', 'ppt', 'odp'];
export const tableFileExtensions = ['xls', 'xlsx', 'ods'];
export const textFileExtensions = ['txt', 'docx', 'doc', 'rtf', 'odt'];
export const archiveFileExtensions = ['zip', 'rar', '7zip', '7z'];

function getFileExtension(file: File) {
  const name = file.name;
  const match = /\.([^.]+)$/.exec(name);

  return match ? match[1] : '';
}

function getFileType(file: File): FileType {
  const extension = getFileExtension(file);

  if (extension === '' && file.type === '') {
    return 'folder';
  }

  switch (true) {
    case extension === 'pdf':
      return 'pdf';
    case codeFileExtensions.includes(extension):
      return 'code';
    case pictureFileExtensions.includes(extension):
      return 'picture';
    case presentationFileExtensions.includes(extension):
      return 'presentation';
    case tableFileExtensions.includes(extension):
      return 'table';
    case textFileExtensions.includes(extension):
      return 'text';
    case archiveFileExtensions.includes(extension):
      return 'archive';

    default:
      return 'unknown';
  }
}

export function createFile(filename: string, content = 'content', type = 'text/plain'): File {
  return new File([content], filename, { type });
}

export function getFileUploaderTypeIcon(file: File, error = false, warning = false): FileUploaderIconType {
  if (error) {
    return 'error';
  }

  if (warning) {
    return 'warning';
  }

  return getFileType(file);
}
