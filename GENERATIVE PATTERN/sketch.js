function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  drawPattern();
}

function draw() {}

function drawPattern() {
  background("#D6D7D3");

  let cols = 10;
  let rows = 10;
  let w = width / cols;
  let h = height / rows * 0.5;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * w;
      let y = j * h * 2;

      drawCube(x + w / 2, y + h / 2, w * 0.8, h * 0.8);
    }
  }
}

function drawCube(cx, cy, w, h) {
  let hw = w / 2;
  let hh = h / 2;

  let topColor = color(random(150, 255), random(150, 255), random(150, 255));
  let leftColor = lerpColor(topColor, color(0), 0.2);
  let rightColor = lerpColor(topColor, color(0), 0.4);

  fill(topColor);
  quad(
    cx, cy - hh,
    cx + hw, cy,
    cx, cy + hh,
    cx - hw, cy
  );

  fill(leftColor);
  quad(
    cx - hw, cy,
    cx, cy + hh,
    cx, cy + hh * 2,
    cx - hw, cy + hh
  );

  fill(rightColor);
  quad(
    cx + hw, cy,
    cx, cy + hh,
    cx, cy + hh * 2,
    cx + hw, cy + hh
  );
}

function mousePressed() {
  drawPattern();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawPattern();
}
