export const checkAccess = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch('https://ui.gitlab-pages.kontur.host/storybook-documentation/', {
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        resolve(false);
      });
  });
};
