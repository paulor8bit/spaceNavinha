class HUD {
  constructor(player, score) {
    this.player = player;
    this.score = score;
    this.start = 50;
    this.barWidth = 200;
    this.barHeight = 30;
    this.gap = 50;
    this.iconSize = 36;
    this.iconHeight = 70 - (this.iconSize - this.barHeight) / 2;
    this.currentLifeBar = this.barWidth;
    this.currentShieldBar = 0;
    this.barSpeed = 4;
  }

  draw() {
    textSize(20);
    fill(colors.BLACK);
    textAlign(LEFT);
    noStroke();
    text(`Vidas: ${Math.max(this.player.lifes, 0)}`, 50, 50);

    textAlign(CENTER);
    text(this.score, width / 2, 50);

    image(ASSETS.images.upgrades.heal, this.start, this.iconHeight, this.iconSize, this.iconSize);
    if (this.player.invencible) {
      fill(colors.GOLD)
    } else {
      fill(getStatusColor(this.player.hp, MAX_PLAYER_HP));
    }
    noStroke();
    let lifeBarWidth = parseInt((this.player.hp / MAX_PLAYER_HP) * this.barWidth);
    lifeBarWidth -= lifeBarWidth % this.barSpeed;
    if (lifeBarWidth != this.currentLifeBar) {
      if (lifeBarWidth > this.currentLifeBar) {
        this.currentLifeBar += this.barSpeed;
      } else {
        this.currentLifeBar -= this.barSpeed;
      }
    }
    rect(this.start + this.iconSize * 1.1, 70, this.currentLifeBar, this.barHeight);
    stroke(colors.BLACK);
    noFill();
    rect(this.start + this.iconSize * 1.1, 70, this.barWidth, this.barHeight);
    fill(colors.BLACK);
    textSize(15);
    noStroke();
    text(`${parseInt((this.currentLifeBar/this.barWidth) * 100)} %`, this.barWidth / 2 + this.start + this.iconSize * 1.1, 90);

    if (this.currentShieldBar || !this.player.upgrades.active.shield.broken()) {
      image(ASSETS.images.upgrades.barrier, this.start + this.barWidth + this.gap, this.iconHeight, this.iconSize, this.iconSize);
      fill(colors.BLUE);
      noStroke();
      let shieldBarWidth = this.player.upgrades.active.shield.hp / MAX_SHIELD_HP * this.barWidth;
      shieldBarWidth -= shieldBarWidth % this.barSpeed;
      if (shieldBarWidth != this.currentShieldBar) {
        if (shieldBarWidth > this.currentShieldBar) {
          this.currentShieldBar += this.barSpeed;
        } else {
          this.currentShieldBar -= this.barSpeed;
        }
      }
      rect(this.start + this.barWidth + this.gap + this.iconSize * 1.1, 70, this.currentShieldBar, this.barHeight);
      stroke(colors.BLACK);
      noFill();
      rect(this.start + this.barWidth + this.gap + this.iconSize * 1.1, 70, this.barWidth, this.barHeight);
      fill(colors.BLACK);
      textSize(15);
      noStroke();
      text(`${parseInt((this.currentShieldBar/this.barWidth) * 100)} %`, this.start + (this.barWidth * 1.5) + this.gap + this.iconSize * 1.1, 90);
    }

    if (this.player.upgrades.active.multiCannons) {
      image(ASSETS.images.upgrades.multiCannons, this.start + 2 * this.barWidth + (2 * this.gap), this.iconHeight, this.iconSize, this.iconSize);
    }
  }
}