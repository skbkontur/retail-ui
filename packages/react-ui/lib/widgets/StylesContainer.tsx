import React, { PropsWithChildren, ReactNode, useRef, useState } from 'react';
import type { Emotion } from '@emotion/css/create-instance';
import shadowRoot from 'react-shadow';
import { globalObject } from '@skbkontur/global-object';

import { Nullable } from '../../typings/utility-types';
import { EmotionProvider, getEmotion, useEmotion } from '../theming/Emotion';

interface Props {
  id?: string;
  children: ReactNode;
}

export const StylesContainer = ({ id = `react-ui-styles-container`, children }: Props) => {
  const [styles, setStyles] = useState<Emotion>();

  function setRef(el: HTMLDivElement) {
    if (!styles && el) {
      setStyles(getEmotion(el, id));
    }
  }

  return (
    <>
      <div ref={setRef} />
      {styles && <EmotionProvider value={styles}>{children}</EmotionProvider>}
    </>
  );
};

export const WithStyles = ({
  children,
  ...rest
}: PropsWithChildren<{
  rootId: string;
  domContainer: Nullable<HTMLElement>;
  anchor: ReactNode;
}>) => {
  const styles = useEmotion();
  const node = useRef<any>(null);

  const rootNode = styles.sheet.container.getRootNode() as any;
  const shadowRoot1 = rootNode?.host?.shadowRoot as any;
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

  console.log('shadowRoot in portal', node.current?.shadowRoot);
  // console.log('adoptedStyleSheets in portal', node.current?.shadowRoot?.adoptedStyleSheets);
  console.log({ ...rest });

  return (
    <shadowRoot.div ref={node} mode="open" styleSheets={[...adoptedStyleSheets]}>
      <StylesContainer>{children}</StylesContainer>
    </shadowRoot.div>
  );
};
