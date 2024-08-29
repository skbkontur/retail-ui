import React, { ReactNode, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { EmotionProvider, getEmotion } from '../theming/Emotion';
import { RenderContainerElement, RenderLayerProvider } from '../../internal/RenderLayer';

interface Props {
  root: RenderContainerElement;
  children: ReactNode;
}

export const WidgetContainer = ({ root, children }: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(el: HTMLDivElement) {
    if (!styles && el) {
      setStyles(getEmotion(el, 'react-ui-widget'));
    }
  }

  return (
    <>
      <div ref={setRef} />
      <RenderLayerProvider value={root}>
        {styles && <EmotionProvider value={styles}>{children}</EmotionProvider>}
      </RenderLayerProvider>
    </>
  );
};
