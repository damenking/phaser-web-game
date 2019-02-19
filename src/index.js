import 'phaser';

class Test extends Phaser.Scene {
    preload ()
    {
        this.load.image('logo', 'assets/logo.png');
    }
    create ()
    {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
        });
    }
}
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Test]
};

const game = new Phaser.Game(config);
