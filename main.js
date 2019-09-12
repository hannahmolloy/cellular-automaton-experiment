"use strict";

import { drawImage, init as initCanvas } from "./canvas.js";

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

  initCanvas(canvas, 400, 400);
};

init();

/**
 * Zero means a pixel that should be empty,
 * One means a pixel that should be coloured.
 */
const sampleValues = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];

drawImage(sampleValues);
