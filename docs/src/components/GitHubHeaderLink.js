// @flow
import React from 'react';

import icon from './GitHub-Mark-Light-32px.png';
import icon2x from './GitHub-Mark-Light-64px.png';

import styles from './DocsApp.less';

const isRetina = window.devicePixelRatio === 2;

const GitHubHeaderLink = ({ href }: { href: string }) => (
  <a href={href}
    className={styles.link}
    style={{
      padding: '4px 8px',
      height: 32,
      marginBottom: 4,
      verticalAlign: 'middle'
    }}
  >
    <img
      src={isRetina ? icon2x : icon}
      alt="GitHub"
      style={{ height: 32 }}
    />
  </a>
);

export default GitHubHeaderLink;
