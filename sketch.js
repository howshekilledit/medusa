let hair;
let red_hair;
let cvs; //svg canvas
let svg; //svg DOM object
let rectangle;
let start;
let hair_width;
let panning = false; //is 'camera' panning?
//note that right now width is the range for control points
//and height is the range for the bezier curve full length
function setup() {

  //svg canvas to draw on with svg.js/p5.js
  cvs = SVG().addTo('main').size(windowWidth, windowHeight).attr({ fill: '#000' });
  //svg DOM object to manipulate with javascript
  svg = document.getElementsByTagName('svg')[0];

  let incr = 30;

  let max_hair_width = windowWidth * 0.8;

  hair = new medusa(incr, max_hair_width, 200, 5);
  red_hair = new medusa(incr, max_hair_width, 200, 5);
  hair.gen_curves(0);
  hair.gen_circles();
  let dimensions = hair.get_dimensions();

  var offset = new pt((windowWidth - dimensions.x) / 2, (windowHeight - dimensions.y) / 2);
  console.log(dimensions, windowWidth, offset);

  hair.set_offset(offset);
  red_hair.set_offset(offset);
  red_hair.gen_curves(0);
  red_hair.gen_circles();
  console.log(hair);
  frameRate(12);
  noLoop();
  hair.draw_all_circles(cvs, '#fff', '#000');
  //cvs.line(offset.x, offset.y, offset.x + dimensions.x, offset.y + dimensions.y).stroke({ width: 1, color: '#f00' });
  cvs.rect(dimensions.x, dimensions.y).move(offset.x, offset.y).stroke({ width: 1, color: '#f00' }).fill('none');
  //red_hair.draw_all_circles(cvs, '#f00', '#000');

}


function draw() {
  if(panning){
    svg.style.left = -frameCount;
  }
  if (frameCount < hair.circles.length) {
    let ellipse = hair.draw_circle(cvs, frameCount, '#fff', '#000');
    let red_ellipse = red_hair.draw_circle(cvs, red_hair.circles.length - frameCount, '#f00', '#000');
    ellipse.mouseover(function () {
      hair.writhe(2);
    });
    red_ellipse.mouseover(function () {
      red_hair.writhe(4);
    });
  } else {
    noLoop();
  }



}


function mouseClicked() {
  if (document.body.style.zoom == 1.0) {
    document.body.style.zoom = 3.0;
    svg.style.top = -windowHeight/3;
    panning = true;
  } else {
    document.body.style.zoom = 1.0;
    svg.style.left = 0;
    svg.style.top = 0;
    panning = false;
  }

  //this.blur();


}