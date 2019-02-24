// import AnimationManager from 'phaser';

class Player {
  constructor (sprite) {
    // Phaser.Physics.Arcade.Sprite
    this.sprite = sprite;
    this.nextX = sprite.body.x + 100;
    this.lastX = sprite.body.x - 100;
    this.initialize();
  }

  initialize () {
    // Physics
    this.sprite.setCollideWorldBounds(true);

    // Animations
    const animation = this.sprite.anims.animationManager;
    animation.create({
      key: 'left',
      frames: animation.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    animation.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
    });
    animation.create({
      key: 'right',
      frames: animation.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    
    // Controls
    const keyboard = this.sprite.scene.input.keyboard;
    keyboard.on('keydown_D', () => {
      this.sprite.setVelocity(160, 0);
      this.sprite.anims.play('right', true);
    });
    keyboard.on('keydown_A', () => {
      this.sprite.setVelocity(-160, 0);
      this.sprite.anims.play('left', true);
    })
  }

  move (keys) {
    if (this.sprite.body.x > this.nextX || this.sprite.body.x < this.lastX) {
      this.sprite.setVelocity(0, 0);
      this.sprite.anims.play('turn');
      this.lastX = this.sprite.body.x - 100;
      this.nextX = this.sprite.body.x + 100;
    }
  }
}

export default Player;