"use strict";

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
};

init();
