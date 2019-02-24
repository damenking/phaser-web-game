// import AnimationManager from 'phaser';

class Player {
  constructor (sprite) {
    // Phaser.Physics.Arcade.Sprite
    this.sprite = sprite;
    this.initialize();
  }

  initialize () {
    // Physics
    this.sprite.setBounce(0.2);
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
  }

  move (cursors) {
    if (cursors.left.isDown) {
      this.sprite.setVelocityX(-160);
      this.sprite.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.sprite.setVelocityX(160);
      this.sprite.anims.play('right', true);
    } else if (cursors.up.isDown) {
      this.sprite.setVelocityY(-160);
    } else if (cursors.down.isDown) {
      this.sprite.setVelocityY(160);
    } else {
      this.sprite.setVelocityX(0);
      this.sprite.setVelocityY(0);
      this.sprite.anims.play('turn');
    }
  }
}

export default Player;