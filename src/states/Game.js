/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

var bmd;
var circle;

var colors;
var i = 0;
var p = null;

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    colors = Phaser.Color.HSVColorWheel();

    //  Create a Circle
    circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 500);

    //  Create a BitmapData just to plot Circle points to
    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();

    //  And display our circle on the top
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(1, 0x00ff00, 1);
    graphics.drawCircle(circle.x, circle.y, circle.diameter);

    p = new Phaser.Point();
  }

  update() {
    for (var c = 0; c < 10; c++)
    {
        circle.random(p);

        //  We'll floor it as setPixel needs integer values and random returns floats
        p.floor();

        bmd.setPixel(p.x, p.y, colors[i].r, colors[i].g, colors[i].b);
    }
    
    i = game.math.wrapValue(i, 1, 359);
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.mushroom, 32, 32)

    //   this.game.debug.geom(circle,'#cfffff');
    //   this.game.debug.text('Diameter : '+circle.diameter,50,200);
    //   this.game.debug.text('Circumference : '+circle.circumference(),50,230);
    // }
  }
}
