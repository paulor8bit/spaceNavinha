const MAX_SHIELD_HP = 2;

class Shield extends MovingSprite {
  constructor(image, position) {
    super(image, {
      lines: 4,
      columns: 5,
      size: { width: 192, height: 192 },
      display: { width: 250, height: 250 },
      position: {x: position.x + 192, y: position.y - 192/2},
      speed: 40,
    });
    this.hp = 0;
  }
  
  updatePosition(position) {
    this.position = {
      x: position.x - player.size.width/2 - 20,
      y: position.y - player.size.height/2
    }
  }
  
  damage(damage) {
    this.hp -= damage;
  }
  
  broken() {
    return (this.hp <= 0);
  }
}