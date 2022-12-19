class pt{
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class medusa {
    constructor(
        incr, //number of points to make up curve
        max_hair_length, //length of hair
        curl_lat, //max latitude of curl
        didiv, //divisor to help determine diameter
        hor = true, //true if horizontal hair; false if vertical hair
        diamfact = 1, //multipler to help determine diameter
        curl_div = 2 //curl divisor; higher number is curlier
        ) {
        let t = float(index) * 1/float(incr)
        this.t = t
        //print t
        this.tdif = 1 - t;
        this.curl_lat = curl_lat;
        this.curl_div = curl_div;
        this.max_hair_length = max_hair_length;
        this.didiv = didiv;
        this.hor = hor;
        this.diamfact = diamfact; 
        
    }

    //these functions deal with generating bezier curves, which 
    //are defined by four control points
    next_curve(last_curve, lateral_coord){
        let curve = [];
        if(last_curve){
            curve.push([last_curve[3]]);
        } 
        for (let i = curve.length; i < 4; i++){
            if(this.hor){
                curve.push(new pt(random(0, this.curl_lat*0.75)+lateral_coord),
                random(this.curl_lat*0.25, this.curl_lat*0.75));
            } else {
                curve.push(new pt(random(this.curl_lat*0.25, this.curl_lat*0.75), 
                random(0, this.curl_lat*0.75)+lateral_coord));
            }
        }
    }
    gen_curves(start_coord){ //generate the series of bezier curves that mnake up the hair
        this.curves = [this.next_curve(false, start_coord)];
        this_coord = start_coord + this.curl_lat/this.curl_div; 
        while(this_coord <= this.max_hair_length){
            this.curves.push(this.next_curve(this.curves.slice(-1), this_coord));
            this_coord += this.curl_lat/this.curl_div; 
        }
    }
    gen_circles(){
        var circles = [];
        for(let p of this.curves){  
            for(let i = 0; i < this.incr; i++){
                this.x = pow(tdif, 3)*(pt0.x) + 3*(pow(tdif,2)*t*(pt1.x)) + 
                    3*tdif*pow(t,2)*(pt2.x) + pow(t,3)*(pt3.x);
                this.y = pow(tdif, 3)*(pt0.y) + 3*(pow(tdif,2)*t*(pt1.y)) + 
                    3*tdif*pow(t,2)*(pt2.y) + pow(t,3)*(pt3.y);
                //this.dist = sqrt(pow(this.x-pt0.x, 2) + pow(this.y-pt0.y, 2))
                this.diam = abs((1-abs(hair_length/2-this.dist)/(height/2))*curl_lat/didiv) * diamfact;
                //to match js version, add diamfact
                this.ctl_pts = ctl_pts; 
            }
        }
    }
}
