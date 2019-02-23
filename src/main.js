import 'phaser';
import Game from './scenes/game';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [
    Game,
  ]
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
