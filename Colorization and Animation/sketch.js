let ticketX = -120;
let speed = 2;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(24);
  textFont('Arial');
}

function draw() {
  background(255);
  drawGrid();

  ticketX += speed;
  if (ticketX > width + 120) {
    ticketX = -120;
  }

  fill(255, 230, 180);
  stroke(200, 150, 50);
  strokeWeight(3);
  rect(ticketX, 200, 240, 120, 20);

  fill(255);
  noStroke();
  for (let y = 150; y <= 250; y += 20) {
    ellipse(ticketX - 120, y, 15);
  }

  for (let y = 150; y <= 250; y += 20) {
    ellipse(ticketX + 120, y, 15);
  }

  fill(80, 30, 10);
  noStroke();
  textSize(28);
  text("CINEMA", ticketX, 180);
  textSize(20);
  text("TICKET", ticketX, 220);
}

function drawGrid() {
  stroke(200);
  strokeWeight(1);
  for (let x = 0; x <= width; x += 20) {
    line(x, 0, x, height);
  }
  for (let y = 0; y <= height; y += 20) {
    line(0, y, width, y);
  }
}
