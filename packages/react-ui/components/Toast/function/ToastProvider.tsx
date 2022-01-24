import React, { createContext, useState, useCallback, useContext } from 'react';

import { ToastItem } from './Toast';
import { ToastContainer } from './ToastContainer';

type ToastContext = {
  addToast: (content: ToastItem['content'], action?: ToastItem['action']) => void;
  removeToast: (id: ToastItem['id']) => void;
};
const ToastContext = createContext<ToastContext | undefined>(undefined);

export type ToastProviderProps = {
  children: React.ReactNode;
};

let id = 1;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastList, setToastList] = useState<ToastItem[]>([]);

  const addToast: ToastContext['addToast'] = useCallback(
    (content, action) => {
      if (content) {
        setToastList([{ id: id++, content, action }]);
      }
    },
    [setToastList],
  );

  const removeToast: ToastContext['removeToast'] = useCallback(
    (id) => {
      setToastList((toastList) => toastList.filter((toast) => toast.id !== id));
    },
    [setToastList],
  );

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
      }}
    >
      <ToastContainer toastList={toastList} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
