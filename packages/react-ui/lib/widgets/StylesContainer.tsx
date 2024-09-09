import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';
import shadowRoot from 'react-shadow';
import { globalObject } from '@skbkontur/global-object';

import { EmotionProvider, getEmotion, RootProvider, useEmotion } from '../theming/Emotion';

interface Props {
  emotionKey?: string;
  root?: ShadowRoot;
  children: ReactNode;
}

export const StylesContainer = ({ emotionKey = `react-ui-styles-container`, root, children }: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(container: HTMLDivElement) {
    if (!styles && container) {
      setStyles(getEmotion({ container, key: emotionKey }));
    }
  }

  return (
    <>
      <div ref={setRef} />
      {styles && (
        <RootProvider value={root}>
          <EmotionProvider value={styles}>{children}</EmotionProvider>
        </RootProvider>
      )}
    </>
  );
};

export const WithStyles = ({ children }: PropsWithChildren<any>) => {
  const styles = useEmotion();
  const node = useRef<any>(null);

  const rootNode = styles.sheet.container.getRootNode() as any; // ShadowRoot | Document;
  const shadowRoot1 = rootNode?.host?.shadowRoot as any; // ShadowRoot;
  if (!shadowRoot1) {
    return <>{children}</>;
  }

  const adoptedStyleSheets = (shadowRoot1?.adoptedStyleSheets as CSSStyleSheet[]) ?? [];

  if (globalObject && 'CSSStyleSheet' in globalObject && globalObject.CSSStyleSheet) {
    const styleSheet = new globalObject.CSSStyleSheet() as any; //CSSStyleSheet
    styleSheet.replaceSync(
      Object.entries(styles.cache.registered)
        .map(([key, value]) => `.${key}{${value}}`)
        .join(''),
    );

    adoptedStyleSheets.push(styleSheet);
  }

  // const root = node.current?.shadowRoot; // shadow root of portal element
  // console.log('shadowRoot in portal', root);
  // console.log('adoptedStyleSheets in portal', node.current?.shadowRoot?.adoptedStyleSheets);

  return (
    <shadowRoot.div ref={node} mode="open" styleSheets={[...adoptedStyleSheets]}>
      <StylesContainer root={rootNode}>{children}</StylesContainer>
    </shadowRoot.div>
  );
};
