class HelpMenu {
  constructor() {
    this.background = ASSETS.images.menus.mainMenu;
    this.finalTextPosition = {
      x: width / 2,
      y: height / 3
    };
    this.currentTextPosition = this.finalTextPosition;
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
    text("Azure Star", this.currentTextPosition.x + offsetX, this.currentTextPosition.y + offsetY);
    stroke(colors.BLACK);
    fill(colors.RED);
    text("Azure Star", this.currentTextPosition.x, this.currentTextPosition.y);
    
    fill(color(255, 255, 255));
    textFont(ASSETS.fonts.orbitron);
    textSize(30);
    text("Use as setas ou WASD para controlar", width / 2, height - (height / 2));
    text("Atire com a tecla ESPAÇO", width / 2, height - (height / 2.3));
    text("Pause o jogo com a tecla ENTER", width / 2, height - (height / 2.7));
    
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
        this.backToMenu();
      }
    }
  }

  createButtons() {
    this.backButton = createButton('Voltar');
    this.backButton.center('horizontal')
    this.backButton.addClass('botao-tela-inicial')
    this.backButton.position(width / 2 - this.backButton.size().width / 2, height - (height / 4));
    this.backButton.mousePressed(() => this.transitionStart(this.backToMenu) );
  }

  transitionStart() {
    ASSETS.sounds.buttonClicked.play();
    this.backButton.remove();
    this.state = "transitionStarted"
  }

  backToMenu() {
    initialMenu = new Menu("initial");
    currentState = 0;
  }
}