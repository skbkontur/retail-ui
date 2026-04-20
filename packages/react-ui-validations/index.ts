import { text, tooltip } from './src/ErrorRenderer.js';
import { FocusMode } from './src/FocusMode.js';
import { getFullValidationsFlagsContext } from './src/utils/featureFlagsContext/FeatureFlagsHelpers.js';
import {
  ValidationsFeatureFlagsContext,
  validationsFeatureFlagsDefault,
} from './src/utils/featureFlagsContext/ValidationsFeatureFlagsContext.js';
import type { ValidationsFeatureFlags } from './src/utils/featureFlagsContext/ValidationsFeatureFlagsContext.js';
import type {
  ScrollOffset,
  ValidateArgumentType,
  ValidationContainerProps,
  ValidationSettings,
} from './src/ValidationContainer.js';
import { ValidationContainer } from './src/ValidationContainer.js';
import { ValidationContext, ValidationContextWrapper } from './src/ValidationContextWrapper.js';
import type {
  ValidationContextSettings,
  ValidationContextType,
  ValidationContextWrapperProps,
} from './src/ValidationContextWrapper.js';
import type { TooltipPosition, ValidationTooltipProps } from './src/ValidationTooltip.js';
import { ValidationTooltip } from './src/ValidationTooltip.js';
import type { ValidationInfo, ValidationWrapperProps } from './src/ValidationWrapper.js';
import { ValidationWrapper } from './src/ValidationWrapper.js';
import type {
  RenderErrorMessage,
  TextPosition,
  Validation,
  ValidationBehaviour,
  ValidationLevel,
} from './src/ValidationWrapperInternal.js';

export type {
  ValidationContainerProps,
  ValidationContextType,
  ValidationContextWrapperProps,
  ValidationWrapperProps,
  ValidationTooltipProps,
  ScrollOffset,
  ValidationLevel,
  TextPosition,
  ValidationsFeatureFlags,
  ValidationSettings,
  ValidateArgumentType,
  ValidationContextSettings,
  TooltipPosition,
  ValidationInfo,
  Validation,
  RenderErrorMessage,
  ValidationBehaviour,
  ValidationWrapperProps as ValidationWrapperV1Props,
};

export {
  ValidationContainer,
  ValidationContext,
  ValidationContextWrapper,
  ValidationWrapper as ValidationWrapperV1,
  ValidationWrapper,
  ValidationTooltip,
  tooltip,
  text,
  FocusMode,
  validationsFeatureFlagsDefault,
  ValidationsFeatureFlagsContext,
  getFullValidationsFlagsContext,
};

export * from './src/Validations/index.js';
