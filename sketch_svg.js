
var A = {r: 100, l: 400, cx: 200, cy: 500, incr: 0.00066*3};
var B = {r: 150, l: 600, cx: 800, cy: 550, incr: 0.0020*3};
var sliders = {};
var l = 0;
var c1;
var c2;
var bg = false;

let cvs;

var sent = "CODING FOR ARTISTS"
function setup() {

  cvs = SVG().addTo('main').size(windowWidth, windowWidth); //set canvas to window size;
  //document.getElementById('saver').onclick = function () { saveData(cvs.svg(), 'svg.svg') };
  c1 = color(0, 0, 0);
  c2 = color(255, 0, 0, 100);
  noLoop();
}

function draw() {
  //redraw background between frames depending on user preference


  var line = cvs.line(0, 0, 100, 150);
  var a, b, p, l_p;

  //if background, redraw every frame so far
  // if(bg){
  //   f_min = 0;
  // } else {
  //   f_min = frameCount;
  // }
  f_min = 0;
var steps = 75000;
  for (var f = f_min; f <= steps; f++) {
    var clr = lerpColor(color(c1), color(c2), f/steps)
    a = spin(f * A.incr + random()*0.03 -0.0015, A.r, { x: A.cx, y: A.cy });
    b = spin(f* B.incr + random()*0.03 - 0.0015, B.r, { x: B.cx, y: B.cy }, false);
    p = penPoint(a, b, A.l, B.l);
    //cvs.ellipse(1, 1).fill('#f06').move(p.x, p.y);

    //cvs.line(b.x, b.y, p.x, p.y).stroke({ width: 1, color: clr});
    try{
      line = cvs.line(l_p.x, l_p.y, p.x, p.y).stroke({ width: 1, color: clr});
      line.plot(l_p.x, l_p.y, p.x, p.y);
    } catch { }
    //line = cvs.line(a.x, a.y, p.x, p.y).stroke({ width: 1, color: clr });

    l_p = p;
  }

  // if(bg){ //BG version
  //   //draw wheels if background
  //   ellipse(A.cx, A.cy, A.r*2);
  //   ellipse(B.cx, B.cy, B.r*2);
  //   stroke(clr.levels[0], clr.levels[1], clr.levels[2]); //solid stroke
  // }else{ //no bg version
  //   stroke(clr.levels[0], clr.levels[1], clr.levels[2], 10);
  // }

  //draw legs of pintograph
  // if(bg == false){

  // }

  //possibly add text
  // if (frameCount % 20 == 0) {
  //   var ltr = sent.charAt(l % sent.length);
  //   l++;
  // }


}

//function to make slider ot allow user to manipulate pintogaph parameters
function makeSlider(val, min, max, pos, name){
  if(Number.isInteger(val) == false){
    val*=10000;
    max*=10000;
  }
  slider = createSlider(min, max, val);
  slider.position(pos.x, pos.y);
  text(name, pos.x, pos.y+15)
  slider.style('width', '80px');
  return slider;
}

//returns distance between points a and b
function distance(a, b) {
  return sqrt(pow(a.x - b.x, 2) + pow(a.y - b.y, 2));
}

//function to spin circle
function spin(f, r, ctr) {
  var x = r * cos(f) + ctr.x;
  var y = r * sin(f) + ctr.y;
  return { x: x, y: y };
}

