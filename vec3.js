import { wrapAngle } from './scalar';
export const vec3 = (x, y, z) => y === undefined
    ? [x, x, x]
    : [x, y, z];
export const add = ([ax, ay, az], [bx, by, bz]) => ([ax + bx, ay + by, az + bz]);
export const subtract = ([ax, ay, az], [bx, by, bz]) => ([ax - bx, ay - by, az - bz]);
export const getDistance = (a, b) => (getLength(subtract(a, b)));
export const scale = ([x, y, z], scalar) => ([x * scalar, y * scalar, z * scalar]);
export const getLength = ([x, y, z]) => (Math.sqrt((x ** 2) + (y ** 2) + (z ** 2)));
export const normalize = (v) => scale(v, 1 / getLength(v));
export const safeNormalize = (v) => getLength(v) === 0 ? vec3(0) : normalize(v);
export const cross = ([ax, ay, az], [bx, by, bz]) => [
    (ay * bz) - (by * az),
    (az * bx) - (bz * ax),
    (ax * by) - (bx * ay),
];
export const dot = ([ax, ay, az], [bx, by, bz]) => ((ax * bx) + (ay * by) + (az * bz));
export const multiply = ([ax, ay, az], [bx, by, bz]) => ([ax * bx, ay * by, az * bz]);
export const wrapRotator = (rotation) => rotation.map(wrapAngle);
export const floor = (v) => v.map(Math.floor);
export const round = (v) => v.map(Math.round);
export const ceil = (v) => v.map(Math.ceil);
export const lerp = (a, b, alpha) => (add(scale(a, 1 - alpha), scale(b, alpha)));
export const abs = (v) => v.map(Math.abs);
export const min = (a, b) => vec3(Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.min(a[2], b[2]));
export const max = (a, b) => vec3(Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.max(a[2], b[2]));
export const sum = (v) => (v[0] + v[1] + v[2]);
