import React, { createContext, useContext, useMemo } from 'react';
import type { Emotion } from '@emotion/css/create-instance';

import { getOwnerGlobalObject, getSafeWindow } from '../globalObject.js';
import type { GlobalObject } from '../globalObject.js';
import { getEmotion } from '../theming/Emotion.js';

export interface RenderEnvironmentContextType {
  globalObject: GlobalObject;
  emotion: Emotion;
}

const globalObject = getSafeWindow();
export const RenderEnvironmentContext = createContext<RenderEnvironmentContextType>({
  globalObject,
  emotion: getEmotion({ container: globalObject.document?.head as HTMLElement }),
});

interface RenderEnvironmentProviderProps {
  children: React.ReactNode;
  rootNode: HTMLElement;
}

export const RenderEnvironmentProvider: React.FC<RenderEnvironmentProviderProps> = ({ children, rootNode }) => {
  const value = useMemo(() => {
    const globalObject = getOwnerGlobalObject(rootNode);
    const container = globalObject.document?.head;
    const emotion = getEmotion({ container: container as HTMLElement });

    return { globalObject, emotion };
  }, [rootNode]);
  return <RenderEnvironmentContext.Provider value={value}>{children}</RenderEnvironmentContext.Provider>;
};

export const useGlobal = (): GlobalObject => useContext(RenderEnvironmentContext).globalObject;
export const useEmotion = (): Emotion => useContext(RenderEnvironmentContext).emotion;
export const useStyles = <T,>(getStyles: (emotion: Emotion) => T): T => {
  const emotion = useEmotion();
  return getStyles(emotion);
};
