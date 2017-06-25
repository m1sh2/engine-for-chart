/* globals __DEV__ */
import Phaser from 'phaser';
import jQuery from 'jquery';

var bmd;
var circle;

var colors;
var i = 0;
var p = null;

var axisX;

var h = 0;
var w = 0;

var graphics;
var graphicsArr = [];
var data = [];
var d;

var shape;
var index;

const r = window.devicePixelRatio;

var isMoving = false;

const formStart = document.getElementById('form_start');
const btnMove = document.getElementById('btn_move');
const btnStop = document.getElementById('btn_stop');

export default class extends Phaser.State {
  init () {
    graphics = this.game.add.graphics(0, 0);
    this.drawAxis();
  }
  preload () {}

  create () {
    colors = Phaser.Color.HSVColorWheel();

    this.game.input.onDown.add(handleClick)
    function handleClick(pointer){
      let shapeSelected;
      for (let i = 0; i < graphicsArr.length; i++) {
        const shape = graphicsArr[i];

        if (!shape) {
          continue
        }

        const isInside = shape.obj.contains(pointer.x * r, pointer.y * r);

        if (isInside) {
          shapeSelected = shape;
          graphics.graphicsData[shape.index].fillAlpha = 0.7;
        } else {
          graphics.graphicsData[shape.index].fillAlpha = 1;
        }
      }
    }

    this.game.input.addMoveCallback(handleHover, this);
    function handleHover(pointer){
      for (let i = 0; i < graphicsArr.length; i++) {
        const shape = graphicsArr[i];
        const isInside = shape.obj.contains(pointer.x * r, pointer.y * r);

        if (isInside) {
          graphics.graphicsData[shape.index].fillAlpha = 0.5;
        } else {
          graphics.graphicsData[shape.index].fillAlpha = 1;
        }
      }
    }

    formStart.onsubmit = e => {
      e.preventDefault();
      this.reset();
      data = this.getData(formStart.amount.value);
      this.drawData();
    };

    btnMove.onclick = () => {
      this.startMove();
    };

    btnStop.onclick = () => {
      this.stopMove();
    };
    jQuery(btnStop).hide();
  }

  update() {
    if (isMoving) {
      for (i = 0; i < graphicsArr.length; i++) {
        index = graphicsArr[i].index;
        d = graphicsArr[i].d;
        shape = graphics.graphicsData[index].shape;

        if (
          shape.x - shape.radius < 40 * r
          || shape.x + shape.radius > w - 20 * r
          || shape.y - shape.radius < 20 * r
          || shape.y + shape.radius > h - 20 * r
        ) {
          continue
        }

        if (d.way === '-') {
          shape.x -= d.dx;
          shape.y -= d.dy;
        } else {
          shape.x += d.dx;
          shape.y += d.dy;
        }
      }
    }
  }

  render() { }

  startMove() {
    isMoving = true;
    jQuery(btnMove).hide();
    jQuery(btnStop).show();
  }

  stopMove() {
    isMoving = false;
    jQuery(btnMove).show();
    jQuery(btnStop).hide();
  }

  drawAxis() {
    graphics.lineStyle(1 * r, 0x333333);
    graphics.moveTo(40 * r, this.game.height - 20 * r);
    graphics.lineTo(this.game.width - 30 * r, this.game.height - 20 * r);

    graphics.lineStyle(1 * r, 0x333333);
    graphics.moveTo(40 * r, 20 * r);
    graphics.lineTo(40 * r, this.game.height - 20 * r);

    h = this.game.height;
    w = this.game.width;
    const ticks = 10;
    const ySize = (h - 40 * r) / ticks;
    const xSize = (w - 70 * r) / ticks;
    const styleTextAxis = {
      font: 'normal ' + (12 * r) + 'px Arial',
      fill: '#333',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    };

    const text = this.game.add.text(20 * r, h - 20 * r, '0%', styleTextAxis);

    // Y Axis
    for (let i = 0; i < ticks; i++) {
      const x1 = 35 * r;
      const x2 = 45 * r;
      const x3 = w - 30 * r;
      const y = ySize * (ticks - i) - 16 * r;

      graphics.lineStyle(1 * r, 0xeeeeee);
      graphics.moveTo(x2, y).lineTo(x3, y);

      graphics.lineStyle(1 * r, 0x333333);
      graphics.moveTo(x1, y).lineTo(x2, y);

      const text = this.game.add.text(0, y - 6 * r, (i + 1) * 10 + '%', styleTextAxis);
    }

    // X Axis
    for (let i = 0; i < ticks; i++) {
      const x = xSize * (i + 1) + 40 * r;
      const y1 = this.game.height - 15 * r;
      const y2 = this.game.height - 25 * r;
      const y3 = 20 * r;

      graphics.lineStyle(1 * r, 0xeeeeee);
      graphics.moveTo(x, y2).lineTo(x, y3);

      graphics.lineStyle(1 * r, 0x333333);
      graphics.moveTo(x, y1).lineTo(x, y2);

      const text = this.game.add.text(x - 8 * r, h - 14 * r, (i + 1) * 10 + '%', styleTextAxis);
    }
  }

  drawData() {
    let lastIndex = graphics.graphicsData.length;
    let d;
    for (let i = 0; i < data.length; i++) {
      d = data[i];
      graphics.lineStyle(1 * r, 0xff0000, 1);
      graphics.beginFill(0xff6666, 1);

      const circle = new Phaser.Circle(d.x, d.y, d.radius);
      circle.inputEnabled = true;
      graphicsArr.push({
        index: lastIndex,
        obj: circle,
        d: d
      });

      graphics.drawCircle(circle.x, circle.y, circle.diameter);
      graphics.endFill();

      lastIndex++;
    }
  }

  getData(amount) {
    let data = [];
    for (let i = 0; i < amount; i++) {
      let x = this.rand(40 * r, w - 30 * r);
      let y = this.rand(20 * r, h - 20 * r);
      const radius = this.rand(20 * r, 100 * r);

      if (x + radius > w - 30 * r) {
        x = (w - 30 * r) - radius;
      }

      if (x - radius < 40 * r) {
        x = (40 * r) + radius;
      }

      if (y + radius > h - 20 * r) {
        y = (h - 20 * r) - radius;
      }

      if (y - radius < 20 * r) {
        y = (20 * r) + radius;
      }

      data.push({
        x: x,
        y: y,
        dx: this.rand(1, 5),
        dy: this.rand(1, 5),
        radius: radius,
        way: ['', '-', '+'][this.rand(1, 2)]
      });
    }
    return data;
  }

  moveData() {

  }

  reset() {
    this.stopMove();
    data = [];
    graphicsArr = [];
    graphics.destroy();
    this.init();
  }

  rand(from, to) {
    return Math.floor(Math.random() * to) + from;
  }
}
