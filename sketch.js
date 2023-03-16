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
  red_hair = new medusa(incr, max_hair_width, 200, 5, '#000', '#f00');
  hair.gen_curves(0);
  hair.gen_circles();
  let dimensions = hair.get_dimensions();
  let corners = hair.get_corners();
  //get offset to center hair
  var offset = new pt((windowWidth - dimensions.x) / 2 - corners[0].x, (windowHeight - dimensions.y) / 2 - corners[0].y);
  hair.set_offset(offset);
  red_hair.set_offset(offset);
  red_hair.gen_curves(0);
  red_hair.gen_circles();
  window.scrollTo(0,0); //scroll to top left of page
  toggle_pan(); //first call, as of now needs to calls to work
  toggle_pan();
  frameRate(12);

  //noLoop();
  //hair.draw_all_circles(cvs, '#fff', '#000');
  //hair.bounding_box(cvs, 'yellow');
  // for(let i = 0; i < corners.length; i++){
  //    cvs.line(corners[i].x + offset.x, corners[i].y + offset.y, corners[(i+1)%corners.length].x + offset.x, corners[(i+1)%corners.length].y + offset.y).stroke({ width: 1, color: '#f00' });
  // }
}


function draw() {
  if (panning) {
    svg.style.left = -frameCount;
  }
  if (frameCount < hair.circles.length) {

    let ellipse = hair.draw_circle(cvs, frameCount);
    let red_ellipse = red_hair.draw_circle(cvs, frameCount, '#f00', '#000');
    ellipse.mouseover(function () {
      hair.writhe(2);
    });
    // red_ellipse.mouseover(function () {
    //   red_hair.writhe(4);
    // });
  } else {
    noLoop();
  }
}

function keyTyped() {
  switch (key) {
    case 'a': {
      if (hair.bb) {
        hair.bb.remove();
        hair.bb = null;
      } else {
        hair.bounding_box(cvs, '#ff0'); //draw bounding box
      }
      break;
    }
    case 's': {
      hair.update_bounding_box();
      break;
    }
    case 'd': { //toggle zoom and pan
      toggle_pan();
      break;
    }
    // case 's': {
    //   save('medusa.svg'); //needs update
    //   break;
    // }
    case 'f': {
      let fll = hair.stroke;
      let strk = hair.fill;
      hair.fill = fll;
      hair.stroke = strk;
      hair.update_colors(true); //update circles
    }
    default:
      break;
  }
}
function toggle_pan() {
  if (document.body.style.zoom == 1.0) {
    panning = true;
    svg.style.top = -windowHeight / 3;
    document.body.style.zoom = 3.0;
  } else {
    document.body.style.zoom = 1.0;
    svg.style.left = 0;
    svg.style.top = 0;
    panning = false;
  }
}