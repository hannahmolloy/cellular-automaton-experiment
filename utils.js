/**
 *
 * @param {{[string]: Point}} st
 * @param {Point} point
 * @returns {{[string]: Point}}
 */
export const addToState = (st, point) => {
  st[`${point.x}-${point.y}`] = point;
  return st;
};

export const toDict = (...points) => {
  return points.reduce(addToState, {});
};
