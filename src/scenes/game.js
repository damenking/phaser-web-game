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
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png'); 
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup(); 
  }

  create () { 
    this.add.image(400, 300, 'sky');
    this.createPlatforms()
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
