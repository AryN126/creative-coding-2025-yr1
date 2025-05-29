let img;
let imgCopy;

function preload() {
  img = loadImage('https://plus.unsplash.com/premium_photo-1667099522743-6b233d408465?q=80&w=1470&auto=format&fit=crop');
}

function setup() {
  createCanvas(img.width, img.height);
  background(255);
  imgCopy = createImage(img.width, img.height);
  img.copy(0, 0, img.width, img.height, 0, 0, img.width, img.height);
  img.loadPixels();
}

function draw() {
  let x = floor(random(img.width));
  let y = floor(random(img.height));
  let i = (x + y * img.width) * 4;
  let r = img.pixels[i];
  let g = img.pixels[i + 1];
  let b = img.pixels[i + 2];

  fill(r, g, b);
  noStroke();
  ellipse(x, y, 5, 5);
}
