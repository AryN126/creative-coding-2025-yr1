let countries = [
  { name: "China", emissions: 11280 },
  { name: "USA", emissions: 5000 },
  { name: "India", emissions: 2950 },
  { name: "Russia", emissions: 1720 },
  { name: "Japan", emissions: 1060 },
  { name: "Germany", emissions: 675 },
  { name: "Iran", emissions: 630 },
  { name: "Canada", emissions: 570 }
];

let maxEmission;
let baseRadii = [];

function setup() {
  createCanvas(windowWidth, 600);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100);
  maxEmission = max(countries.map(c => c.emissions));

  for (let i = 0; i < countries.length; i++) {
    baseRadii[i] = map(countries[i].emissions, 0, maxEmission, 30, 120);
  }
}

function draw() {
  background(220);

  fill(0);
  textSize(24);
  text("Pulsating Circles: CO₂ Emissions by Country (2022)", width / 2, 40);

  let spacing = width / (countries.length + 1);

  for (let i = 0; i < countries.length; i++) {
    let x = spacing * (i + 1);
    let y = height / 2;

    // Pulsate radius with sine wave
    let pulse = sin(frameCount * 0.05 + i) * 15;
    let r = baseRadii[i] + pulse;

    fill(map(i, 0, countries.length, 0, 360), 80, 80);
    ellipse(x, y, r * 2);

    fill(0);
    textSize(14);
    text(countries[i].name, x, y + r + 20);
  }
}
