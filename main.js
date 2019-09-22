"use strict";

import { drawImage, init as initCanvas } from "./canvas.js";
import Board from "./board.js";
import { getPointsFromRowsMap } from "./utils.js";

const $ = s => document.getElementById(s);

const canvas = $("canvas");
const playPauseButton = $("play_pause_button");

let isPlaying = false;

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

/**
 * @param {boolean} isNowPlaying
 */
const changePlayingStatus = isNowPlaying => {
  isPlaying = isNowPlaying;
  updatePlayPauseButtonLabel();
};

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
  board.toggle(x, y);
  render();
};

const init = () => {
  changePlayingStatus(false);

  playPauseButton.addEventListener("click", () => {
    changePlayingStatus(!isPlaying);
  });

  initCanvas(canvas, 400, 400, onCanvasClicked);
  render();
};

const render = () => {
  drawImage(board.toList());
};

const board = new Board(
  40,
  40,
  !!localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : samplePoints
);

const go = () => {
  board.step();
  render();

  if (board.toList().length === 0) {
    changePlayingStatus(false);
  }
};

board.subscribeToChanges(newState => {
  localStorage.setItem("state", JSON.stringify(newState.toList()));
});

init();

setInterval(() => {
  if (isPlaying) {
    go();
  }
}, 333);
