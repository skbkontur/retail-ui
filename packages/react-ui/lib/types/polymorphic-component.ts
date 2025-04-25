import type React from 'react';

import type { Merge } from '../../typings/utility-types';

type PropsWithComponent<P, T extends React.ElementType> = P & {
  /**
   * Компонент, используемый в качестве корневого узла.
   */
  component?: T;
};

export type PolymorphicPropsWithoutRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
    : React.ComponentPropsWithoutRef<T>,
  PropsWithComponent<P, T>
>;

export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
  T extends keyof JSX.IntrinsicElements ? React.PropsWithRef<JSX.IntrinsicElements[T]> : React.ComponentPropsWithRef<T>,
  PropsWithComponent<P, T>
>;

type PolymorphicExoticComponent<P = Record<string, unknown>, T extends React.ElementType = React.ElementType> = Merge<
  React.ExoticComponent<P & { [key: string]: unknown }>,
  {
    <InstanceT extends React.ElementType = T>(props: PolymorphicPropsWithRef<P, InstanceT>): React.ReactElement | null;
  }
>;

export type PolymorphicForwardRefExoticComponent<P, T extends React.ElementType> = Merge<
  React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
  PolymorphicExoticComponent<P, T>
>;
