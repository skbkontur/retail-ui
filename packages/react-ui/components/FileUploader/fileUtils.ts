export type ReadedFileType = string | ArrayBuffer | null;

export interface IFileWithBase64 {
  base64: ReadedFileType;
  file: File;
}

export const readFile = (file: File): Promise<ReadedFileType> => (
  new Promise((resolve, reject): void => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  })
);

export const readFiles = (files: File[]): Promise<Array<IFileWithBase64>> => {
  const filesPromises = files.map(file => readFile(file));
  return Promise.all(filesPromises).then(readedFiles => readedFiles.map((base64, index) => ({
    base64,
    file: files[index]
  })));
};
