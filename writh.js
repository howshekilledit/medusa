let circles = [];
let bez = []; 
let stack = [];
let incr = 100;
let dd = 8;
function setup() {
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({ background: '#fff' });
  let b = 0 //y location



  let nbez = []

  let count = 0
  //let perms = list(itertools.permutations(range(1,8), 3))
  //bez = newbez(width, width/perms[0][2])
  bez = newbez(width, 50);
 


  
  let curldiv = 4;
  let filename = "incr" + incr + "diam" + dd + "curl" + curldiv;
  let bez_count = 0;
  nbez = nextbez(bez, width, b);
  for (let l = 0; l < incr; l++) {
    circles.push(new bezprops(bez[0], bez[1], bez[2], bez[3], incr, width, height, l, dd, 2));
  }
  console.log(circles.length);
  for (var i = 0; i < circles.length; i++) {
    var bprops = circles[i];
    //var clr = lerpColor(color('#032edc'), color('#a3e3fe0'), frameCount/circles.length);
    //var strk_clr = lerpColor(color('#a3e3fe0'), color('#032edc'), frameCount/circles.length);
    var clr = '#ffffff';
    var strk_clr = '#000000';
    var ellipse = cvs.ellipse(
      bprops.diam, bprops.diam).attr({ 
      cx: bprops.y, cy: bprops.x + 100, opacity: 0.5, fill: clr }).stroke({ 
        width: 0.05 * bprops.diam, color: strk_clr });
    ellipse.mouseover(function(){
      writh(); 
    })
    stack.push(ellipse);
  }
}

function draw() {

  //cvs.attr({x: frameCount});
  //var ellipse = cvs.ellipse(100, 100).attr({cx: frameCount, stroke: '#ff0000', opacity: 0.01, fill: '#0000ff'});

}

function writh(){
  for (let j = 0; j < 4; j++){
    bez[j].x += random(-3, 3);
    bez[j].y += random(-3, 3);
  }
  for(let [i, e] of stack.entries()){
    let bprops = new bezprops(bez[0], bez[1], bez[2], bez[3], incr, width, height, i, dd, 2);
    e.attr({width: bprops.diam, height: bprops.diam, cx: bprops.y, cy: bprops.x + 100});
  }

}