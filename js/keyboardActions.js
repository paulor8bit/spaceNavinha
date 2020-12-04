const W_KEYCODE = 87;
const S_KEYCODE = 83;
const A_KEYCODE = 65;
const D_KEYCODE = 68;
const SPACE_KEYCODE = 32;
const ENTER_KEYCODE = 13;

function keyPressed() {
  if (keyCode == ENTER_KEYCODE) {
    if (currentState == 1) {
      if (running) {
        running = false;
        ASSETS.sounds.inGame.pause();
        noLoop();
      } else {
        ASSETS.sounds.inGame.play();
        running = true;
        loop();
      }
    }
  }
}