export type Vec2 = [number, number];

export const vec2 = (x: number, y?: number): Vec2 => y === undefined ? [x, x] : [x, y];

export const add = ([ax, ay]: Vec2, [bx, by]: Vec2): Vec2 => [ax + bx, ay + by];

export const subtract = ([ax, ay]: Vec2, [bx, by]: Vec2): Vec2 => [ax - bx, ay - by];

export const multiply = ([ax, ay]: Vec2, [bx, by]: Vec2): Vec2 => [ax * bx, ay * by];

export const scale = ([x, y]: Vec2, s: number): Vec2 => [x * s, y * s];

export const getLength = ([x, y]): number => Math.sqrt(x ** 2 + y ** 2);

export const normalize = (v: Vec2): Vec2 => scale(v, 1 / getLength(v));

export const floor = (v: Vec2) => v.map(Math.floor) as Vec2;

export const ceil = (v: Vec2) => v.map(Math.ceil) as Vec2;

export const round = (v: Vec2) => v.map(Math.round) as Vec2;

export const distance = (a: Vec2, b: Vec2) => getLength(subtract(a, b));

export const dot = ([ax, ay]: Vec2, [bx, by]: Vec2) => (ax * bx) + (ay * by);
