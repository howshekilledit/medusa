class pt{
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class bezprops {
    constructor(pt0, pt1, pt2, pt3, incr, width, height, i, didiv, diamfact = 1) {
        let t = float(i) * 1/float(incr)
        this.t = t
        //print t
        let tdif = 1 - t
        this.x = pow(tdif, 3)*(pt0.x) + 3*(pow(tdif,2)*t*(pt1.x)) + 3*tdif*pow(t,2)*(pt2.x) + pow(t,3)*(pt3.x)
        this.y = pow(tdif, 3)*(pt0.y) + 3*(pow(tdif,2)*t*(pt1.y)) + 3*tdif*pow(t,2)*(pt2.y) + pow(t,3)*(pt3.y)
        //this.dist = sqrt(pow(this.x-pt0.x, 2) + pow(this.y-pt0.y, 2))
        this.dist = sqrt(pow(width-this.x, 2) + pow(height-(this.y), 2))
        this.subind = i
        this.diam = abs((1-abs(height/2-this.dist)/(height/2))*width/didiv) * diamfact;
        //to match js version, add diamfact
        this.pt0 = pt0
        this.pt1 = pt1
        this.pt2 = pt2
        this.pt3 = pt3
    }
}

function nextbez(bez, width, y){
    //get first point from lst
    let nbez = [bez[3]];
    for (let x = 1; x < 4; x++){
        nbez.push(new pt(random(width*0.25, width*0.75), random(0, width*0.75)+y));
    }
    //adjust new bez to match slope of last
    nbez[1].x = nbez[0].x + (bez[3].x - bez[2].x);
    nbez[1].y = nbez[0].y + (bez[3].y - bez[2].y);
    return nbez;
}

function newbez(width, y) {
    bez = [];
    for (var x = 0; x < 4; x++) {
        bez.push(new pt(random(width*0.25, width*0.75), random(0, width*0.75)+y));
    }
    return bez;
}