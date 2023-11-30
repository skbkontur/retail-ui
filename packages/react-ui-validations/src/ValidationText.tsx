import React from 'react';

import {
  ValidationsFeatureFlags,
  ValidationsFeatureFlagsContext,
  getFullValidationsFlagsContext,
} from '../lib/featureFlagsContext';
import { Nullable } from '../typings/Types';

import { TextPosition, Validation } from './ValidationWrapperInternal';

export interface ValidationTextProps {
  pos: TextPosition;
  children: React.ReactNode;
  validation: Nullable<Validation>;
  'data-tid'?: string;
}

export const ValidationText = ({ pos, children, validation, 'data-tid': dataTid }: ValidationTextProps) => {
  if (pos === 'right') {
    return (
      <span style={{ display: 'inline-block' }}>
        {children}
        <span data-tid={dataTid} data-validation-message="text" style={{ marginLeft: '10px', color: '#d43517' }}>
          {(validation && validation.message) || ''}
        </span>
      </span>
    );
  }

  let featureFlags: ValidationsFeatureFlags;

  return (
    <ValidationsFeatureFlagsContext.Consumer>
      {(flags) => {
        featureFlags = getFullValidationsFlagsContext(flags);
        return featureFlags.ValidationsWrapperAndContainerRemoveExtraSpan ? (
          <>
            {children}
            <span style={{ position: 'absolute', display: 'block' }}>
              <span
                data-tid={dataTid}
                data-validation-message="text"
                style={{
                  color: '#d43517',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  top: '2px',
                  left: 0,
                }}
              >
                {(validation && validation.message) || ''}
              </span>
            </span>
          </>
        ) : (
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {children}
            <span style={{ position: 'absolute', bottom: 0, left: 0, height: 0 }}>
              <span
                data-tid={dataTid}
                data-validation-message="text"
                style={{
                  color: '#d43517',
                  overflow: 'visible',
                  whiteSpace: 'nowrap',
                  position: 'absolute',
                  top: '2px',
                  left: 0,
                }}
              >
                {(validation && validation.message) || ''}
              </span>
            </span>
          </span>
        );
      }}
    </ValidationsFeatureFlagsContext.Consumer>
  );
};
