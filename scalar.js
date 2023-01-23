export const toRadians = (degrees) => (Math.PI * degrees) / 180;
export const toDegrees = (radians) => radians * (180 / Math.PI);
export const mod = (n, divisor) => ((n % divisor) + divisor) % divisor;
export const wrapAngle = (angle) => mod(angle, Math.PI * 2);
export const clamp = (v, min, max) => (Math.min(max, Math.max(min, v)));
export const clamp01 = (v) => clamp(v, 0, 1);
export const deg2Rad = Math.PI / 180;
