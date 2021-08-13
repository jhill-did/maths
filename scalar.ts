export const toRadians = (degrees: number) => (Math.PI * degrees) / 180;

export const toDegrees = (radians: number) => radians * (180 / Math.PI);

export const mod = (n: number, divisor: number) => ((n % divisor) + divisor) % divisor;

export const wrapAngle = (angle: number) => mod(angle, Math.PI * 2);

export const clamp = (v: number, min: number, max: number) => (
  Math.min(max, Math.max(min, v))
);

export const clamp01 = (v: number) => clamp(v, 0, 1);

export const deg2Rad = Math.PI / 180;
