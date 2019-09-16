"use strict";

import { drawImage, init as initCanvas } from "./canvas.js";
import Point from "./point.js";
import State from "./state.js";

const $ = s => document.getElementById(s);

const canvas = $("canvas");
const cursor = $("cursor");
const playPauseButton = $("play_pause_button");

let isPlaying = false;

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

const samplePoints = getPointsFromRowsMap([
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]).map(point => point.move(15, 15));

const state = new State(
  !!localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : samplePoints
);

const updatePlayPauseButtonLabel = () => {
  if (isPlaying === true) {
    playPauseButton.innerText = "Pause";
  } else {
    playPauseButton.innerText = "Play";
  }
};

/**
 * @param {number} x
 * @param {number} y
 */
const onCanvasClicked = (x, y) => {
  state.toggle(x, y);
  render();
};

const init = () => {
  updatePlayPauseButtonLabel();

  playPauseButton.addEventListener("click", () => {
    isPlaying = !isPlaying;
    updatePlayPauseButtonLabel();
  });

  const offset = 4;
  document.body.addEventListener("mousemove", e => {
    cursor.style.left = e.pageX - offset + "px";
    cursor.style.top = e.pageY - cursor.height + offset + "px";
  });

  initCanvas(canvas, 400, 400, onCanvasClicked);
};

const render = () => {
  drawImage(state.toList());
};

window.state = state;

state.subscribeToChanges(newState => {
  localStorage.setItem("state", JSON.stringify(newState.toList()));
});

init();
render();
