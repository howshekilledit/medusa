let hair; 
let cvs; //svg canvas
//note that right now width is the range for control points
//and height is the range for the bezier curve full length
function setup() {
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({ fill: '#000' });
  rectangle = cvs.rect(windowWidth, windowWidth).attr({ fill: '#000' });
 
  let incr = 30;
  let dd = 8;
  let curldiv = 2;
  let bez_count = 0;
  let last_x = 0;

  hair = new medusa(incr, windowWidth, 300, 1, true, 1, 1);
  frameRate(12);

}

function mouseClicked() {
  console.log(rectangle.fill());
  if(rectangle.fill() == '#000000'){
    rectangle.attr({fill: '#fff'});
  }else{
    rectangle.attr({fill: '#000'});
  }

}

function draw() {
  var bprops = circles[frameCount];
  //svg.style.left = frameCount;  //move camera
  //var clr = lerpColor(color('#032edc'), color('#a3e3fe0'), frameCount/circles.length);
  //var strk_clr = lerpColor(color('#a3e3fe0'), color('#032edc'), frameCount/circles.length);
  var clr = '#ffffff';
  var strk_clr = '#000000';
  diam = map(abs(circles.length / 2 - frameCount), 0, circles.length / 2, 50, 3);
  var ellipse = cvs.ellipse(diam, diam).attr({
    cx: bprops.y, cy: bprops.x + 100, opacity: 0.5, fill: clr
  }).stroke({
    width: 0.05 * diam, color: strk_clr
  });
  ellipse.mouseover(function () {
    this.fill({ color: '#ff0000' })
  })
  //cvs.attr({x: frameCount});
  //var ellipse = cvs.ellipse(100, 100).attr({cx: frameCount, stroke: '#ff0000', opacity: 0.01, fill: '#0000ff'});

}