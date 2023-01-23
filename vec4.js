export const vec4 = (x, y, z, w) => [x, y, z, w];
export const toVec3 = ([x, y, z]) => [x, y, z];
export const scale = ([x, y, z, w], s) => [x * s, y * s, z * s, w * s];
export const add = ([ax, ay, az, aw], [bx, by, bz, bw]) => ([ax + bx, ay + by, az + bz, 1] // TODO: Why was this set to 1?
);
export const subtract = ([ax, ay, az, aw], [bx, by, bz, bw]) => ([ax - bx, ay - by, az - bz, 1] // TODO: Why was this set to 1.
);
export const dot = ([ax, ay, az, aw], [bx, by, bz, bw]) => ((ax * bx) + (ay * by) + (az * bz) + (aw * bw));
export const cross = ([ax, ay, az, aw], [bx, by, bz, bw]) => ([
    ay * bz - az * by,
    az * bx - ax * bz,
    ax * by - ay * bx,
    1,
]);
export const magnitude = ([x, y, z, w]) => (Math.sqrt((x * x) + (y * y) + (z * z)));
export const distance = (a, b) => magnitude(subtract(a, b));
export const normalized = (v) => {
    const length = magnitude(v);
    return vec4(v[0] / length, v[1] / length, v[2] / length, 1);
};
export const negated = ([x, y, z]) => ([-x, -y, -z, 1]);
export const perpendicular = ([x, y]) => vec4(-y, x, 0, 1);
