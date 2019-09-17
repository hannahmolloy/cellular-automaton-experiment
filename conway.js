import { toDict } from "./utils.js";
import Point from "./point.js";

export default class Board {
  /**
   *
   * @type {{[string]: Point}}
   */
  points = {};

  rows = 0;
  cols = 0;

  constructor(boardWidth, boardHeight, initialPoints) {
    this.points = toDict(...initialPoints);
    this.rows = boardWidth;
    this.cols = boardHeight;
  }

  /**
   * @returns {{col: number, row: number}[]}
   */
  getAllBoardPositions() {
    return [...new Array(this.rows)]
      .map((_, row) => {
        return [...new Array(this.cols)].map((__, col) => ({ row, col }));
      })
      .flat();
  }

  step() {
    const nextPoints = this.getAllBoardPositions().map(pos => {
      const x = pos.col;
      const y = pos.row;
      if (this.isAlive(x, y)) {
        if (this.shouldSurvive(x, y)) {
          return this.getPointAt(x, y);
        } else {
          return undefined;
        }
      } else {
        if (this.shouldPointBirth(x, y)) {
          return new Point(x, y);
        } else {
          return undefined;
        }
      }
    });

    const filteredPoints = nextPoints.filter(Boolean);

    this.points = toDict(...filteredPoints);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  has(x, y) {
    return !!this.points[`${x}-${y}`];
  }

  /**
   * @param {number} x
   * @param {number} y
   * @returns Point | undefined
   */
  getPointAt(x, y) {
    return this.points[`${x}-${y}`];
  }

  /**
   * @param {Point} point
   * @returns {{above: Point?, below: Point?, left: Point?, right: Point?}}
   */
  getNeighborsForPoint(point) {
    const rowAbove = point.y - 1;
    const rowBelow = point.y + 1;
    const colLeft = point.x - 1;
    const colRight = point.x + 1;

    return {
      above: this.getPointAt(point.x, rowAbove),
      below: this.getPointAt(point.x, rowBelow),
      left: this.getPointAt(colLeft, point.y),
      right: this.getPointAt(colRight, point.y)
    };
  }

  countNeighbors(x, y) {
    return Object.values(this.getNeighborsForPoint(new Point(x, y))).filter(
      Boolean
    ).length;
  }

  isAlive(x, y) {
    return this.has(x, y);
  }

  shouldPointBirth(x, y) {
    return this.countNeighbors(x, y) === 3;
  }

  shouldPointDieOfIsolation(x, y) {
    return this.countNeighbors(x, y) < 2;
  }

  shouldPointDieOfOvercrowding(x, y) {
    return this.countNeighbors(x, y) > 3;
  }

  shouldSurvive(x, y) {
    const neighbors = this.countNeighbors(x, y);

    return neighbors === 2 || neighbors === 3;
  }

  /**
   * @returns {Point[]}
   */
  toList() {
    return Object.values(this.points);
  }
}
