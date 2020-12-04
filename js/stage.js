class Stage {
  constructor(backgroundImage) {
    this.background = backgroundImage;
    this.position = {
      x1: 0,
      x2: width,
    };
    this.scrollSpeed = 1;
    this.nextEnemySpawn = new Date().getTime() + random(1000, 1500);
    this.enemiesLvl0 = [
      ASSETS.images.enemies.enemyRed5,
      ASSETS.images.enemies.enemyRed4,
      ASSETS.images.enemies.enemyRed3,
      ASSETS.images.enemies.enemyRed2,
    ];
    this.enemiesLvl1 = [
      ASSETS.images.enemies.enemyBlue5,
      ASSETS.images.enemies.enemyBlue4,
      ASSETS.images.enemies.enemyBlue3,
      ASSETS.images.enemies.enemyBlue2,
    ];
    this.enemiesLvl2 = [
      ASSETS.images.enemies.enemyBlack5,
      ASSETS.images.enemies.enemyBlack4,
      ASSETS.images.enemies.enemyBlack3,
      ASSETS.images.enemies.enemyBlack2,
    ];
    this.level = 0;
    this.levelScore = 0;
    this.initialLevelScore = 0;
    this.enemiesCollection = [this.enemiesLvl0, this.enemiesLvl1, this.enemiesLvl2];
    this.maxLevel = this.enemiesCollection.length - 1;
    this.levelScores = [500, 1000, 2000];
  }

  draw() {
    image(this.background, this.position.x1, 0, width, height);
    image(this.background, this.position.x2, 0, width, height);
    if (this.renderLvl) {
      textSize(40);
      text(`Level ${this.level + 1}`, width / 2, height / 2 - 100);
    }

    this.scroll();
  }

  scroll() {
    this.position.x1 -= this.scrollSpeed;
    this.position.x2 -= this.scrollSpeed;

    if (this.position.x1 < -width) {
      this.position.x1 = width;
    }

    if (this.position.x2 < -width) {
      this.position.x2 = width;
    }
  }

  renderLvlFor(time) {
    this.renderLvl = true;
    setTimeout(() => {
      this.renderLvl = false;
    }, time);
  }

  resetLevel(level) {
    this.level = level;
    this.levelScore = 0;
    this.initialLevelScore = hud.score;
    this.renderLvlFor(START_TIME * 1000);
  }

  generateNewEnemies() {
    if (this.levelScore > this.levelScores[Math.min(this.level, 2)]) {
      this.level++;
      this.renderLvlFor(START_TIME * 1000);
      this.initialLevelScore = hud.score;
    }
    if (new Date().getTime() > this.nextEnemySpawn) {
      let enemiesColletion = this.enemiesCollection[Math.min(this.level, this.maxLevel)];
      let enemy = enemiesColletion[parseInt(random(0, enemiesColletion.length - 1))];
      enemies.push(new Enemy(enemy, {
        hp: this.level + 1,
        speed: -this.level - 3
      }));
      this.nextEnemySpawn = new Date().getTime() + random(1000, 1500);
    }
    this.levelScore = hud.score - this.initialLevelScore;
  }
}