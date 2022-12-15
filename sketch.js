let circles = [];
function setup(){
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({background:'#fff'});
  let b = 0 //y location


  let bez = []
  let nbez = []

  let count = 0
  //let perms = list(itertools.permutations(range(1,8), 3))
 //bez = newbez(width, width/perms[0][2])
bez = newbez(width, 50);
let stack = []

let incr = 100;
let dd = 8;
let curldiv = 10;
let filename = "incr"+incr+"diam"+dd+"curl"+curldiv;
let bez_count = 0;
while (bez_count < 10) {
    nbez = nextbez(bez, width, b);
    for (let l = 0; l < incr; l++) {
        circles.push(new bezprops(bez[0], bez[1], bez[2], bez[3], incr, width, height, l, dd));
        //print(bprops.diam);
        //cv2.circle(img, (int(bprops.x), int(bprops.y)), int(bprops.diam+1), (255, 255, 255), thickness=-1);
        //cv2.circle(img, (int(bprops.x), int(bprops.y)), int(bprops.diam), (0, 0, 0), thickness=-1);
    }
    b = b+width/curldiv;
    bez = nbez;
    bez_count++;
}

}

function draw(){
  var bprops = circles[frameCount];
  var ellipse = cvs.ellipse(bprops.diam, bprops.diam).attr({cx: bprops.x, cy: bprops.y, strokeWeight: 3, stroke: '#000', opacity: 0.2, fill: '#fff'});
  cvs.attr({x: frameCount});
  //var ellipse = cvs.ellipse(100, 100).attr({cx: frameCount, stroke: '#ff0000', opacity: 0.01, fill: '#0000ff'});

}