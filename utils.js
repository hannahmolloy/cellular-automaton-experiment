/**
 *
 * @param {{[string]: Point}} st
 * @param {Point} point
 * @returns {{[string]: Point}}
 */
import Point from "./point.js";

export const addToState = (st, point) => {
  st[`${point.x}-${point.y}`] = point;
  return st;
};

export const toDict = (...points) => {
  return points.reduce(addToState, {});
};
/**
 * @param {number[][]} rowsMap
 * @returns Point[]
 */
export const getPointsFromRowsMap = rowsMap => {
  return rowsMap
    .map((row, rowIndex) => {
      return row
        .map((val, colIndex) => {
          if (val === 1) {
            return new Point(colIndex, rowIndex);
          }
        })
        .filter(Boolean);
    })
    .flat();
};
