const START_TIME = 3; // seconds

const STATES = {
  MENU: 1,
  PLAYING: 2,
  GAME_OVER: 3,
  RESTARTING: 4
};

const MOVEMENT_MODES = [
  function() {
    this.position.x -= 2;
    if (this.goUp) {
      this.position.y -= 1;
      if (this.position.y < boundaries.top) {
        this.goUp = false;
        this.goDown = true;
      }
    } else {
      this.position.y += 1;
      if (this.position.y > boundaries.bottom) {
        this.goUp = true;
        this.goDown = false;
      }
    }
  },
  function() {
    let chanceChangeDirection = Math.random() > 0.95;
    this.position.x -= 2;
    switch (true) {
      case this.goUp:
        this.position.y -= 3;
        if (this.position.y < boundaries.top || chanceChangeDirection) {
          this.goUp = false;
          this.goDown = true;
        }
        break;
      case this.goDown:
        this.position.y += 3;
        if (this.position.y > boundaries.bottom || chanceChangeDirection) {
          this.goUp = true;
          this.goDown = false;
        }
        break;
    }
  }
];