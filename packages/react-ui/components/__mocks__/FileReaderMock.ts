const FILE_READER = window.FileReader;

export class FileReaderMock {
  static errorMock() {
    const dummyFileReader = {
      readAsDataURL: () => {
        // @ts-ignore
        dummyFileReader?.onerror()
      }
    };
    // @ts-ignore
    window.FileReader = jest.fn(() => dummyFileReader);
  }

  static resetMock() {
    window.FileReader = FILE_READER;
  }
}
