import 'phaser';
import { tileDimensions, gameScale } from '../constants';
import Player from '../objects/player';

class Game extends Phaser.Scene {
  constructor () {
    super();
    this.player;
    this.keys;
  }

  preload () {
    this.load.image('tile', 'assets/gridSquare.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 40 });
    this.load.image('first_tileset', 'assets/tilesets/first_tileset.png');
    this.load.tilemapTiledJSON("first_map", "../assets/maps/first_map.json");
  }

  createGrid (numX, numY) {
    const game = this.sys.game;
    const tileWidth = game.textures.get('tile').source[0].width;
    const tileHeight = game.textures.get('tile').source[0].height;
    const tileSpriteWidth = numX * tileWidth;
    const tileSpriteHeight = numY * tileHeight;

    const scaleX = 1 / ((numX * tileWidth) / game.canvas.width);
    const scaleY = 1 / ((numY * tileHeight) / game.canvas.height);

    let tileSprite = this.add.tileSprite(
      (tileSpriteWidth / 2) * scaleX,
      (tileSpriteHeight / 2) * scaleY,
      tileSpriteWidth,
      tileSpriteHeight,
      'tile',
    );
    tileSprite.scaleX = scaleX;
    tileSprite.scaleY = scaleY;
  }

  create () {
    // zoom camera in to effectively set scale of tiles
    this.cameras.main.zoom = gameScale;
    const map = this.make.tilemap({ key: 'first_map' });
    const tileset = map.addTilesetImage("first_tileset", "first_tileset");
    const simpleLayer = map.createStaticLayer("layer_1", tileset, 0, 0); // eslint-disable-line no-unused-vars
    // Start player in the specified tile on the map (in this case the center) and set their step distance to the length of a tile
    const startingTileX = 16;
    const startingTileY = 12;
    const playerStartX = (startingTileX * tileDimensions.tilePixalCount) - (tileDimensions.tilePixalCount / 2);
    const playerStartY = (startingTileY * tileDimensions.tilePixalCount) - (tileDimensions.tilePixalCount / 2);
    this.player = new Player(this.add.sprite(playerStartX, playerStartY, 'dude'), tileDimensions.tilePixalCount, tileDimensions.tilePixalCount);
    // Scale sprite to whatever looks best
    this.player.sprite.setScale(0.65);

    this.cameras.main.startFollow(this.player.sprite);

    this.keys = this.input.keyboard.addKeys('W,S,A,D');
  }

  update () {
    this.player.continueMovement(this.keys);
  }
}

export default Game;
