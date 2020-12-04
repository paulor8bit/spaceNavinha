class Menu {
  constructor(menuClass) {
    this.class = menuClass;
    this.finalTextPosition = {
      x: width / 2,
      y: height / 3
    };
    this.currentTextPosition = {
      x: width / 2,
      y: 0
    };
    this.createdButtons = false;
    this.alphaFade = 0;
    this.state = "name";
  }

  draw() {
    textAlign(CENTER);
    if (this.background === undefined) this.background = this._getImage(this.class);
    image(this.background, 0, 0, width, height);
    let white = color(255, 255, 255);
    white.setAlpha(100);
    fill(white);
    rect(0, 0, width, height);
    strokeWeight(3);
    stroke(colors.BLACK);
    textSize(width / 15);
    textFont(ASSETS.fonts.guardians);
    if (this.finalTextPosition.y > this.currentTextPosition.y) {
      this.currentTextPosition.y += 5;
    }
    let fadeBlack = color(0, 0, 0);
    fadeBlack.setAlpha(128);
    noStroke();
    fill(fadeBlack);
    let offsetX = ((width - mouseX) / width * 5);
    let offsetY = ((height - mouseY) / height * 5);
    text("Space Navinha", this.currentTextPosition.x + offsetX, this.currentTextPosition.y + offsetY)
    fill(colors.RED);
    stroke(colors.BLACK);
    text("Space Navinha", this.currentTextPosition.x, this.currentTextPosition.y)
    if (this.finalTextPosition.y <= this.currentTextPosition.y) {
      if (!this.createdButtons) {
        this.createButtons();
        this.createdButtons = true;
      }
    }
    if (this.state == "transitionStarted") {
      let fade = color(0, 0, 0);
      fade.setAlpha(this.alphaFade);
      fill(fade);
      rect(0, 0, width, height);
      if (this.alphaFade < 255) {
        this.alphaFade += 3;
      }
      if (this.alphaFade >= 255) {
        this.onComplete();
      }
    }
  }

  _getImage(menuClass) {
    switch (this.class) {
      case "initial":
        return ASSETS.images.menus.mainMenu;
      case "gameOver":
        return ASSETS.images.menus.gameOver;
    }
  }

  createButtons() {
    switch (this.class) {
      case "initial":
        this.startButton = createButton('Iniciar');
        this.startButton.center('horizontal')
        this.startButton.addClass('botao-tela-inicial')
        this.startButton.position(width / 2 - this.startButton.size().width / 2, height / 2);
        this.startButton.mousePressed(() => this.transitionStart(this.startGame));

        this.helpButton = createButton('Como jogar');
        this.helpButton.center('horizontal')
        this.helpButton.addClass('botao-tela-inicial')
        this.helpButton.position(width / 2 - this.helpButton.size().width / 2, (height / 2) + 1.5 * this.helpButton.size().height);
        this.helpButton.mousePressed(() => this.transitionStart(this.showHelp) );
        break;
      case "gameOver":
        break;
    }
  }

  transitionStart(onComplete) {
    ASSETS.sounds.buttonClicked.play();
    this.startButton.remove();
    this.helpButton.remove();
    this.state = "transitionStarted"
    this.onComplete = onComplete;
  }
  
  changeState(state) {
    currentState = state;
  }
  
  showHelp() {
    helpMenu = new HelpMenu();
    currentState = 2;
  }

  startGame() {
    if (!ASSETS.sounds.menu.isPaused()) 
      ASSETS.sounds.menu.pause();
    if (!ASSETS.sounds.inGame.isLooping()) {
      ASSETS.sounds.inGame.setVolume(0.5);
      ASSETS.sounds.inGame.loop();
    }
    textFont(ASSETS.fonts.orbitron);
    strokeWeight(1);
    reset();
    currentState = 1;
  }
}