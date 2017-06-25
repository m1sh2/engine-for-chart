
let graphicsArr = [];
let data = [];
let h = 0;
let w = 0;
let amount = 0;

class CSS3 {

  constructor() {
    this.cnt = $('#content_css3');
  }

  init() {
    const xAxis = $('<div class="axis axis-x"/>');
    const yAxis = $('<div class="axis axis-y"/>');

    this.cnt.append(xAxis);
    this.cnt.append(yAxis);

    w = xAxis.width();
    h = yAxis.height();

    const formStart = document.getElementById('form_start_css3');
    const btnMove = document.getElementById('btn_move_css3');
    const btnStop = document.getElementById('btn_stop_css3');

    for (let i = 0; i < 10; i++) {
      const tick = $('<div class="axis-tick"/>');
      const label = $('<div class="axis-tick-label"/>');
      const line = $('<div class="axis-tick-line"/>');

      label.html(i + '%');

      tick.append(label);
      tick.append(line);

      xAxis.append(tick);
    }

    for (let i = 0; i < 10; i++) {
      const tick = $('<div class="axis-tick"/>');
      const label = $('<div class="axis-tick-label"/>');
      const line = $('<div class="axis-tick-line"/>');

      label.html(i + '%');

      tick.append(label);
      tick.append(line);

      yAxis.append(tick);
    }

    formStart.onsubmit = e => {
      e.preventDefault();
      this.reset();
      amount = formStart.amount.value;
      data = this.getData();
      this.drawData();
    };

    btnMove.onclick = () => {
      this.startMove();
    };

    btnStop.onclick = () => {
      this.stopMove();
    };

    $(btnStop).hide();

    $('#css_boost').change((e) => {
      if ($('#css_boost').is(':checked')) {
        $('.shape').addClass('css_boost');
      } else {
        $('.shape').removeClass('css_boost');
      }
    });
  }

  drawData() {
    let lastIndex = 0;
    let d;
    for (let i = 0; i < data.length; i++) {
      d = data[i];

      const circle = $('<div class="shape"/>');
      circle.css({
        left: d.x,
        top: d.y,
        width: d.radius,
        height: d.radius
      });

      if ($('#css_boost').is(':checked')) {
        circle.addClass('css_boost');
      }

      graphicsArr.push({
        index: lastIndex,
        obj: circle,
        d: d
      });

      this.cnt.append(circle);

      lastIndex++;
    }
  }

  getData() {
    let data = [];
    for (let i = 0; i < amount; i++) {
      let x = this.rand(0, w - 0);
      let y = this.rand(0, h - 0);
      const radius = this.rand(20, 100);

      if (x + radius > w - 0) {
        x = (w - 0) - radius;
      }

      if (x - radius < 20) {
        x = (20) + radius;
      }

      if (y + radius > h - 10) {
        y = (h - 10) - radius;
      }

      if (y - radius < 20) {
        y = (20) + radius;
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

  startMove() {
    $('.shape').each((i, shape) => {
      const $shape = $(shape);
      let x = this.rand(0, w - 0);
      let y = this.rand(0, h - 0);
      const radius = $shape.height();

      if (x + radius > w - 0) {
        x = (w - 0) - radius;
      }

      if (x - radius < 20) {
        x = (20) + radius;
      }

      if (y + radius > h - 10) {
        y = (h - 10) - radius;
      }

      if (y - radius < 20) {
        y = (20) + radius;
      }

      $shape.css({
        left: x + 'px',
        top: y + 'px'
      });
    });
  }

  stopMove() {

  }

  reset() {
    this.stopMove();
    data = [];
    graphicsArr = [];
    this.cnt.html('');
    this.init();
  }

  rand(from, to) {
    return Math.floor(Math.random() * to) + from;
  }
}

export const css3 = new CSS3();
