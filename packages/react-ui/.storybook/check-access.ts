export const checkAccess = (): Promise<boolean> => {
  return new Promise((resolve) => {
    fetch('https://git.skbkontur.ru/api/v4/projects', {
      method: 'HEAD',
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => {
        resolve(false);
      });
  });
};
