export default class Point {
  /**
   * @type number
   */
  x;

  /**
   * @type number
   */
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(deltaX, deltaY) {
    return new Point(this.x + deltaX, this.y + deltaY);
  }
}
