let words = [];
let quote = "WelCOme tO BsU.";

function setup() {
  createCanvas(1000, 1000);
  textFont("Courier New");
  textSize(30);
  angleMode(DEGREES);
  let angleStep = 360 / quote.split(" ").length;
  let radius = 200;
  for (let i = 0; i < quote.split(" ").length; i++) {
    let w = quote.split(" ")[i];
    let angle = i * angleStep;
    words.push(new Word(w, width / 2, height / 2, angle, radius));
  }
}

function draw() {
  background('#001f3f');
  translate(width / 2, height / 2);

  for (let word of words) {
    word.update();
    word.display();
  }
}

class Word {
  constructor(text, cx, cy, angle, radius) {
    this.text = text;
    this.cx = cx;
    this.cy = cy;
    this.angle = angle;
    this.radius = radius;
    this.speed = random(0.2, 0.5);
    this.size = random(24, 40);
    this.color = color(random(150, 255), random(100, 200), random(255));
  }

  update() {
    this.angle += this.speed;
    let rad = this.radius + sin(frameCount + this.angle * 2) * 10;
    this.x = cos(this.angle) * rad;
    this.y = sin(this.angle) * rad;
  }

  display() {
    fill(this.color);
    textAlign(CENTER, CENTER);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    textSize(this.size);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = this.color;
    text(this.text, 0, 0);
    drawingContext.shadowBlur = 0;
    pop();
  }

  isHovered(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    return d < textWidth(this.text) / 2;
  }
}
