let img;

function preload() {
  img = loadImage('https://plus.unsplash.com/premium_photo-1667099522743-6b233d408465?q=80&w=1470&auto=format&fit=crop');
}

function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  
  let levels = 4;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let index = (x + y * img.width) * 4;
      for (let i = 0; i < 3; i++) {
        let c = img.pixels[index + i];
        img.pixels[index + i] = floor(c / 255 * levels) * floor(255 / (levels - 1));
      }
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}
