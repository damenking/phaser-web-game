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
    this.load.spritesheet('dude', 'assets/sprites/dude.png', { frameWidth: 32, frameHeight: 40 });
    this.load.image('first_tileset', 'assets/tilesets/first_tileset.png');
    this.load.image('tileHighlight', 'assets/sprites/tileHighlight.png');
    this.load.image('tileHighlight2', 'assets/sprites/tileHighlight2.png');
    this.load.image('blackTile', 'assets/sprites/black.png');
    this.load.image('blank', 'assets/sprites/blank.png');
    this.load.tilemapTiledJSON("first_map", "assets/maps/first_map.json");
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

  beginCombat (utilityLayer) {
    utilityLayer.forEach((sprite) => {
      sprite.emit('startCombat');
      sprite.y += 32;
      sprite.setData({ xTile: (sprite.x + 16) / 32, yTile: (sprite.y + 16) / 32 });
      sprite.setInteractive();
      sprite.renderFlags = 15;
      sprite.on('pointerover', () => {
        sprite.setAlpha(1);
      });
      sprite.on('pointerout', () => {
        sprite.setAlpha(0);
        sprite.renderFlags = 15;
      });
    });
  }

  create () {
    // zoom camera in to effectively set scale of tiles
    this.cameras.main.zoom = gameScale;
    const map = this.make.tilemap({ key: 'first_map' });
    const tileset = map.addTilesetImage("first_tileset", "first_tileset");
    const simpleLayer = map.createStaticLayer("TerrainLayer", tileset, 0, 0); // eslint-disable-line no-unused-vars
    const utilityLayer = map.createFromObjects("UtilityLayer", 'utility_tile', { key: 'tileHighlight2', alpha: 0 });
    const eventLayer = map.createFromObjects("Events", 'combat_tile', { key: 'tileHighlight2', alpha: 0 });

    map.findObject('Positions', (positionObj) => {
      if (positionObj.name === 'player_start') {
        this.player = new Player(
          this.add.sprite(positionObj.x, positionObj.y, 'dude'),
          tileDimensions.tilePixalCount,
          tileDimensions.tilePixalCount
        );
        // Scale sprite to whatever looks best
        this.player.sprite.setScale(0.65);
        // Set camera to follow player sprite
        this.cameras.main.startFollow(this.player.sprite);
      }
    });
    
    eventLayer.forEach((sprite) => {
      sprite.y += 32;
      const xTile = (sprite.x + 16) / 32;
      const yTile = (sprite.y + 16) / 32;
      sprite.setData({ xTile, yTile });
      sprite.setInteractive();
      sprite.renderFlags = 15;
      this.events.on(`playerOn${xTile}X${yTile}Y`, () => {
        console.log('firing');
        this.beginCombat(utilityLayer);
      });
    });

    utilityLayer.forEach((sprite) => {
      sprite.y += 32;
      sprite.setData({ xTile: (sprite.x + 16) / 32, yTile: (sprite.y + 16) / 32 });
      sprite.setInteractive();
      sprite.renderFlags = 15;
    });
    this.keys = this.input.keyboard.addKeys('W,S,A,D');
  }

  update () {
    this.player.continueMovement(this.keys);
  }
}

export default Game;
