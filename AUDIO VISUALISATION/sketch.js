let sounds = [];
let fft;
let currentIndex = 0;
let soundNames = ['Burgundy - Flicker (freetouse.com).mp3'];
let bgHue = 0;

function preload() {
  for (let name of soundNames) {
    sounds.push(loadSound(name));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fft = new p5.FFT();
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");

  let bgColor = map(bass, 0, 255, 40, 80);
  let bgHueOffset = map(sin(frameCount * 0.01), -1, 1, 0, 360);
  background((bgHueOffset + frameCount) % 360, 30, bgColor);

  ambientLight(150);
  directionalLight(255, 255, 255, 0, 0, -1);

  let bubbleScale = map(bass, 0, 255, 0.8, 2.2);

  for (let i = -1; i <= 1; i++) {
    push();
    let x = i * 200;
    translate(x, 0, 0);
    rotateY(frameCount * 0.01 + i);
    rotateX(frameCount * 0.01);
    scale(bubbleScale);
    fill((frameCount * 5 + i * 60) % 360, 40, 100);
    sphere(60);
    pop();
  }

  push();
  resetMatrix();
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text(`Now Playing: ${soundNames[currentIndex]} (Click to Play, Press 1–4)`, width / 2, 30);
  pop();
}

function mousePressed() {
  if (!sounds[currentIndex].isPlaying()) {
    sounds[currentIndex].loop();
    fft.setInput(sounds[currentIndex]);
  }
}

function keyPressed() {
  let index = parseInt(key) - 1;
  if (index >= 0 && index < sounds.length) {
    sounds[currentIndex].stop();
    currentIndex = index;
    sounds[currentIndex].loop();
    fft.setInput(sounds[currentIndex]);
  }
}
