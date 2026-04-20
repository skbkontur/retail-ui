import { exportSidecar } from 'use-sidecar';

import { mediumSidecar } from './medium.js';
import FocusTrap from './Trap.js';

export default exportSidecar(mediumSidecar, FocusTrap);
