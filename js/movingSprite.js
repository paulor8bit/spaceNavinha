class MovingSprite {
  constructor(image, config) {
    this.image = image;
    this.size = config.size;
    this.display = config.display || config.size;
    this.spriteMatrix = this.positionMatrix({
      lines: config.lines || 1,
      columns: config.columns || 1
    });
    this.currentFrame = 0;
    this.nextDraw = new Date().getTime();
    this.position = {
      x: config.position.x,
      y: config.position.y
    }
    this.speed = config.speed || 0;
  }
  
  positionMatrix(config) {
    let matrix = [];
    for (let line = 0; line < config.lines; line ++) {
      for (let column = 0; column < config.columns; column ++) {
        matrix.push([this.size.width * column, this.size.height * line]);
      }
    }
    return matrix;
  }
  
  draw() {
    image(this.image, this.position.x, this.position.y,
          this.display.width, this.display.height,
          this.spriteMatrix[this.currentFrame][0], this.spriteMatrix[this.currentFrame][1],
          this.size.width, this.size.height);
    
    this.nextFrame();
  }
  
  nextFrame() {
    if (new Date().getTime() > this.nextDraw) {
      this.currentFrame = ++this.currentFrame % this.spriteMatrix.length;
      this.nextDraw = new Date().getTime() + this.speed;
    }
  }
  
  isOutOfXBoundaries() {
    return this.position.x > (width + this.size.width * 2) ||
      (this.position.x < -this.size.width * 2);
  }
}