let colors = ['#BE5F7D' /*dodge pink*/,
  '#2AADCB' /*dodge blue*/,
  '#7A3648' /*dodge plum*/,
  '#B54550' /*dodge tomato*/,
  '#503E6E' /*oehlen purple*/,
  '#bbc4b3' /* green resin*/,
  '#FFBF00' /*amber*/,
  '#4BCC3A' /*green sea glass*/,
  '#2385A3' /*blue sea glass*/,
  '#DA1A1E' /*tomato*/
];

let cvs;
function setup() {
  noLoop();
}
function draw() {

  cvs = SVG().addTo('main').size(windowWidth, windowWidth).attr({background:random(colors)});

  let dims = createVector(random(90, 200), random(80, 150)); //initial constructor params legs

  let m = threeD(createVector(random(90, 150), random(90, 150)), dims);
;
  let fct = m.fcts[0];

  let matches = m.frontFacets();
  console.log(matches.length);
  let x_trans =m.getDim().x;
  // for(let [i, match] of matches.entries()){
  //   let nm = match.copyTranslated({x:x_trans*(i+0), y:0});

  //   nm.drawAll();

  // }

  //matches[0].getCross(true);
  c1 = random(colors);
  c2 = random(colors);
  //m.sandwich(c1, c2);
  let threeSelect = random(m.threeFacets());
  threeSelect.sandwich(c1, c2, m);
  //testFronts(m,  c1, c2);

  document.getElementById('saver').onclick = function () { saveData(cvs.svg(), 'svg.svg') };


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

//creates a six sided prism in a two dimensional system
function threeD(main = createVector(200, 100), legs = [createVector(100, 500), createVector(100, -300)]) {
  let monolith = new prism();
  //nase facet, from which legs extrude
  let base_face = new facet(main, createVector(40, 60));
  base_face.sortCw();
  base_face.set_type('base');
  ////console.log(base_face);
  monolith.addFacet(base_face);
  var vs = base_face.vtcs;
  let n_legs;
  //determine if single or multiple legs
  if (legs.constructor != Array) {
    n_legs = 1;

  } else {
    n_legs = legs.length;
  }

  //for each consecutive vertex pair in facet, generate a side facet based on leg dimensions
  for (var j = 0; j < n_legs; j++) {//for each leg
    let lg = legs;
    if (n_legs > 1) {
      lg = legs[j];
      if (j > 0) {
        base_face = base_face.copyTranslated(legs[j - 1]);
        base_face.set_type('base');
        monolith.addFacet(base_face);
        vs = base_face.vtcs;
      }
    }

    for (var i = 0; i < vs.length; i++) {
      let v = vs[i];
      let nv;
      if (i == vs.length - 1) {
        nv = vs[0];
      } else {
        nv = vs[i + 1]
      }

      genFacet(v, nv, lg);


    }

  }
  if (n_legs == 1) {
    let end_face = base_face.copyTranslated(legs);
    end_face.set_type('base');
    monolith.addFacet(end_face);
  }

  function genFacet(v, nv, lg) {
    var nFace = new facet(
      [createVector(v.x, v.y), createVector(nv.x, nv.y)],
      createVector(lg.x, lg.y)
    );
    nFace.sortCw();
    nFace.set_type('leg');
    monolith.addFacet(nFace);

  }
  return monolith;

}

function testFronts(monolith, c1 = random(colors), c2 = random(colors)){
  let d = monolith.getDim();//monolith size
  let f1 = monolith.fcts[0] //first facet
  let t_d = f1.getDim(); //first face tsize
  let start = createVector(50, 50);
  let trans = createVector(start.x, start.y);
  let group = cvs.group();
  let indent = false;
  let z = monolith.threeFacets(); //all three facet combinatiosn from original facets
  let fronts = monolith.frontFacets(); //front and back facet sets
  var txt = group.text(function (add) {
    add.tspan('CRASS').dx(f1.vtcs[0].x).dy(f1.vtcs[0].y).fill('#000');
  })
  //txt.skew(n.x, n.y);
  let row = 0;
  for (let [i, m] of z.entries()) {

    let pm = m.copyTranslated(trans); //3 sided fragment
    let om = monolith.copyTranslated(trans);


    //if(i%2){ //moves position every other iteration, to allwo for layering stacks
    if (trans.x + t_d.x < 500) {
      trans.x += t_d.x;
    } else {
      //if(indent){
      if(row%2 == 0){
        row++;
        start.x += (d.x - t_d.x/2);

      }
      else{
        row++;
        start.x -= (d.x- t_d.x/2);

      }
      indent = false;
      // } else {
      //   start.x -= d.x-t_d.x/2;
      //   indent = true;
      // }
      trans.x = start.x;
      trans.y += d.y - t_d.y / 2;
    }
    // } else {

    //om.drawAll(cvs, '#fff', {width:0, color:'#fff'});

    // pm.drawAll(cvs, random(colors), {strk:'none', width:0});
  //   if(ceil(random(10)) == 0){
  //   //   om.drawAll(cvs, '#fff');
    pm.sandwich( c1, c2, om);
  //  } else {
      //pm.drawAll();
    //}
    //om.fcts[0].stackShape(dims, c1, c2);
    //}
  }

}

function testText(monolith, str) {
  let facet = monolith.fcts[0];
  //facet.label();
  let vtcs = facet.vtcs;
  monolith.drawAll();
  let ctr = facet.getCenter();
  let dim = facet.getDim();
  //angleMode(DEGREES);
  //let angF = vtcs[1].angleBetween(vtcs[0]);
  let a1 = vtcs[1];
  let a2 = vtcs[0];

  let angF = tan((a1.y - a2.y) / (a1.x - a2.x)) % PI;
  angF *= 180 / PI;
  console.log(angF);
  //let rect = cvs.rect(dim.x, dim.y).attr({ fill: '#f06', opacity: 0.5}).dx(ctr.x-dim.x/2).dy(ctr.y-dim.y/2)
  var txt = cvs.text(function (add) {
    add.tspan(str).dx(ctr.x - dim.x / 5).dy(ctr.y).fill('#000');
  })
  skew = dim.x / dim.y;
  txt.rotate(angF);
  //rect.rotate(angF);
  //txt.skew(1, 0);
  //txt.animate(3000, 100, 'now').skew(100*(dim.y/dim.x), 0)

  //txt.skew(dim.x/2, dim.y/2);

}



//cluster copies of monoliths, different designs, option to add color stack
function cluster(monolith, stack = false, n = 5) {
  //to add color stack, 2nd argument is object with vector, color 1, color 2 elements
  let steps = monolith.fcts[0].getDim();
  let x_step = steps.x;
  let y_step = steps.y;
  let x = 0;
  let y = 0;
  for (let i = 0; i < n; i += 1) {
    switch (floor(random(3))) {
      case 0:
        x += x_step;
        break;
      case 1:
        y += y_step;
        break;
      case 2:
        y += y_step / 2;
        x += x_step / 2;
        break;
    }
    y += y_step;
    x += x_step;
    let m = monolith.copyTranslated(createVector(x, y));
    let z = m.frontFacets();

    z[i % 2].drawAll(cvs, 'none', '#ff0000' );

    if (stack) {
      //console.log(m.fcts[0]);
      if (stack.v.constructor != Array) {  //if single leg
        //m.fcts[0].stackShape(stack.v, stack.c1, stack.c2);
      } else { //if multiple legs
        let v_i = 0;
        for (let [i, f] of m.fcts.entries()) {
          v = stack.v[v_i];
          console.log(f);
          if (i % 5 == 0) { //if base facet

            //f.stackShape(v, stack.c1, stack.c2);
            v_i++;
          }
        }
      }
    }



    //z[1].drawAll(cvs, 'none', {width: 1, color: '#00ff00' });



  }

}