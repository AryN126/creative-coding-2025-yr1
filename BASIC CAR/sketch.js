function setup() {
  createCanvas(600, 200);
  background(220);
  drawCar(200, 100);
}

function drawCar(x, y) {
  noStroke();
  fill(255, 0, 0);
  rect(x, y, 200, 50);
  rect(x + 40, y - 30, 120, 40);
  fill(0);
  ellipse(x + 30, y + 60, 40, 40);
  ellipse(x + 170, y + 60, 40, 40);
  fill(135, 206, 235);
  rect(x + 50, y - 20, 30, 30);
  rect(x + 90, y - 20, 30, 30);
}

