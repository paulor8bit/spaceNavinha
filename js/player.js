const MAX_PLAYER_HP = 4;
const INITIAL_LIFES = 3;

class Player {
  constructor(image) {
    this.image = image;
    this.size = {
      width: 106,
      height: 99
    };
    this.display = this.size;
    this.position = {
      x: this.size.width / 5,
      y: (height - this.size.height) / 2
    };
    this.speed = 5;
    this.shooting = false;
    this.poly = [];
    this.upgrades = {
      active: {
        shield: new Shield(ASSETS.images.ships.shieldBarrier, this.position),
        multiCannons: false,
      },
    }
    this.dead = false;
    this.invencible = true;
    this.hp = MAX_PLAYER_HP;
    this.damageValue = 1;
    this.lifes = INITIAL_LIFES;
    this.explosion = new Explosion({
      position: this.position,
      onComplete: () => {
        setTimeout(() => {
          this.invencible = true;
          this.reset();
          this.lifes--;
          this.explosion.resetLoops();
        }, 500);
        setTimeout(() => this.invencible = false, 2000);
      }
    });
  }

  draw() {
    if (!this.dead) {
      this.handleMovement();
      this.handleShots();
      let c = (3 * sin(millis() / 100));
      image(ASSETS.images.ships.blueFire, this.position.x - 28 - c, this.position.y + this.size.height/2 - 7, 28 + c, 14);
      image(this.image, this.position.x, this.position.y, this.size.width, this.size.height);
      if (this.invencible) {
        let invencibleAura = colors.GOLD;
        invencibleAura.setAlpha(50 + (32 * sin(millis() / 1000)));
        fill(invencibleAura);
        noStroke();
        circle(this.position.x + this.size.width/2, this.position.y + this.size.height/2, this.size.width/0.8);
        invencibleAura.setAlpha(255);
      } else {
        if (!this.upgrades.active.shield.broken()) {
          this.upgrades.active.shield.updatePosition(this.position);
          this.upgrades.active.shield.draw();
        }
      }
    } else {
      this.explosion.setPosition(this.position);
      this.invencible = true;
      this.explosion.draw();
    }
  }

  handleShots() {
    if (keyIsDown(SPACE_KEYCODE) && !this.shooting) {
      this.shooting = true;
      ASSETS.sounds.bullet.play();
      let shot = new Bullet(ASSETS.images.ships.bullet, {
        x: this.position.x + this.size.height - BULLET_SIZE.width,
        y: this.position.y + (this.size.height / 2 - BULLET_SIZE.height / 2)
      }, this.speed * 2, this.damageValue);
      playerBullets.push(shot);

      if (this.upgrades.active.multiCannons) {
        let ShotUp = new Bullet(ASSETS.images.ships.bullet, {
          x: this.position.x + this.size.width - BULLET_SIZE.width - 30,
          y: this.position.y
        }, this.speed * 2, this.damageValue);
        let ShotDown = new Bullet(ASSETS.images.ships.bullet, {
          x: this.position.x + this.size.width - BULLET_SIZE.width - 30,
          y: this.position.y + (this.size.height - BULLET_SIZE.height / 2)
        }, this.speed * 2, this.damageValue);
        playerBullets.push(ShotUp);
        playerBullets.push(ShotDown);
      }
      setTimeout(() => this.shooting = false, 300);
    }
  }

  handleMovement() {
    this.poly[0] = createVector(this.position.x + 15, this.position.y);
    this.poly[1] = createVector(this.position.x + 15, this.position.y + this.display.height);
    this.poly[2] = createVector(this.position.x + 60, this.position.y + this.display.height);
    this.poly[3] = createVector(this.position.x + 70, this.position.y + this.display.height - 40);
    this.poly[4] = createVector(this.position.x + 110, this.position.y + this.display.height - 40);
    this.poly[5] = createVector(this.position.x + 110, this.position.y + this.display.height - 55);
    this.poly[6] = createVector(this.position.x + 70, this.position.y + this.display.height - 55);
    this.poly[7] = createVector(this.position.x + 60, this.position.y);

    if (keyIsDown(UP_ARROW) || keyIsDown(W_KEYCODE)) {
      if (this.position.y - this.speed > boundaries.top) {
        this.position.y -= this.speed;
      }
    }

    if (keyIsDown(DOWN_ARROW) || keyIsDown(S_KEYCODE)) {
      if (this.position.y + this.speed < boundaries.bottom) {
        this.position.y += this.speed;
      }
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(A_KEYCODE)) {
      if (this.position.x - this.speed > boundaries.left) {
        this.position.x -= this.speed;
      }
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEYCODE)) {
      if (this.position.x + this.speed < boundaries.right) {
        this.position.x += this.speed;
      }
    }
  }

  collideWith(other) {
    if (this.dead || other.dead) return false;

    return collideRectPoly(
      other.position.x,
      other.position.y,
      other.display.width,
      other.display.height,
      this.poly
    );
  }

  damage(damage) {
    if (!this.upgrades.active.shield.broken()) {
      this.upgrades.active.shield.damage(damage);
      if (this.upgrades.active.shield.broken()) {
        ASSETS.sounds.shieldDisabled.play();
      }
      return;
    }
    
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.dead = true;
    }
  }

  apply(upgrade) {
    return upgrade.applyTo(this);
  }

  restart() {
    this.invencible = true;
    this.lifes = INITIAL_LIFES;
    this.reset();
    setTimeout(() => {
      this.invencible = false;
    }, START_TIME * 1000);
  }

  reset() {
    currentStage.resetLevel(0);
    this.hp = MAX_PLAYER_HP;
    this.dead = false;
    this.damageValue = 1;
    this.upgrades.active.multiCannons = false;
    this.upgrades.active.shield.hp = 0;
    this.position = {
      x: this.size.width / 5,
      y: (height - this.size.height) / 2
    };
  }
}