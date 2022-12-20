let hair;
let red_hair;
let cvs; //svg canvas
let rectangle;
//note that right now width is the range for control points
//and height is the range for the bezier curve full length
function setup() {
  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({ fill: '#000' });
  rectangle = cvs.rect(windowWidth, windowHeight).attr({ fill: '#000' });
  let test = cvs.ellipse(50, 50);


  let incr = 50;


  hair = new medusa(incr, windowWidth, 200);
  red_hair = new medusa(incr, windowWidth, 300);
  hair.gen_curves(0);
  hair.gen_circles();
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
      hair.writhe(4);

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