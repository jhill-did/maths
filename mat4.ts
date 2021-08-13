import { Vec3, vec3, safeNormalize, cross } from './vec3';
import { range } from './iterator';
import { Vec4 } from './vec4';

export type Mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
];

export const identityMat4 = (): Mat4 => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1,
];

const rotateX = (angle: number): Mat4 => {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return [
    1, 0,  0, 0,
    0, x, -y, 0,
    0, y,  x, 0,
    0, 0,  0, 1,
  ];
};

const rotateY = (angle: number): Mat4 => {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return [
    x, 0, y, 0,
    0, 1, 0, 0,
   -y, 0, x, 0,
    0, 0, 0, 1,
  ];
};

const rotateZ = (angle: number): Mat4 => {
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return [
    x, -y, 0, 0,
    y,  x, 0, 0,
    0,  0, 1, 0,
    0,  0, 0, 1,
  ];
};

const toIndex = (row: number, column: number) => (row * 4) + column;

export const multiplyMatrices = (a: Mat4, b: Mat4): Mat4 => {
  const result = new Array(16) as Mat4;
  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      const index = toIndex(row, column);

      result[index] = range(4)
        .map(offset => a[toIndex(row, offset)] * b[toIndex(offset, column)])
        .reduce((acc, value) => acc + value, 0);
    }
  }

  return result;
};

export const transformVec4 = (mat: Mat4, vec: Vec4) => range(4)
  .map(column => range(4)
    .map((row) => vec[row] * mat[toIndex(row, column)])
    .reduce((acc, v) => acc + v, 0)
  ).collect() as Vec4;

export const toString = (mat: Mat4) => [
  [mat[0], mat[1], mat[2], mat[3]],
  [mat[4], mat[5], mat[6], mat[7]],
  [mat[8], mat[9], mat[10], mat[11]],
  [mat[12], mat[13], mat[14], mat[15]],
].toString();

export const makeTransform = (position: Vec3, rotation: Vec3, scale: Vec3 = [1, 1, 1]): Mat4 => {
  const [px, py, pz] = position;
  const [sx, sy, sz] = scale;

  const rx = rotateX(rotation[0]); // Pitch.
  const ry = rotateY(rotation[1]); // Yaw.
  const rz = rotateZ(rotation[2]); // Roll.

  const translated: Mat4 = [
    sx, 0,  0,  0,
    0,  sy, 0,  0,
    0,  0,  sz, 0,
    px, py, pz, 1,
  ];

  const rotated = multiplyMatrices(rz, multiplyMatrices(ry, rx));

  return multiplyMatrices(rotated, translated);
};

export const normalToRotationMatrix = (normal: Vec3, up: Vec3): Mat4 => {
  const tangentA = cross(normal, up);
  const tangentB = cross(safeNormalize(tangentA), normal);
  return [
    tangentA[0], tangentB[0], normal[0], 0,
    tangentA[1], tangentB[1], normal[1], 0,
    tangentA[2], tangentB[2], normal[2], 0,
    0,           0,           0,         1
  ];
};

export const normalToEuler = (normal: Vec3, up: Vec3) => {
  const mat = normalToRotationMatrix(normal, up);

  const at = (r: number, c: number) => mat[r * 4 + c];
  const sy = Math.sqrt(at(0, 0) * at(0, 0) + at(1, 0) * at(1, 0));
  const singular = sy < 1e-6;

  const x = !singular ? Math.atan2(at(2,1), at(2,2)) : Math.atan2(-at(1, 2), at(1, 1));
  const y = Math.atan2(-at(2, 0), sy);
  const z = !singular ? Math.atan2(at(1, 0), at(0, 0)) : 0;
  return vec3(x, y, z);
};

export const determinant = (m: Mat4) => (
  m[12] * m[9] * m[6] * m[3] - m[8] * m[13] * m[6] * m[3]
  - m[12] * m[5] * m[10] * m[3] + m[4] * m[13] * m[10] * m[3]
  + m[8] * m[5] * m[14] * m[3] - m[4] * m[9] * m[14] * m[3]
  - m[12] * m[9] * m[2] * m[7] + m[8] * m[13] * m[2] * m[7]
  + m[12] * m[1] * m[10] * m[7] - m[0] * m[13] * m[10] * m[7]
  - m[8] * m[1] * m[14] * m[7] + m[0] * m[9] * m[14] * m[7]
  + m[12] * m[5] * m[2] * m[11] - m[4] * m[13] * m[2] * m[11]
  - m[12] * m[1] * m[6] * m[11] + m[0] * m[13] * m[6] * m[11]
  + m[4] * m[1] * m[14] * m[11] - m[0] * m[5] * m[14] * m[11]
  - m[8] * m[5] * m[2] * m[15] + m[4] * m[9] * m[2] * m[15]
  + m[8] * m[1] * m[6] * m[15] - m[0] * m[9] * m[6] * m[15]
  - m[4] * m[1] * m[10] * m[15] + m[0] * m[5] * m[10] * m[15]
);

export const inverse = (m: Mat4): Mat4 => {
  const x0 = m[0];
  const x1 = m[1];
  const x2 = m[2];
  const x3 = m[3];
  const x4 = m[4];
  const x5 = m[5];
  const x6 = m[6];
  const x7 = m[7];
  const x8 = m[8];
  const x9 = m[9];
  const x10 = m[10];
  const x11 = m[11];
  const x12 = m[12];
  const x13 = m[13];
  const x14 = m[14];
  const x15 = m[15];
  const a0 = x0 * x5 - x1 * x4;
  const a1 = x0 * x6 - x2 * x4;
  const a2 = x0 * x7 - x3 * x4;
  const a3 = x1 * x6 - x2 * x5;
  const a4 = x1 * x7 - x3 * x5;
  const a5 = x2 * x7 - x3 * x6;
  const b0 = x8 * x13 - x9 * x12;
  const b1 = x8 * x14 - x10 * x12;
  const b2 = x8 * x15 - x11 * x12;
  const b3 = x9 * x14 - x10 * x13;
  const b4 = x9 * x15 - x11 * x13;
  const b5 = x10 * x15 - x11 * x14;
  const invdet = 1 / (a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0);

  return [
    (+x5 * b5 - x6 * b4 + x7 * b3) * invdet,
    (-x1 * b5 + x2 * b4 - x3 * b3) * invdet,
    (+x13 * a5 - x14 * a4 + x15 * a3) * invdet,
    (-x9 * a5 + x10 * a4 - x11 * a3) * invdet,
    (-x4 * b5 + x6 * b2 - x7 * b1) * invdet,
    (+x0 * b5 - x2 * b2 + x3 * b1) * invdet,
    (-x12 * a5 + x14 * a2 - x15 * a1) * invdet,
    (+x8 * a5 - x10 * a2 + x11 * a1) * invdet,
    (+x4 * b4 - x5 * b2 + x7 * b0) * invdet,
    (-x0 * b4 + x1 * b2 - x3 * b0) * invdet,
    (+x12 * a4 - x13 * a2 + x15 * a0) * invdet,
    (-x8 * a4 + x9 * a2 - x11 * a0) * invdet,
    (-x4 * b3 + x5 * b1 - x6 * b0) * invdet,
    (+x0 * b3 - x1 * b1 + x2 * b0) * invdet,
    (-x12 * a3 + x13 * a1 - x14 * a0) * invdet,
    (+x8 * a3 - x9 * a1 + x10 * a0) * invdet,
  ];
};
