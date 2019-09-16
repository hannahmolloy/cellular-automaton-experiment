"use strict";

import { drawImage, init as initCanvas } from "./canvas.js";
import Point from "./point.js";

const $ = s => document.getElementById(s);

const canvas = $("canvas");
const cursor = $("cursor");
const playPauseButton = $("play_pause_button");

let isPlaying = false;

/**
 * @type {{[string]: Point}}
 */
let state = {};

const updatePlayPauseButtonLabel = () => {
  if (isPlaying === true) {
    playPauseButton.innerText = "Pause";
  } else {
    playPauseButton.innerText = "Play";
  }
};

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

/**
 * @param {number} x
 * @param {number} y
 */
const onCanvasClicked = (x, y) => {
  addToState(state, new Point(x, y));
  render();
};

const init = () => {
  updatePlayPauseButtonLabel();

  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayPauseButtonLabel();
  });

  document.body.addEventListener("mousemove", e => {
    cursor.style.left = e.pageX + "px";
    cursor.style.top = e.pageY - cursor.height + "px";
  });

  initCanvas(canvas, 400, 400, onCanvasClicked);
};

/**
 * @param {number[][]} rowsMap
 * @returns Point[]
 */
const getPointsFromRowsMap = rowsMap => {
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

const toDict = (...points) => {
  return points.reduce(addToState, {});
};

state = toDict(
  ...getPointsFromRowsMap([
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]).map(point => point.move(15, 15))
);

const render = () => {
  drawImage(Object.values(state));
};

init();
render();
