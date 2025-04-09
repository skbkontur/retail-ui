import React, { ReactNode, useMemo, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { EmotionProvider, getEmotion, PopupProvider } from '../theming/Emotion';

export type GetOffsetParent = (element?: Node) => HTMLElement | null;

export type PopupStrategy = 'auto' | 'relative' | 'absolute' | 'fixed';
interface Props {
  emotionKey?: string;
  children: ReactNode;
  getOffsetParent?: GetOffsetParent;
  popupStrategy?: PopupStrategy;
}

export const StylesContainer = ({
  emotionKey = `react-ui-styles-container`,
  getOffsetParent,
  popupStrategy,
  children,
}: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(container: HTMLDivElement) {
    if (!styles && container) {
      setStyles(getEmotion({ container, key: emotionKey }));
    }
  }

  const popupContext = useMemo(() => ({ getOffsetParent, popupStrategy }), [getOffsetParent]);
  return (
    <>
      <div ref={setRef} />
      {styles && (
        <PopupProvider value={popupContext}>
          <EmotionProvider value={styles}>{children}</EmotionProvider>
        </PopupProvider>
      )}
    </>
  );
};
