import { wrapAngle } from './scalar';

export type Vec3 = [number, number, number];

export const vec3 = (x: number, y?: number, z?: number): Vec3 => y === undefined
  ? [x, x, x]
  : [x, y, z];

export const add = ([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 => (
  [ax + bx, ay + by, az + bz]
);

export const subtract = ([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 => (
  [ax - bx, ay - by, az - bz]
);

export const getDistance = (a: Vec3, b: Vec3): number => (
  getLength(subtract(a, b))
);

export const scale = ([x, y, z]: Vec3, scalar: number): Vec3 => (
  [x * scalar, y * scalar, z * scalar]
);

export const getLength = ([x, y, z]: Vec3) => (
  Math.sqrt((x ** 2) + (y ** 2) + (z ** 2))
);

export const normalize = (v: Vec3) => scale(v, 1 / getLength(v));

export const safeNormalize = (v: Vec3) => getLength(v) === 0 ? vec3(0) : normalize(v);

export const cross = ([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 => [
  (ay * bz) - (by * az),
  (az * bx) - (bz * ax),
  (ax * by) - (bx * ay),
];

export const dot = ([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): number => (
  (ax * bx) + (ay * by) + (az * bz)
);

export const multiply = ([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 => (
  [ax * bx, ay * by, az * bz]
);

export const wrapRotator = (rotation: Vec3) => rotation.map(wrapAngle) as Vec3;

export const floor = (v: Vec3) => v.map(Math.floor) as Vec3;

export const round = (v: Vec3) => v.map(Math.round) as Vec3;

export const ceil = (v: Vec3) => v.map(Math.ceil) as Vec3;

export const lerp = (a: Vec3, b: Vec3, alpha: number) => (
  add(scale(a, 1 - alpha), scale(b, alpha))
);

export const abs = (v: Vec3) => v.map(Math.abs) as Vec3;

export const min = (a: Vec3, b: Vec3) => vec3(
  Math.min(a[0], b[0]),
  Math.min(a[1], b[1]),
  Math.min(a[2], b[2]),
);

export const max = (a: Vec3, b: Vec3) => vec3(
  Math.max(a[0], b[0]),
  Math.max(a[1], b[1]),
  Math.max(a[2], b[2]),
);

export const sum = (v: Vec3): number => (v[0] + v[1] + v[2]);
