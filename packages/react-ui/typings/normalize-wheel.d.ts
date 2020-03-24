declare module 'normalize-wheel' {
  var normalizeWheel: (event: WheelEvent) => { spinX: number; spinY: number; pixelX: number; pixelY: number };

  export default normalizeWheel;
}
