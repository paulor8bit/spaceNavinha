const BULLET_SIZE = {
  width: 24,
  height: 12
};

class Bullet extends MovingSprite {
  constructor(image, startPosition, speed, damage) {
    super(image, {
      position: startPosition,
      size: BULLET_SIZE
    });
    this.speed = speed;
    this.damageValue = damage;
  }
  
  move() {
    this.position.x += this.speed;
  }
}