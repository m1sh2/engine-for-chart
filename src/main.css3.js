

class CSS3 {

  constructor() {
    this.cnt = $('#content_css3');
  }

  init() {
    const xAxis = $('<div class="axis axis-x"/>');
    const yAxis = $('<div class="axis axis-y"/>');

    this.cnt.append(xAxis);
    this.cnt.append(yAxis);

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
  }
}

export const css3 = new CSS3();
