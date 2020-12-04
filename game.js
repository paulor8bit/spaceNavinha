function reset() {
  timeReference = millis();
  hud.score = 0;
  gameOverSaid = false;
  ready = false;
  enemies = [];
  enemyBullets = [];
  player.restart();
  currentStage.level = 0;
  enemyBullets = [];
  playerBullets = [];
  upgrades = [];
  enemies = [];
  running = true;
  setTimeout(() => {
    ready = true;
  }, START_TIME * 1000);
}

function sayGameOverOnce() {
  if (!gameOverSaid)
    ASSETS.sounds.gameOver.play();
  gameOverSaid = true;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(ASSETS.images.ships.greenShip);
  currentStage = new Stage(ASSETS.images.stages.first);
  boundaries = {
    left: 0,
    right: width - player.size.width,
    top: 0,
    bottom: height - player.size.height,
  }
  ASSETS.sounds.menu.setVolume(0.7);
  ASSETS.sounds.menu.loop();
  ASSETS.sounds.bullet.setVolume(0.08);
  ASSETS.sounds.explosion.setVolume(0.1);
  hud = new HUD(player, 0);
  colors = {
    BLACK: color(0, 0, 0),
    GREEN: color(50, 205, 50),
    BLUE: color(30, 144, 255),
    RED: color(255, 69, 0),
    YELLOW: color(255, 255, 124),
    GOLD: color(255, 223, 0),
  };
  initialMenu = new Menu("initial");
  helpMenu = new HelpMenu();
  gameOver = new GameOver();

  currentState = 0;
  gameStates = {
    0: (() => {
      initialMenu.draw()
    }),
    1: (() => {
      game()
    }),
    2: () => {
      helpMenu.draw();
    },
    3: () => {
      gameOver.draw();
    } 
  };
}

function draw() {
  gameStates[currentState]();
}

function game() {
  currentStage.draw();
  if (!ready) {
    fill(0);
    textAlign(CENTER);
    textSize(50);
    text(`${parseInt((START_TIME + 1) + (timeReference - millis())/1000)}`, width / 2, height / 2);
  } else {
    currentStage.generateNewEnemies();
  }
  enemyBullets = enemyBullets.filter((enemybullet) => {
    enemybullet.move();
    enemybullet.draw();
    if (player.collideWith(enemybullet)) {
      if (!player.invencible) player.damage(enemybullet.damageValue);
      return false;
    }
    return !enemybullet.isOutOfXBoundaries();
  });

  playerBullets = playerBullets.filter((playerBullet) => {
    playerBullet.move();
    playerBullet.draw();
    return !playerBullet.isOutOfXBoundaries();
  });

  upgrades = upgrades.filter((upgrade) => {
    upgrade.move();
    upgrade.draw();
    if (player.collideWith(upgrade)) {
      hud.score += 10;
      return !player.apply(upgrade);
    }
    return true;
  });

  enemies = enemies.filter((enemy) => {
    enemy.move();
    playerBullets = playerBullets.filter((playerBullet, index) => {
      if (enemy.collideWith(playerBullet)) {
        let drop = enemy.damage(playerBullet.damageValue);
        if (drop) upgrades.push(drop);
        hud.score += enemy.score;
        return false;
      }
      return true;
    });
    if (player.collideWith(enemy)) {
      let drop = enemy.damage(player.damageValue * 3);
      if (!player.invencible) {
        player.damage(999);
      } else {
        if (drop) upgrades.push(drop);
      }
    }
    return !enemy.isOutOfXBoundaries() && enemy.shouldContinue;
  });
  if (player.lifes >= 0) {
    player.draw();
  }

  if (player.lifes < 0) {
    sayGameOverOnce();
    currentState = 3;
  }

  hud.draw();
  
  if (!running) {
    textSize(30);
    text("Pause", width/2, height/2);
  }
}