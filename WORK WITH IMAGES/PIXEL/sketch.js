let img;

function preload() {
  img = loadImage('https://plus.unsplash.com/premium_photo-1667099522743-6b233d408465?q=80&w=1470&auto=format&fit=crop');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index + 0];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let gray = (r + g + b) / 3;
      img.pixels[index + 0] = gray;
      img.pixels[index + 1] = gray;
      img.pixels[index + 2] = gray;
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}
