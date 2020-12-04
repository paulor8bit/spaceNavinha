let currentStage, player, boundaries,
  showHelp, hud, timeReference,
  colors, initialMenu, gameStates, currentState, helpMenu, gameOver;

let enemies = [],
  playerBullets = [],
  enemyBullets = [],
  upgrades = [];

let upgradeTimeout = 0,
  gameOverSaid = false,
  ready = false,
  debug = false,
  running = false;