import React, { ReactNode, useRef, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';
import shadowRoot from 'react-shadow';
import { globalObject } from '@skbkontur/global-object';

import { EmotionProvider, getEmotion, useEmotion } from '../theming/Emotion';

interface Props {
  children: ReactNode;
}

export const WidgetContainer = ({ children }: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(el: HTMLDivElement) {
    if (!styles && el) {
      setStyles(getEmotion(el, 'react-ui-widget'));
    }
  }

  return (
    <>
      <div ref={setRef} />
      {styles && <EmotionProvider value={styles}>{children}</EmotionProvider>}
    </>
  );
};

export const WithStyles = ({ children }: { children: ReactNode }) => {
  const styles = useEmotion();
  const node = useRef(null);

  // @ts-ignore
  const styleSheet = new globalObject.CSSStyleSheet() as any;
  styleSheet.replaceSync(
    Object.entries(styles.cache.registered)
      .map(([key, value]) => `.${key}{${value}}`)
      .join(''),
  );

  const adoptedStyleSheets = ((styles.sheet.container.getRootNode() as ShadowRoot)?.host.shadowRoot as any)
    .adoptedStyleSheets;

  return (
    <shadowRoot.div ref={node} mode="open" styleSheets={[...adoptedStyleSheets, styleSheet]}>
      {children}
    </shadowRoot.div>
  );
};
