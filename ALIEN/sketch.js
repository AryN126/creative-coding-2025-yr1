let tentacleAngle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(10, 10, 30);
  translate(width / 2, height / 2);
  drawAlien();
  tentacleAngle += 2;
}

function drawAlien() {
  push();
  fill(100, 0, 200);
  beginShape();
  vertex(0, -60);
  bezierVertex(60, -80, 60, 40, 0, 60);
  bezierVertex(-60, 40, -60, -80, 0, -60);
  endShape(CLOSE);
  pop();

  push();
  fill(255, 255, 200);
  ellipse(0, -20, 30, 30);
  fill(0);
  ellipse(0, -20, 10, 10);
  pop();

  push();
  stroke(100, 0, 200);
  strokeWeight(4);
  noFill();
  for (let i = -2; i <= 2; i++) {
    push();
    translate(i * 20, 60);
    beginShape();
    for (let y = 0; y < 40; y += 5) {
      let x = sin(tentacleAngle + y * 5 + i * 20) * 5;
      vertex(x, y);
    }
    endShape();
    pop();
  }
  pop();

  push();
  noStroke();
  fill(200, 0, 255, 60);
  ellipse(0, -70, 120, 30);
  pop();
}
