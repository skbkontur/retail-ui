import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { RenderContainer } from '../../../internal/RenderContainer';
import { isTestEnv } from '../../../lib/currentEnvironment';
import { styles } from '../Toast.styles';

import { Toast, ToastItem } from './Toast';

export type ToastContainerProps = {
  toastList: ToastItem[];
};

export const ToastContainer = ({ toastList }: ToastContainerProps) => {
  return (
    <RenderContainer>
      <TransitionGroup>
        {toastList.map((toast) => {
          return (
            <CSSTransition
              key={toast.id}
              classNames={{
                enter: styles.enter(),
                enterActive: styles.enterActive(),
              }}
              timeout={200}
              enter={!isTestEnv}
            >
              <Toast id={toast.id} action={toast.action}>
                {toast.content}
              </Toast>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </RenderContainer>
  );
};