//derive pintograph point
function penPoint(a, b, A, B) {
  var c = a.x;
  var d = a.y;
  var e = b.x;
  var f = b.y;
  var x = (-4 * pow(A, 2) * c + 4 * e * pow(A, 2) + sqrt(pow((4 * pow(A, 2) * c - 4 * e * pow(A, 2) - 4 * pow(B, 2) * c +
    4 * e * pow(B, 2) -
    4 * pow(c, 3) + 4 * e * pow(c, 2) - 4 * c * pow(d, 2) + 8 * c * d * f -
    4 * c * pow(f, 2) + 4 * pow(e, 2) * c - 4 * e * pow(d, 2) + 8 * e * d * f -
    4 * e * pow(f, 2) - 4 * pow(e, 3)), 2) - 4 * (4 * pow(c, 2) - 8 * e * c +
      4 * pow(d, 2) - 8 * d * f + 4 * pow(f, 2) + 4 * pow(e, 2)) * (pow(A, 4) - 2 * pow(A, 2) * pow(B, 2) -
        2 * pow(A, 2) * pow(c, 2) - 2 * pow(A, 2) * pow(d, 2) + 4 * pow(A, 2) * d * f - 2 * pow(A, 2) * pow(f, 2) +
        2 * pow(e, 2) * pow(A, 2) + pow(B, 4) + 2 * pow(B, 2) * pow(c, 2) - 2 * pow(B, 2) * pow(d, 2) +
        4 * pow(B, 2) * d * f - 2 * pow(B, 2) * pow(f, 2) - 2 * pow(e, 2) * pow(B, 2) + pow(c, 4) + 2 * pow(c, 2) * pow(d, 2) -
        4 * pow(c, 2) * d * f + 2 * pow(c, 2) * pow(f, 2) - 2 * pow(e, 2) * pow(c, 2) + pow(d, 4) -
        4 * pow(d, 3) * f + 6 * pow(d, 2) * pow(f, 2) + 2 * pow(e, 2) * pow(d, 2) - 4 * d * pow(f, 3) -
        4 * pow(e, 2) * d * f + pow(f, 4) + 2 * pow(e, 2) * pow(f, 2) + pow(e, 4))) +
    4 * pow(B, 2) * c - 4 * e * pow(B, 2) + 4 * pow(c, 3) - 4 * e * pow(c, 2) + 4 * c * pow(d, 2) -
    8 * c * d * f + 4 * c * pow(f, 2) - 4 * pow(e, 2) * c +
    4 * e * pow(d, 2) - 8 * e * d * f + 4 * e * pow(f, 2) + 4 * pow(e, 3)) / (2 * (4 * pow(c, 2) - 8 * e * c +
      4 * pow(d, 2) - 8 * d * f +
      4 * pow(f, 2) + 4 * pow(e, 2)));



  var y = a.y - sqrt(A * A - a.x * a.x + 2 * a.x * x - x * x);
  return ({ x: x, y: y });
}

//downloads current picture to SVG file in downloads folder
var saveData = (function () {
  var a = document.createElement("a");
  // document.body.appendChild(a);
  // a.style = "display: none";
  return function (data, fileName) {
    var json = data,
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());
//from Wolphram Alpha

//x = (-4 A^2 c + 4 e A^2 + sqrt((4 A^2 c - 4 e A^2 - 4 B^2 c + 4 e B^2 - 4 c^3 + 4 e c^2 - 4 c d^2 + 8 c d f - 4 c f^2 + 4 e^2 c - 4 e d^2 + 8 e d f - 4 e f^2 - 4 e^3)^2 - 4 (4 c^2 - 8 e c + 4 d^2 - 8 d f + 4 f^2 + 4 e^2) (A^4 - 2 A^2 B^2 - 2 A^2 c^2 - 2 A^2 d^2 + 4 A^2 d f - 2 A^2 f^2 + 2 e^2 A^2 + B^4 + 2 B^2 c^2 - 2 B^2 d^2 + 4 B^2 d f - 2 B^2 f^2 - 2 e^2 B^2 + c^4 + 2 c^2 d^2 - 4 c^2 d f + 2 c^2 f^2 - 2 e^2 c^2 + d^4 - 4 d^3 f + 6 d^2 f^2 + 2 e^2 d^2 - 4 d f^3 - 4 e^2 d f + f^4 + 2 e^2 f^2 + e^4)) + 4 B^2 c - 4 e B^2 + 4 c^3 - 4 e c^2 + 4 c d^2 - 8 c d f + 4 c f^2 - 4 e^2 c + 4 e d^2 - 8 e d f + 4 e f^2 + 4 e^3)/(2 (4 c^2 - 8 e c + 4 d^2 - 8 d f + 4 f^2 + 4 e^2))