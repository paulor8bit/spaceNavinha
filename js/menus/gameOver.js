class GameOver {
  constructor() {
    this.background = ASSETS.images.menus.gameOver;
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
    text("Game Over", this.currentTextPosition.x + offsetX, this.currentTextPosition.y + offsetY);
    stroke(colors.BLACK);
    fill(colors.RED);
    text("Game Over", this.currentTextPosition.x, this.currentTextPosition.y);
    
    fill(color(255, 255, 255));
    textFont(ASSETS.fonts.orbitron);
    textSize(30);
    text(`Você fez ${hud.score} pontos`, width / 2, height - (height / 2.3));
    
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
    this.restartButton = createButton('Reiniciar');
    this.restartButton.center('horizontal')
    this.restartButton.addClass('botao-tela-inicial')
    this.restartButton.position(width / 2 - this.restartButton.size().width / 2, height - (height / 4));
    this.restartButton.mousePressed(() => this.transitionStart(this.backToMenu) );
  }

  transitionStart() {
    ASSETS.sounds.buttonClicked.play();
    this.restartButton.remove();
    this.state = "transitionStarted"
  }

  backToMenu() {
    player.reset();
    gameOver = new GameOver();
    initialMenu.startGame();
  }
}