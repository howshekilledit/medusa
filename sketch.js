let hair;
let red_hair;
let cvs; //svg canvas
let rectangle;
let start; 
let hair_width; 
//note that right now width is the range for control points
//and height is the range for the bezier curve full length
function setup() {
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({ fill: '#000' });
  rectangle = cvs.rect(windowWidth, windowHeight).attr({ fill: '#000' });


  let incr = 30;

  let hair_width = windowWidth *0.9;
 
  hair = new medusa(incr, hair_width, 200, 5);
  red_hair = new medusa(incr, hair_width, 300);
  hair.gen_curves(0);
  hair.gen_circles();
  let dimensions = hair.get_dimensions();
  console.log(dimensions);
  hair.set_offset(new pt((windowWidth-dimensions.x)/2, (windowWidth-dimensions.y)/2));
  red_hair.gen_curves(0);
  red_hair.gen_circles();
  console.log(hair);
  frameRate(12);

}


function draw() {
  if (frameCount < hair.circles.length) {
    let attr = hair.circles[frameCount];
    let red_attr = red_hair.circles[red_hair.circles.length - frameCount];

    let diam = map(abs(hair.circles.length / 2 - frameCount), 0, hair.circles.length / 2, hair.max_diam, hair.min_diam);
    let ellipse = hair.draw_circle(cvs, frameCount, '#fff', '#000');
    ellipse.mouseover(function () {
      hair.writhe(2);

    });
  }else {
    noLoop(); 
  }



}


function mouseClicked() {
  if (rectangle.fill() == '#000000') {
    rectangle.attr({ fill: '#fff' });
  } else {
    rectangle.attr({ fill: '#000' });
  }

}