export const checkAccess = (): Promise<boolean> => {
  return new Promise((resolve) => {
    fetch('https://ui.gitlab-pages.kontur.host/docs/storybook/versions.json', {
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
