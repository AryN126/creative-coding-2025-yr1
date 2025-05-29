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

let totalEmissions;
let maxEmission;

function setup() {
  createCanvas(windowWidth, 600);
  textFont('Arial');
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100);
  totalEmissions = countries.reduce((sum, c) => sum + c.emissions, 0);
  maxEmission = max(countries.map(c => c.emissions));
  noLoop();
}

function draw() {
  background(230);

  fill(0);
  textSize(24);
  text("CO₂ Emissions by Country (2022)", width / 2, 40);

  let chartHeight = 400;
  let barWidth = 50;
  let spacing = width / (countries.length + 1);

  for (let i = 0; i < countries.length; i++) {
    let x = spacing * (i + 1);
    let h = map(countries[i].emissions, 0, maxEmission, 0, chartHeight);
    let y = height - 100 - h;

    let percent = (countries[i].emissions / totalEmissions) * 100;

    fill(map(i, 0, countries.length, 0, 360), 80, 80);
    rect(x - barWidth / 2, y, barWidth, h);

    fill(0);
    textSize(12);
    text(countries[i].name, x, height - 80);
    text(`${countries[i].emissions} Mt`, x, height - 60);
    text(`${percent.toFixed(1)}%`, x, height - 40);
  }
}
