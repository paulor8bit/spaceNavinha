class Upgrade extends MovingSprite {
  constructor(config) {
    super(config.image, {
      lines: 1,
      columns: 1,
      position: config.position,
      size: {
        width: 300,
        height: 300
      },
      display: {
        width: 48,
        height: 48
      }
    });
    this.config = config;
    this.class = config.upgradeClass;
  }

  move() {
    this.position.x -= 2;
  }

  applyTo(player) {
    ASSETS.sounds.upgradeAdded.play();
    switch (this.class) {
      case "barrier":
        if (player.upgrades.active.shield.hp == MAX_SHIELD_HP)
          player.hp = MAX_PLAYER_HP;
        player.upgrades.active.shield.hp = MAX_SHIELD_HP;
        return true;
      case "multiCannons":
        if (player.upgrades.active.multiCannons) {
          player.damageValue++;
        } else {
          player.upgrades.active.multiCannons = true;
        }
        return true;
      case "heal":
        if (player.hp == MAX_PLAYER_HP) {
          ASSETS.sounds.life.play();
          player.lifes++;
        } else {
          player.hp = MAX_PLAYER_HP;
        }
        return true;
      case "invencible":
        player.invencible = true;
        clearTimeout(upgradeTimeout);
        upgradeTimeout = setTimeout(() => {
          upgradeTimeout = -1;
          player.invencible = false;
        }, 5000);
        return true;
      default:
        console.log('unknown upgrade: ', this);
        return false;
    }
  }
}