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

/**
 * @param {HTMLCanvasElement} canvasElement
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
export const init = (canvasElement, canvasWidth, canvasHeight) => {
  ctx = canvasElement.getContext("2d");
  width = canvasWidth;
  height = canvasHeight;

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

  ctx.scale(4, 4);
};

/**
 * @param {number} x
 * @param {number} y
 */
const drawPixelAt = (x, y) => {
  ctx.fillRect(x, y, 1, 1);
};

/**
 * Clear the whole canvas
 */
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * @param {number[]} row
 * @param {number} rowIndex
 */
const drawRow = (row, rowIndex) => {
  row.forEach((value, colIndex) => {
    if (value === 1) {
      drawPixelAt(colIndex, rowIndex);
    }
  });
};

/**
 * @param {number[][]} rows
 */
export const drawImage = rows => {
  clear();

  /**
   * the colour that the dots will be
   */
  ctx.fillStyle = "#FFFFFF";

  rows.forEach(drawRow);
};
