import { Vec3 } from './vec3';

export type Vec4 = [number, number, number, number];

export const vec4 = (x: number, y: number, z: number, w: number): Vec4 => [x, y, z, w];

export const toVec3 = ([x, y, z]: Vec4): Vec3 => [x, y, z];
