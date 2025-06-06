const STORYBOOK_PATHS_JSON = window.parent.location.origin + window.parent.location.pathname + 'index.json';

export const getEditLink = (): Promise<string> => {
  return new Promise((resolve) => {
    fetch(STORYBOOK_PATHS_JSON)
      .then((response) => response.json())
      .then((stories) => {
        const urlPath = new URLSearchParams(window.parent.location.search).get('path')?.replace('/docs/', '') || '';
        const importPath = stories.entries[urlPath].importPath.replace('./', '');
        resolve(`https://git.skbkontur.ru/-/ide/project/ui/react-ui/edit/master/-/packages/react-ui/${importPath}`);
      });
  });
};
