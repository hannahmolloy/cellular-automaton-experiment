import Point from "./point.js";

/**
 *
 * @param {{[string]: Point}} st
 * @param {Point} point
 * @returns {{[string]: Point}}
 */
const addToState = (st, point) => {
  st[`${point.x}-${point.y}`] = point;
  return st;
};

export default class State {
  /**
   * @type {{[string]:Point}}
   */
  points = {};

  listeners = [];

  /**
   * @param {Point[]} initialPoints
   */
  constructor(initialPoints) {
    const toDict = (...points) => {
      return points.reduce(addToState, {});
    };

    this.points = toDict(...initialPoints);
  }

  add(x, y) {
    if (!this.has(x, y)) {
      addToState(this.points, new Point(x, y));
      this.notifyListeners();
    }
  }

  has(x, y) {
    return !!this.points[`${x}-${y}`];
  }

  toggle(x, y) {
    if (!this.has(x, y)) {
      this.add(x, y);
    } else {
      this.remove(x, y);
    }
  }

  remove(x, y) {
    delete this.points[`${x}-${y}`];
    this.notifyListeners();
  }

  /**
   * @returns {Point[]}
   */
  toList() {
    return Object.values(this.points);
  }

  notifyListeners() {
    this.listeners.forEach(l => l(this));
  }

  subscribeToChanges(handler) {
    this.listeners.push(handler);
  }
}
