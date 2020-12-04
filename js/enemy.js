class Enemy extends MovingSprite {
  constructor(image, config = {}) {
    super(image, {
      position: {
        x: width,
        y: random(97, height - 97)
      },
      size: {
        width: 84,
        height: 97
      },
      lines: 1,
      columns: 1,
    });
    this.goUp = Math.random().toFixed() == 0 ? false : true;
    this.goDown = !this.goUp;
    this.movimentIndex = (Math.random() * (MOVEMENT_MODES.length - 1)).toFixed();
    this.movementFunction = MOVEMENT_MODES[this.movimentIndex];
    this.shooting = false;
    this.speed = config.speed || -3;
    this.dead = false;
    this.shouldContinue = true;
    this.initialHP = config.hp || 1;
    this.hp = this.initialHP;
    this.score = this.initialHP * 5;
    this.damageValue = config.damageValue || 1;
  }

  move() {
    if (!this.dead) {
      this.movementFunction.call(this);
      this.tryToShot();
      let c = (3 * sin(millis() / 100));
      image(ASSETS.images.enemies.greenFire, this.position.x + this.display.width, this.position.y + this.size.height / 2 - 7, 28 - c, 14);
      this.draw();
      this.drawEnemyStatus();
    } else {
      this.explosion = this.explosion || new Explosion({
        position: this.position
      });
      this.explosion.draw();
      if (this.explosion.completed()) {
        this.shouldContinue = false;
      }
    }
  }

  drawEnemyStatus() {
    if (this.hp != this.initialHP) {
      fill(getStatusColor(this.hp, this.initialHP));
      rect(this.position.x, this.position.y, (this.size.width * this.hp / this.initialHP), 3);
      noFill();
      rect(this.position.x, this.position.y, this.size.width, 3);
    }
  }

  tryToShot() {
    if (Math.random() > 0.75 && !this.shooting) {
      this.shooting = true;
      ASSETS.sounds.bullet.play();
      let shot = new Bullet(ASSETS.images.enemies.bullet, {
        x: this.position.x,
        y: this.position.y + (this.size.height / 2 - BULLET_SIZE.height / 2)
      }, this.speed * 2, this.damageValue);
      enemyBullets.push(shot);
      setTimeout(() => this.shooting = false, 800);
    }
  }

  damage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.dead = true;

      let n = random(1, 100);
      if (n >= 0 && n < 5) {
        return new Upgrade({
          image: ASSETS.images.upgrades.barrier,
          position: this.position,
          upgradeClass: "barrier"
        });
      }
      if (n >= 5 && n < 10) {
        return new Upgrade({
          image: ASSETS.images.upgrades.multiCannons,
          position: this.position,
          upgradeClass: "multiCannons"
        });
      }
      if (n >= 10 && n < 15) {
        return new Upgrade({
          image: ASSETS.images.upgrades.heal,
          position: this.position,
          upgradeClass: "heal"
        });
      }
      if (n >= 15 && n < 17) {
        return new Upgrade({
          image: ASSETS.images.upgrades.invencible,
          position: this.position,
          upgradeClass: "invencible"
        });
      }
    }
  }

  collideWith(other) {
    if (this.dead || other.dead) return false;
    return collideRectRect(
      this.position.x,
      this.position.y,
      this.display.width,
      this.display.height,
      other.position.x,
      other.position.y,
      other.display.width,
      other.display.height
    );
  }
}