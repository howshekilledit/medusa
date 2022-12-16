let circles = [];
function setup(){
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({background:'#fff'});
  let b = 0 //y location


  let bez = []
  let nbez = []

  let count = 0
  //let perms = list(itertools.permutations(range(1,8), 3))
 //bez = newbez(width, width/perms[0][2])
bez = newbez(windowHeight, 50);
let stack = []

let incr = 50;
let dd = 8;
let curldiv = 4;
let filename = "incr"+incr+"diam"+dd+"curl"+curldiv;
let bez_count = 0;
let last_x = 0; 
while (last_x < windowWidth) {
    nbez = nextbez(bez, windowHeight, b);
    for (let l = 0; l < incr; l++) {
        circles.push(new bezprops(bez[0], bez[1], bez[2], bez[3], incr, windowWidth, windowHeight, l, dd, 0.25));
    }
    last_x = circles[circles.length-1].y;

    b = b+width/curldiv;
    bez = nbez;
    bez_count++;
}

}

function draw(){
  var bprops = circles[frameCount];
  //var clr = lerpColor(color('#032edc'), color('#a3e3fe0'), frameCount/circles.length);
  //var strk_clr = lerpColor(color('#a3e3fe0'), color('#032edc'), frameCount/circles.length);
  var clr = '#ffffff';
  var strk_clr = '#000000';
  diam = bprops.diam;
  //diam = map(abs(circles.length/2-frameCount), 0, circles.length/2, 100, 0);
  var ellipse = cvs.ellipse(diam, diam).attr({
    cx: bprops.y, cy: bprops.x+100, opacity: 0.5, fill: clr}).stroke({
      width: 0.05 * diam, color: strk_clr});
  ellipse.mouseover(function() {
    this.fill({ color: '#ff0000' })
  })
  //cvs.attr({x: frameCount});
  //var ellipse = cvs.ellipse(100, 100).attr({cx: frameCount, stroke: '#ff0000', opacity: 0.01, fill: '#0000ff'});

}