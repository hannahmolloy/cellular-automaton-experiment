"use strict";

import { drawImage, init as initCanvas } from "./canvas.js";
import Point from "./point.js";

const $ = s => document.getElementById(s);

const canvas = $("canvas");
const cursor = $("cursor");
const playPauseButton = $("play_pause_button");

let isPlaying = false;

const updatePlayPauseButtonLabel = () => {
  if (isPlaying === true) {
    playPauseButton.innerText = "Pause";
  } else {
    playPauseButton.innerText = "Play";
  }
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

  initCanvas(canvas, 400, 400);
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

init();

/**
 * Zero means a pixel that should be empty,
 * One means a pixel that should be coloured.
 */
const diamond = getPointsFromRowsMap([
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
]);

const smileyFace = getPointsFromRowsMap([
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

drawImage(smileyFace);
