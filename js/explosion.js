class Explosion {
  constructor(config) {
    this.image = ASSETS.images.explosion;
    this.sprite = new MovingSprite(this.image, {
      lines: 9,
      columns: 9,
      position: { x: config.position.x, y: config.position.y },
      size: { width: 100, height: 100 }
    });
    this.config = config;
    this.resetLoops();
    this.playedSound = false;
  }

  draw() {
    if (!this.playerSound) {
      ASSETS.sounds.explosion.play();
      this.playerSound = true;
    }
    if (this.stopLoops) return;
    if (this.loops.total > this.loops.run) {
      if (this.completed()) {
        this.loops.run++;
      }
      this.sprite.draw();
    } else {
      this.stopLoops = true;
      this.sprite.currentFrame = 0;
      if (this.config.onComplete) this.config.onComplete();
    }
  }

  completed() {
    return this.sprite.currentFrame == this.sprite.spriteMatrix.length - 1;
  }

  setPosition(position) {
    this.sprite.position = position;
  }
  
  resetLoops() {
    this.playerSound = false;
    this.stopLoops = false;
    this.loops = this.config.loops || {
      total: 1,
      run: 0
    };
  }
  
}