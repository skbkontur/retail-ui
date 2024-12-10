import React from 'react';

import { MenuItem } from '../../components/MenuItem';

const oldVersions = require('./oldVersions.json');

interface LibraryVersion {
  version: string;
  path: string;
}
interface ResponseData {
  versions: LibraryVersion[];
}

const untypicalVersionsToShow: string[] = ['mdx-exaples-on-storybook-7'];
const typicalVersionPattern = /^\d+\.\d+\.\d+$/;

const baseUrl = 'https://ui.gitlab-pages.kontur.host/docs/storybook/react-ui';
const createEndpoint = (path: string) => `${baseUrl}/${path}`;
const jsonEndpoint = createEndpoint('reactUIStorybookVersions.json');

const renderLibraryVersionItem = ({ path, version }: LibraryVersion) => {
  return (
    <MenuItem target="_blank" href={path}>
      {version}
    </MenuItem>
  );
};

const sortVersions = (a: LibraryVersion, b: LibraryVersion) => {
  const parseVersion = (version: string): number[] => {
    const match = version.match(typicalVersionPattern);
    return match ? match[0].split('.').map(Number) : [Infinity];
  };
  const splitA = parseVersion(a.version);
  const splitB = parseVersion(b.version);

  for (let i = 0; i < Math.max(splitA.length, splitB.length); i++) {
    if (splitA[i] < splitB[i]) {
      return 1;
    }
    if (splitA[i] > splitB[i]) {
      return -1;
    }
  }
  return a.version.localeCompare(b.version);
};

export const VersionsLibrary = () => {
  const [libraryVersions, setLibraryVersions] = React.useState<LibraryVersion[]>([]);

  React.useEffect(() => {
    const fetchAllVersionsLibrary = async () => {
      try {
        const response = await fetch(jsonEndpoint);
        if (!response.ok) {
          setLibraryVersions([]);
          return;
        }
        const { versions }: ResponseData = await response.json();
        setLibraryVersions(
          versions.filter((x) => x.version.match(typicalVersionPattern) || untypicalVersionsToShow.includes(x.version)),
        );
      } catch (err) {
        setLibraryVersions([]);
      }
    };

    void fetchAllVersionsLibrary();
  }, []);
  const allVersions: LibraryVersion[] = [...libraryVersions, ...oldVersions];
  return <>{allVersions.sort(sortVersions).map((libraryVersion) => renderLibraryVersionItem(libraryVersion))}</>;
};
