export const checkNewDocsAccess = (): Promise<boolean> => {
  return new Promise((resolve) => {
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
      .catch(() => {
        resolve(false);
      });
  });
};
