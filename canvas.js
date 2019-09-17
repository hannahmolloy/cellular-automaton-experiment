"use strict";

/**
 * @type CanvasRenderingContext2D
 */
let ctx;
/**
 * @type number
 */
let width;
/**
 * @type number
 */
let height;

const scaleFactor = 10;

const scaled = n => n * scaleFactor;
const unscaled = n => Math.floor(n / scaleFactor);

let onCanvasClicked;

const fallbackClickHandler = (x, y) => {
  console.log(
    `The canvas was clicked at [${x}, ${y}] but you haven't supplied a callback handler`
  );
};

/**
 * @param {HTMLCanvasElement} canvasElement
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {Function} onClick
 */
export const init = (canvasElement, canvasWidth, canvasHeight, onClick) => {
  ctx = canvasElement.getContext("2d");
  width = canvasWidth;
  height = canvasHeight;

  onCanvasClicked = onClick || fallbackClickHandler;

  canvasElement.addEventListener("click", e => {
    onCanvasClicked(unscaled(e.offsetX), unscaled(e.offsetY));
  });

  /**
   * Set the canvas size to the initialised values.
   * @todo: https://coderwall.com/p/vmkk6a/how-to-make-the-canvas-not-look-like-crap-on-retina
   */
  canvasElement.setAttribute("width", canvasWidth);
  canvasElement.setAttribute("height", canvasHeight);

  Object.assign(canvasElement.style, {
    width: canvasWidth + "px",
    height: canvasHeight + "px",
    border: "1px solid black", // for testing
    background: "black" // for testing
  });
};

/**
 * @param {number} x
 * @param {number} y
 */
const drawPixelAt = (x, y) => {
  ctx.fillRect(scaled(x), scaled(y), scaled(1), scaled(1));
};

/**
 * Clear the whole canvas
 */
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * @param {Point} point
 */
const drawPoint = point => {
  drawPixelAt(point.x, point.y);
};

/**
 * @param {Point[]} points
 */
export const drawImage = points => {
  clear();

  /**
   * the colour that the dots will be
   */
  ctx.fillStyle = "#FFFFFF";

  console.log(points);
  points.forEach(drawPoint);
};
