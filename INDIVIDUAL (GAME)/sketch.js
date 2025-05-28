let catcher;
let balls = [];
let score = 0;
let lives = 3;
let gameOver = false;
let restartButton;
let exitButton;
let startButton;
let colors;
let catchSound, gameOverSound;

let gameStarted = false;

const dayBg = [255, 255, 255];
const nightBg = [30, 30, 40];
let transitionProgress = 0;

function preload() {
  catchSound = loadSound("mixkit-explainer-video-game-alert-sweep-236.wav");
  gameOverSound = loadSound("mixkit-funny-game-over-2878.wav");
}

function setup() {
  createCanvas(600, 400);
  catcher = new Catcher();
  colors = [color("#FF6B6B"), color("#FFD93D"), color("#6BCB77"), color("#4D96FF"), color("#BC6FF1")];

  startButton = createButton("Start Game");
  startButton.position(width / 2 - 50, height / 2 + 20);
  startButton.size(100, 40);
  startButton.style("font-size", "18px");
  startButton.mousePressed(startGame);

  restartButton = createButton("Restart");
  restartButton.position(width / 2 - 90, height / 2 + 30);
  restartButton.size(80, 35);
  restartButton.style("font-size", "16px");
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  exitButton = createButton("Exit");
  exitButton.position(width / 2 + 20, height / 2 + 30);
  exitButton.size(80, 35);
  exitButton.style("font-size", "16px");
  exitButton.mousePressed(exitToStart);
  exitButton.hide();
}

function draw() {
  let target = score < 15 ? 0 : 1;
  transitionProgress = lerp(transitionProgress, target, 0.02);
  let bgColor = lerpColor(color(dayBg[0], dayBg[1], dayBg[2]), color(nightBg[0], nightBg[1], nightBg[2]), transitionProgress);
  background(bgColor);

  if (!gameStarted) {
    drawStartScreen();
  } else if (!gameOver) {
    drawSun(1 - transitionProgress);
    drawMoon(transitionProgress);
    fill(lerpColor(color(50), color(200), transitionProgress));
    drawGame();
  } else {
    drawSun(1 - transitionProgress);
    drawMoon(transitionProgress);
    fill("#FF6B6B");
    drawGameOverScreen();
  }
}

function drawStartScreen() {
  fill("#4D96FF");
  textSize(48);
  textAlign(CENTER, CENTER);
  text("TIME PASS", width / 2, height / 2 - 40);
}

function drawGame() {
  textSize(18);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Lives: " + lives, 10, 35);

  catcher.update();
  catcher.show();

  if (frameCount % 40 === 0) {
    balls.push(new FallingBall());
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    balls[i].update();
    balls[i].show();

    if (catcher.catch(balls[i])) {
      catchSound.play();
      balls.splice(i, 1);
      score++;
    } else if (balls[i].y > height) {
      balls.splice(i, 1);
      lives--;
      if (lives <= 0) {
        gameOverSound.play();
        gameOver = true;
        restartButton.show();
        exitButton.show();
      }
    }
  }
}

function drawGameOverScreen() {
  textSize(36);
  textAlign(CENTER);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2);
}

function startGame() {
  gameStarted = true;
  startButton.hide();
  score = 0;
  lives = 3;
  balls = [];
  gameOver = false;
  restartButton.hide();
  exitButton.hide();
  transitionProgress = 0;
}

function restartGame() {
  score = 0;
  lives = 3;
  balls = [];
  gameOver = false;
  restartButton.hide();
  exitButton.hide();
  transitionProgress = 0;
}

function exitToStart() {
  gameStarted = false;
  gameOver = false;
  restartButton.hide();
  exitButton.hide();
  startButton.show();
  transitionProgress = 0;
}

class Catcher {
  constructor() {
    this.w = 100;
    this.h = 20;
  }

  update() {
    this.x = constrain(mouseX, 0, width - this.w);
    this.y = height - this.h - 10;
  }

  show() {
    fill("#444");
    rect(this.x, this.y, this.w, this.h, 12);
  }

  catch(ball) {
    return (
      ball.y + ball.r > this.y &&
      ball.x > this.x &&
      ball.x < this.x + this.w
    );
  }
}

class FallingBall {
  constructor() {
    this.x = random(width);
    this.y = -20;
    this.r = 15;
    this.speed = random(2, 5);
    this.col = random(colors);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}

function drawSun(alpha) {
  push();
  translate(width - 70, 70);
  noStroke();
  fill(255, 217, 61, alpha * 255);
  ellipse(0, 0, 80, 80);
  stroke(255, 217, 61, alpha * 255);
  strokeWeight(3);
  for (let i = 0; i < 12; i++) {
    let angle = TWO_PI / 12 * i;
    let x1 = cos(angle) * 45;
    let y1 = sin(angle) * 45;
    let x2 = cos(angle) * 65;
    let y2 = sin(angle) * 65;
    line(x1, y1, x2, y2);
  }
  pop();
}

function drawMoon(alpha) {
  push();
  translate(width - 70, 70);
  noStroke();
  fill(230, 230, 230, alpha * 255);
  ellipse(0, 0, 70, 70);
  fill(30, 30, 40, alpha * 255);
  ellipse(15, 0, 70, 70);
  pop();
}
