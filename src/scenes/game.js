import 'phaser';
// import Location from '../objects/location';
import Player from '../objects/player';
class Game extends Phaser.Scene {
  constructor () {
    super();
    this.player;
    this.platforms;
    this.keys;
  }

  preload () {
    this.load.image('tile', 'assets/gridSquare.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png'); 
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  createGrid (numX, numY) {
    const game = this.sys.game;
    const tileWidth = game.textures.get('tile').source[0].width;
    const tileHeight = game.textures.get('tile').source[0].height;
    const tileSpriteWidth = numX * tileWidth;
    const tileSpriteHeight = numY * tileHeight;
    console.log(tileSpriteWidth);
    console.log(tileSpriteHeight);
    const scaleX = 1 / ((numX * tileWidth) / game.canvas.width);
    const scaleY = 1 / ((numY * tileHeight) / game.canvas.height);
    console.log(scaleX);
    console.log(scaleY);
    let tileSprite = this.add.tileSprite(
      (tileSpriteWidth / 2) * scaleX,
      (tileSpriteHeight / 2) * scaleY,
      tileSpriteWidth,
      tileSpriteHeight,
      'tile',
    );
    this.xStep = tileWidth * scaleX;
    this.yStep = tileHeight * scaleY;
    tileSprite.scaleX = scaleX;
    tileSprite.scaleY = scaleY;
  }

  create () { 
    this.createGrid(13, 10);
    this.platforms = this.physics.add.staticGroup(); 
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground'); 
    this.platforms.create(750, 220, 'ground');
    this.player = new Player(this.add.sprite(30, 30, 'dude'), this.xStep, this.yStep);
    this.keys = this.input.keyboard.addKeys('W,S,A,D');
  }

  update () {
    if (this.gameOver) {
      return;
    }
    this.player.continueMovement(this.keys);
  }
}

export default Game;
