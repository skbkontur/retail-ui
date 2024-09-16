import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';
import { globalObject } from '@skbkontur/global-object';

import { EmotionProvider, getEmotion, useEmotion } from '../theming/Emotion';

import shadowRoot from './reactShadow';

interface Props {
  emotionKey?: string;
  children: ReactNode;
  root?: ShadowRoot;
}

const RootContext = createContext<ShadowRoot | undefined>(undefined);
export const RootConsumer = RootContext.Consumer;
export const RootProvider = RootContext.Provider;

export const StylesContainer = ({ emotionKey = `react-ui-styles-container`, children, root }: Props) => {
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
          <EmotionProvider value={styles}>
            {typeof children === 'function' ? children(styles) : children}
          </EmotionProvider>
        </RootProvider>
      )}
    </>
  );
};

function constructStyles(emotionCache: Emotion['cache'], styles: CSSStyleSheet[]): CSSStyleSheet[] {
  const adoptedStyleSheets = styles ?? [];

  if (globalObject && 'CSSStyleSheet' in globalObject && globalObject.CSSStyleSheet) {
    const styleSheet = new globalObject.CSSStyleSheet() as any; //CSSStyleSheet
    styleSheet.replaceSync(
      Object.entries(emotionCache.registered)
        .map(([key, value]) => `.${key}{${value}}`)
        .join(''),
    );

    adoptedStyleSheets.push(styleSheet);
  }

  return [...styles, ...adoptedStyleSheets];
}

export const WithStyles = ({ children }: PropsWithChildren<any>) => {
  const styles = useEmotion();

  const rootNode = styles.sheet.container.getRootNode() as any; // ShadowRoot | Document;
  const shadowRootHost = rootNode?.host?.shadowRoot as any; // ShadowRoot;
  if (!shadowRootHost) {
    return typeof children === 'function' ? children(styles) : children;
  }

  return (
    <shadowRoot.div mode="open" styleSheets={constructStyles(styles.cache, shadowRootHost?.adoptedStyleSheets)}>
      <StylesContainer root={rootNode}>{children}</StylesContainer>
    </shadowRoot.div>
  );
};
