function setup() {
  createCanvas(600, 600);
  noStroke();
  colorMode(HSL, 360, 100, 100, 1);
  frameRate(30);
}

function draw() {
  background(0, 0, 95);

  let gridSize = 20;
  let spacing = width / gridSize;

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      let px = x * spacing + spacing / 2;
      let py = y * spacing + spacing / 2;

      let baseHue = (frameCount * 2 + x * 15 + y * 10) % 360;

      let size = map(sin(frameCount * 0.1 + x + y), -1, 1, spacing * 0.3, spacing * 0.8);
      size *= random(0.8, 1.2);

      let saturation = map(sin(frameCount * 0.05 + x * 0.3), -1, 1, 50, 90);
      let brightness = map(cos(frameCount * 0.05 + y * 0.3), -1, 1, 60, 90);

      fill(baseHue, saturation, brightness, 0.8);
      ellipse(px, py, size);
    }
  }
}
