/**
 * Type declarations for @skbkontur/react-ui/lib/size module.
 *
 * This module is available in react-ui v5.4.0+, but this package supports versions below that.
 * The useSizeContextCompat hook dynamically imports this module and gracefully
 * falls back when it's not available.
 */
declare module '@skbkontur/react-ui/lib/size' {
  import type { Context } from 'react';

  export type SizeProp = 'small' | 'medium' | 'large';

  export interface SizeContextValue {
    size: SizeProp;
  }

  export const SizeControlContext: Context<SizeContextValue>;

  export function useSizeContext(): SizeContextValue;
}
