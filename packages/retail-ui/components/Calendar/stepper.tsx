import { presets } from './presets';

const secondPerFrame = 1 / 45;

const precision = 1e-1;
const { stiffness, damping } = presets.noWobble;

// imported from https://github.com/chenglou/react-motion/blob/master/src/stepper.js
// and slightly simplified
const reusedTuple: [number, number] = [0, 0];
export const stepper = (currentX: number, currentV: number, targetX: number) => {
  // https://en.wikipedia.org/wiki/Hooke%27s_law
  const springForce = -stiffness * (currentX - targetX);
  const dampingForce = -damping * currentV;

  const acceleration = springForce + dampingForce;

  const newV = currentV + acceleration * secondPerFrame;
  const newX = currentX + newV * secondPerFrame;

  if (Math.abs(newV) < precision && Math.abs(newX - targetX) < precision) {
    reusedTuple[0] = targetX;
    reusedTuple[1] = 0;
    return reusedTuple;
  }

  reusedTuple[0] = newX;
  reusedTuple[1] = newV;
  return reusedTuple;
};
