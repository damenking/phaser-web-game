import 'phaser';
import { tileDimensions, gameScale } from './constants';
import Game from './scenes/game';



const config = {
  type: Phaser.AUTO,
  width: tileDimensions.viewportTileCountX * tileDimensions.tilePixalCount * gameScale,
  height: tileDimensions.viewportTileCountY * tileDimensions.tilePixalCount * gameScale,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [
    Game,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars
