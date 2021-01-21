export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'bullet')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.checkWorldBounds = true;
  }

  fire(x,y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityY(-300);
    this.setVelocityX(100)
  }

  preUpdate (time, delta)
  {
    super.preUpdate(time, delta);

    if (this.y <= 0)
    {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}


