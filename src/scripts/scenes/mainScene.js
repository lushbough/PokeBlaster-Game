import PhaserLogo from '../objects/phaserLogo'
import FpsText from '../objects/fpsText'
import preloadScene from './preloadScene'
import { Scene } from 'phaser'
import Bullet from '../objects/Bullet'
import Bullets from '../objects/Bullets'


export default class MainScene extends Scene {
  fpsText


  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    /**
     * Delete all the code below to start a fresh scene
     */
    this.fpsText = new FpsText(this)
    this.map = this.make.tilemap({key: 'map'})

    const tileset = this.map.addTilesetImage('tileset-main', 'tiles')
    const belowLayer = this.map.createStaticLayer('floor', tileset, 0, 0)
    const worldLayer = this.map.createStaticLayer('top', tileset, 0, 0)
    const objectsLayer = this.map.createStaticLayer('objects', tileset, 0, 0)

    this.player = this.physics.add.sprite(200, 200, 'ash', 6);
    this.bullets = new Bullets(this);


    worldLayer.setCollisionByProperty({
      collided: true
    })

    this.physics.world.bounds.width = this.map.widthInPixels
    this.physics.world.bounds.height = this.map.heightInPixels
    this.physics.add.collider(this.player, worldLayer)
    this.physics.add.collider(this.bullets, worldLayer, function(bullets, worldLayer) {
      bullets.setActive(false)
      bullets.setVisible(false)
      // this.map.removeTileAt(bullets.body.x, bullets.body.y)
    }, null, this);

    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)

    this.cameras.main.startFollow(this.player, true, 0.8, 0.8)

    this.cursors = this.input.keyboard.createCursorKeys();


    this.input.keyboard.on('keydown-' + 'X', (pointer) => {

      this.bullets.fireBullet(this.player.x, this.player.y);

    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ash', { start: 6, end: 8}),
      frameRate: 15,
      repeat: -1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ash', { start: 6, end: 8 }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('ash', { start: 0, end: 2 }),
      frameRate: 15,
      repeat: -1
    })
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('ash', { start: 3, end: 5 }),
      frameRate: 15,
      repeat: -1
    })
  }

  update(time, delta) {
    this.fpsText.update()

    this.player.body.setVelocity(0);
    const speed = 100;


    if (this.cursors.left.isDown)
    {
      this.player.flipX = false;
      this.player.anims.play('left', true);
      this.player.body.setVelocityX(-speed);

    }
    else if (this.cursors.right.isDown)
    {
      this.player.flipX = true;
      this.player.anims.play('right', true);
      this.player.body.setVelocityX(speed);


    }
    else if (this.cursors.up.isDown)
    {
      this.player.anims.play('up', true);
      this.player.body.setVelocityY(-speed);

    }
    else if (this.cursors.down.isDown)
    {
      this.player.anims.play('down', true);
      this.player.body.setVelocityY(speed);

    }
    else
    {
      this.player.anims.stop();
    }


      // if (this.map.getTileAtWorldXY(this.player.x, this.player.y, true, this.cameras.main, 'floor').index === 8) {
      //   this.player.setPosition(200, 200)
      //   console.log('ok')
      // }


  }


}
