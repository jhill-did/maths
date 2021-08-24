import {
  Vec3,
  add,
  subtract,
  normalize,
  cross,
  dot,
} from './vec3';
import { multiplyMatrices, Mat4, makeTransform, inverse } from './mat4';
import { toRadians } from './scalar';

export const makeViewMatrix = (
  position: Vec3,
  rotation: Vec3,
  viewPosition: Vec3,
  viewRotation: Vec3,
  viewPunch: Vec3,
) => {
  const punchedViewRotation = add(viewRotation, viewPunch);
  const innerTransform = makeTransform(position, rotation);
  const outerTransform = makeTransform(viewPosition, punchedViewRotation);
  return inverse(multiplyMatrices(outerTransform, innerTransform));
};

export const makePerspectiveMatrix = (
  fov: number,
  aspect: number,
  zNear: number,
  zFar: number,
): Mat4 => {
  const mat = new Array(16).fill(0);

  const yScale = 1.0 / (Math.tan(toRadians(fov / 2.0)));
  const xScale = yScale / aspect;
  const frustrumLength = zFar - zNear;

  mat[0] = xScale;
  mat[5] = yScale;
  mat[10] = -((zFar + zNear) / frustrumLength);
  mat[11] = -1.0;
  mat[14]  = -((2.0 * zFar * zNear) / frustrumLength);
  mat[15] = 0.0;

  return mat as Mat4;
};

export const makeLookAtMatrix = (position: Vec3, target: Vec3, up: Vec3) => {
  const mat = new Array(16).fill(0);

  const Z = normalize(subtract(position, target));
  const initialY = up;
  const initialX = cross(initialY, Z);
  const Y = normalize(cross(Z, initialX));
  const X = normalize(initialX);

  mat[0] = X[0];
  mat[4] = X[1];
  mat[8] = X[2];
  mat[12] = -dot(X, position);
  mat[1] = Y[0];
  mat[5] = Y[1];
  mat[9] = Y[2];
  mat[13] = -dot(Y, position);
  mat[2] = Z[0];
  mat[6] = Z[1];
  mat[10] = Z[2];
  mat[14] = -dot(Z, position);
  mat[3] = 0.0;
  mat[7] = 0.0;
  mat[11] = 0.0;
  mat[15] = 1.0;

  return mat as Mat4;
};
