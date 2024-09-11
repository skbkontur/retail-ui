import React, { ReactNode, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { EmotionProvider, getEmotion } from '../theming/Emotion';

interface Props {
  emotionKey?: string;
  children: ReactNode;
}

export const StylesContainer = ({ emotionKey = `react-ui-styles-container`, children }: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(container: HTMLDivElement) {
    if (!styles && container) {
      setStyles(getEmotion({ container, key: emotionKey }));
    }
  }

  return (
    <>
      <div ref={setRef} />
      {styles && <EmotionProvider value={styles}>{children}</EmotionProvider>}
    </>
  );
};
