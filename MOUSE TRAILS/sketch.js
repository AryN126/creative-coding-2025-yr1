let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  background(10);
}

function draw() {
  fill(10, 20);
  noStroke();
  rect(0, 0, width, height);

  let t = {
    x: mouseX,
    y: mouseY,
    r: random(10, 30),
    col: color(random(100, 255), random(100, 255), random(100, 255), 150)
  };
  trail.push(t);

  if (trail.length > 100) trail.shift();

  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];
    fill(t.col);
    noStroke();
    ellipse(t.x + random(-2, 2), t.y + random(-2, 2), t.r);
  }
}

