import { FC, PropsWithChildren } from 'react';
import styles from './Content.module.css';

export const Content: FC<PropsWithChildren> = ({ children }) => (
  <section className={styles.root}>
    <div className={styles.content}>{children}</div>
  </section>
);
