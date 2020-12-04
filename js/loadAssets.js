const ASSETS = {
  images: {
    menus: {
      mainMenu: 'assets/images/menus/mainMenu.jpg',
      gameOver: 'assets/images/menus/gameOver.jpg'
    },
    ships: {
      greenShip: 'assets/images/ships/greenShip.png',
      bullet: 'assets/images/ships/bullet.png',
      shieldBarrier: 'assets/images/ships/shieldBarrier.png',
      blueFire: 'assets/images/ships/blueFire.png',
    },
    upgrades: {
      barrier: 'assets/images/upgrades/Armor_Bonus.png',
      multiCannons: 'assets/images/upgrades/Rockets_Bonus.png',
      heal: 'assets/images/upgrades/HP_Bonus.png',
      damage: 'assets/images/upgrades/Damage_Bonus.png',
      invencible: 'assets/images/upgrades/Invencible_Bonus.png',
    },
    explosion: 'assets/images/explosion.png',
    enemies: {
      enemyRed5: 'assets/images/enemies/enemyRed5.png',
      enemyRed4: 'assets/images/enemies/enemyRed4.png',
      enemyRed3: 'assets/images/enemies/enemyRed3.png',
      enemyRed2: 'assets/images/enemies/enemyRed2.png',
      enemyRed1: 'assets/images/enemies/enemyRed1.png',
      enemyBlue5: 'assets/images/enemies/enemyBlue5.png',
      enemyBlue4: 'assets/images/enemies/enemyBlue4.png',
      enemyBlue3: 'assets/images/enemies/enemyBlue3.png',
      enemyBlue2: 'assets/images/enemies/enemyBlue2.png',
      enemyBlack5: 'assets/images/enemies/enemyBlack5.png',
      enemyBlack4: 'assets/images/enemies/enemyBlack4.png',
      enemyBlack3: 'assets/images/enemies/enemyBlack3.png',
      enemyBlack2: 'assets/images/enemies/enemyBlack2.png',
      bullet: 'assets/images/enemies/laserRed16.png',
      greenFire: 'assets/images/enemies/greenFire.png',
    },
    stages: {
      first: 'assets/backgrounds/purple.png'
    },
  },
  sounds: {
    menu: 'assets/sounds/menu.mp3',
    gameOver: 'assets/sounds/game-over.mp3',
    shieldDisabled: 'assets/sounds/end_shield.mp3',
    upgradeAdded: 'assets/sounds/upgradeAdded.ogg',
    buttonClicked: 'assets/sounds/buttonClicked.mp3',
    inGame: 'assets/sounds/inGame.mp3',
    bullet: 'assets/sounds/bullet.mp3',
    explosion: 'assets/sounds/explosion.mp3',
    life: 'assets/sounds/life.mp3',
  },
  fonts: {
    guardians: 'assets/fonts/Guardians.ttf',
    orbitron: 'assets/fonts/Orbitron-Bold.ttf'
  }
};

function recursiveLoad(o, method) {
  for (let key in o) {
    if (typeof o[key] == "string") {
      o[key] = method(o[key]);
    } else {
      recursiveLoad(o[key], method);
    }
  }
}

function preload() {
  recursiveLoad(ASSETS.images, loadImage);
  recursiveLoad(ASSETS.sounds, loadSound);
  recursiveLoad(ASSETS.fonts, loadFont);
}