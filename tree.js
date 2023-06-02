let angle;
let len = 100;
let wind;

function setup() {
  createCanvas(710, 400);
  slider = createSlider(0, TWO_PI, PI / 4, 0.01);
  windSlider = createSlider(-PI/8, PI/8, 0, 0.01);
}

function draw() {
  background(51);
  angle = slider.value();
  wind = windSlider.value() + map(noise(frameCount * 0.01), 0, 1, -PI/16, PI/16); // Perlin noise for smooth wind changes
  let trunk = new Branch(createVector(width / 2, height), createVector(width / 2, height - len), len);
  drawTree(trunk, 0);
}

function drawTree(b, depth) {
  b.show();

  if (depth < 10) { // stopping condition, don't go too deep
    let b1 = b.branch(angle + wind);
    let b2 = b.branch(-angle + wind);
    drawTree(b1, depth + 1);
    drawTree(b2, depth + 1);
  }
}

function Branch(begin, end, sz) {
  this.begin = begin;
  this.end = end;
  this.sz = sz;

  this.show = function() {
    stroke(255);
    strokeWeight(map(this.sz, 0, len, 0, 10));
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };

  this.branch = function(angle) {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(angle);
    dir.mult(0.67); // each branch is 2/3 the size of the parent
    let newEnd = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, newEnd, this.sz * 0.67);
    return b;
  };
}
