import { Vec3 } from './vec3';

export type Vec4 = [number, number, number, number];

export const vec4 = (x: number, y: number, z: number, w: number): Vec4 => [x, y, z, w];

export const toVec3 = ([x, y, z]: Vec4): Vec3 => [x, y, z];

export const scale = ([x, y, z, w]: Vec4, s: number): Vec4 => [x * s, y * s, z * s, w * s];

export const add = ([ax, ay, az, aw]: Vec4, [bx, by, bz, bw]: Vec4): Vec4 => (
  [ax + bx, ay + by, az + bz, 1] // TODO: Why was this set to 1?
);

export const subtract = ([ax, ay, az, aw]: Vec4, [bx, by, bz, bw]: Vec4): Vec4 => (
  [ax - bx, ay - by, az - bz, 1] // TODO: Why was this set to 1.
);

export const dot = ([ax, ay, az, aw]: Vec4, [bx, by, bz, bw]: Vec4) => (
  (ax * bx) + (ay * by) + (az * bz) + (aw * bw)
);

export const cross = ([ax, ay, az, aw]: Vec4, [bx, by, bz, bw]: Vec4): Vec4 => ([
  ay * bz - az * by,
  az * bx - ax * bz,
  ax * by - ay * bx,
  1,
]);

export const magnitude = ([x, y, z, w]: Vec4) => (
  Math.sqrt((x * x) + (y * y) + (z * z))
);

export const distance = (a: Vec4, b: Vec4) => magnitude(subtract(a, b));

export const normalized = (v: Vec4): Vec4 => {
  const length = magnitude(v);
  return vec4(
    v[0] / length,
    v[1] / length,
    v[2] / length,
    1,
  );
};

export const negated = ([x, y, z]: Vec4): Vec4 => ([-x, -y, -z, 1]);

export const perpendicular = ([x, y]: Vec4) => vec4(-y, x, 0, 1);
