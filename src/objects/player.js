const MOVEMENTS = {
  right: {
    axis: 'x',
    increasePixels: true,
    animation: 'playerRight',
  },
  left: {
    axis: 'x',
    increasePixels: false,
    animation: 'playerLeft',
  },
  up: {
    axis: 'y',
    increasePixels: false,
    animation: 'playerUp',
  },
  down: {
    axis: 'y',
    increasePixels: true,
    animation: 'playerDown',
  },
};

class Player {
  constructor (sprite, xStep, yStep) {
    this.sprite = sprite;
    this.tweenManager = sprite.scene.tweens;
    this.xStep = xStep;
    this.yStep = yStep;
    this.inMotion = false;
    this.initialize();
  }

  initialize () {
    // Animations
    const animation = this.sprite.anims.animationManager;
    animation.create({
      key: 'playerLeft',
      frames: animation.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    animation.create({
      key: 'playerTurn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20,
    });
    animation.create({
      key: 'playerRight',
      frames: animation.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    animation.create({
      key: 'playerDown',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20,
    });
    animation.create({
      key: 'playerUp',
      frames: [ { key: 'dude', frame: 5 } ],
      frameRate: 20,
    });
    // Listeners
    const keyboard = this.sprite.scene.input.keyboard;
    keyboard.on('keydown_D', () => {
      this.movePlayer(MOVEMENTS.right);
    });
    keyboard.on('keydown_A', () => {
      this.movePlayer(MOVEMENTS.left);
    });
    keyboard.on('keydown_W', () => {
      this.movePlayer(MOVEMENTS.up);
    });
    keyboard.on('keydown_S', () => {
      this.movePlayer(MOVEMENTS.down);
    });
  }

  setInMotion (inMotion) {
    const { W, A, S, D } = this.sprite.scene.keys;
    if (!inMotion && !(W.isDown || A.isDown || S.isDown || D.isDown)) {
      this.sprite.play('playerTurn');
    }
    this.inMotion = inMotion;
  }

  completeMove () {
    const xTile = (this.sprite.x + 16) / 32;
    const yTile = (this.sprite.y + 16) / 32;
    this.sprite.scene.events.emit(`playerOn${xTile}X${yTile}Y`);
    this.setInMotion(false);
  }

  movePlayer ({ axis, increasePixels, animation }) {
    if (!this.inMotion) {
      this.sprite.play(animation);
      const step = axis === 'x' ? this.xStep : this.yStep;
      const newPixelValue = increasePixels ? this.sprite[axis] + step : this.sprite[axis] - step;
      this.tweenManager.add({
        targets: this.sprite,
        [axis]: newPixelValue,
        duration: 500,
        onStart: () => this.setInMotion(true),
        onComplete: () => this.completeMove(),
      });
    }
  }

  continueMovement (keys) {
    if (!this.inMotion){
      if (keys.D.isDown) {
        this.movePlayer(MOVEMENTS.right);
      } else if (keys.A.isDown) {
        this.movePlayer(MOVEMENTS.left);
      } else if (keys.S.isDown) {
        this.movePlayer(MOVEMENTS.down);
      } else if (keys.W.isDown) {
        this.movePlayer(MOVEMENTS.up);
      }
    }
  }
}

export default Player;