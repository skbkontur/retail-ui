import React from 'react';

/**
 * Позволяет использовать несколько контекстов в классовых компонентах
 * Новый контекст будет доступен через `this.props.${contextName}`
 *
 * @param contextName Имя контекста, через которое вы к нему будете обращаться
 * @param context Объект контекста
 * @param Component Компонент, которому нужен контекст
 */
export const withContext =
  <Props extends Record<string, any>, C>(
    contextName: string,
    context: React.Context<C>,
    Component: React.ComponentType<Props>,
  ) =>
  // eslint-disable-next-line react/display-name
  (p: Props) => {
    return (
      <Component
        {...{
          [contextName]: React.useContext(context),
          ...p,
        }}
      />
    );
  };
