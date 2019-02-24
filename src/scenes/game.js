import 'phaser';
// import Location from '../objects/location';
import Player from '../objects/player';
class Game extends Phaser.Scene {
  constructor () {
    super();
    this.player;
    this.stars;
    this.bombs;
    this.platforms;
    this.cursors;
    this.score = 0;
    this.gameOver = false;
    this.scoreText;
  }

  preload () {
    this.load.image('tile', 'assets/gridSquare.png')
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png'); 
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup(); 
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
    const scaleY = 1 / ((numY * tileHeight) / game.canvas.height)
    console.log(scaleX)
    console.log(scaleY)
    let tileSprite = this.add.tileSprite((tileSpriteWidth / 2) * scaleX,
      (tileSpriteHeight / 2) * scaleY,
      tileSpriteWidth,
      tileSpriteHeight,
      'tile')
    
    tileSprite.scaleX = scaleX;
    tileSprite.scaleY = scaleY;
  }

  create () { 

    this.createGrid(26, 20);

    //  A simple background for our game
    //this.add.image(400, 300, 'sky');
    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup(); 
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground'); 
    this.platforms.create(750, 220, 'ground');
    this.player = new Player(this.physics.add.sprite(100, 450, 'dude'));
    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player.sprite, this.platforms);
  }

  update () {
    if (this.gameOver) {
      return;
    }
    this.player.move(this.cursors);

  }
}

export default Game;
