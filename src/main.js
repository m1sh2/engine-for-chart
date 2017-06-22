import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/Boot';
import SplashState from './states/Splash';
import ChartState from './states/Chart';

import $ from 'jquery';

import config from './config';

import { css3 } from './main.css3';

class Chart extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement;
    const width = config.gameWidth * window.devicePixelRatio;
    const height = config.gameHeight * window.devicePixelRatio;

    super(width, height, Phaser.CANVAS, 'content', null);;

    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Chart', ChartState, false);

    this.state.start('Boot');
  }
}

window.chart = new Chart();
window.jQuery = $;

$(document).ready(e => {
  $('#menu a').click(function (e) {
    e.preventDefault();
    const a = this;
    const id = a.href.split('#');
    console.log(id);
    // $(this).tab('show');
    $('.tab-pane').hide();
    $('#' + id[1]).show();
  });

  css3.init();
});
