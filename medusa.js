class pt{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class medusa {
    constructor(
        incr, //number of points to make up curve
        max_hair_length, //length of hair
        curl_lat, //max latitude of curl
        curl_div = 2, //curl divisor; higher number is curlier
        hor = true, //true if horizontal hair; false if vertical hair
        min_diam = 1,
        max_diam = 70,
        ) {
        this.curl_lat = curl_lat;
        this.curl_div = curl_div;
        this.max_hair_length = max_hair_length;
        this.min_diam = min_diam;
        this.max_diam = max_diam;
        this.hor = hor;
        this.incr = incr;
        this.offset = new pt(0, 0); //initialize offset at zero, use set offset to change
    }

    set_offset(point){
        this.offset = point; 
    }

    get_dimensions(){ //get dimensions of hair footprint
        let max_rad = max(this.circles.map(c => c.diam))/2; 
        return new pt(
            max_rad*2 + max(this.circles.map(c => c.x))-min(this.circles.map(c => c.x)),
            max_rad*2 + max(this.circles.map(c => c.y))-min(this.circles.map(c => c.y))
        );
    }

    //these functions deal with generating bezier curves, which 
    //are defined by four control points
    next_curve(last_curve, lateral_coord){
        let curve = [];
        if(last_curve){
            curve.push(last_curve[3]);
        } 
        for (let i = curve.length; i < 4; i++){
            if(this.hor){
                curve.push(new pt(
                    random(0, this.curl_lat*0.75)+lateral_coord,
                    random(this.curl_lat*0.25, this.curl_lat*0.75)
                    ));
            } else {
                curve.push(new pt(
                    random(this.curl_lat*0.25, this.curl_lat*0.75),
                    random(0, this.curl_lat*0.75)+lateral_coord
                    ));
            }
        }
        if(last_curve){
            curve[1].x = curve[0].x + (last_curve[3].x - last_curve[2].x);
            curve[1].y = curve[0].y + (last_curve[3].y - last_curve[2].y);
        }
        return curve;
    }
    gen_curves(start_coord){ //generate the series of bezier curves that mnake up the hair
        this.curves = [this.next_curve(false, start_coord)];
        let this_coord = start_coord + this.curl_lat/this.curl_div; 
        while(this_coord <= this.max_hair_length){
            this.curves.push(this.next_curve(this.curves[this.curves.length-1], this_coord));
            this_coord += this.curl_lat/this.curl_div; 
        }
    }
    gen_circles(){ //using the curve information created in gen_curves, generate
                    //parameters for the circles that make up the hair
        this.circles = [];
        for(let p of this.curves){  
            for(let i = 0; i < this.incr; i++){
                let t = float(i) * 1/float(this.incr);
                let tdif = 1 - t; 
                let x = pow(tdif, 3)*(p[0].x) + 3*(pow(tdif,2)*t*(p[1].x)) + 
                    3*tdif*pow(t,2)*(p[2].x) + pow(t,3)*(p[3].x);
                let y = pow(tdif, 3)*(p[0].y) + 3*(pow(tdif,2)*t*(p[1].y)) + 
                    3*tdif*pow(t,2)*(p[2].y) + pow(t,3)*(p[3].y);
                //edit this to account for vertical
                let max_dist = sqrt(pow(this.max_hair_length/2, 2) + pow(this.curl_lat/2, 2));
                let dist_from_center = sqrt(pow(x - this.max_hair_length/2, 2) + pow(y-this.curl_lat/2, 2));
                // let diam = abs((1-abs(this.max_hair_length/2-dist)/(this.curl_lat/2))*
                //     this.curl_lat/this.didiv) * this.diamfact;
                let diam = map(dist_from_center, 0, max_dist, this.max_diam, this.min_diam);
                this.circles.push({x:x, y:y, diam:diam});     
            }
        }
    }
    update_circles(){ //update circles after changing the structuring curves
        let abs_i = 0; 
        for(let p of this.curves){  
            for(let i = 0; i < this.incr; i++){
                let t = float(i) * 1/float(this.incr);
                let tdif = 1 - t; 
                let x = pow(tdif, 3)*(p[0].x) + 3*(pow(tdif,2)*t*(p[1].x)) + 
                    3*tdif*pow(t,2)*(p[2].x) + pow(t,3)*(p[3].x);
                let y = pow(tdif, 3)*(p[0].y) + 3*(pow(tdif,2)*t*(p[1].y)) + 
                    3*tdif*pow(t,2)*(p[2].y) + pow(t,3)*(p[3].y);
                //edit this to account for vertical
                let max_dist = sqrt(pow(this.max_hair_length/2, 2) + pow(this.curl_lat/2, 2));
                let dist_from_center = sqrt(pow(x - this.max_hair_length/2, 2) + pow(y-this.curl_lat/2, 2));
                // let diam = abs((1-abs(this.max_hair_length/2-dist)/(this.curl_lat/2))*
                //     this.curl_lat/this.didiv) * this.diamfact;
                let diam = map(dist_from_center, 0, max_dist, this.max_diam, this.min_diam);
                this.circles[abs_i].x = x;
                this.circles[abs_i].y = y; 
                //if the circle has already been drawn, update it
                if(this.circles[abs_i].ellipse){
                    this.circles[abs_i].ellipse.attr({cx:x+this.offset.x, 
                        cy:y + this.offset.y});
                }  
                abs_i++; 
            }
        }
    }
    //draw circle, identified by index, on SVG canvas
    draw_circle(cvs, index, fill_clr, strk_clr){
        let diam = map(abs(this.circles.length/2-index), 0, this.circles.length/2, this.max_diam, this.min_diam); 
        this.circles[index].ellipse = cvs.ellipse(diam, diam).attr(
            {cx: this.circles[index].x + this.offset.x, 
                cy: this.circles[index].y + this.offset.y, 
            fill: fill_clr, opacity: 0.5}).stroke({
                width: 0.05 * diam, color: strk_clr});
        return this.circles[index].ellipse; 
    }
    //draw all circles on SVG canvas
    draw_all_circles(cvs, fill_clr, strk_clr){
        for(let i = 0; i < this.circles.length; i++){
            this.draw_circle(cvs, i, fill_clr, strk_clr);
        }
    }
    writhe(amt = 1){ //changes each curve by specified "amt"
        for(let i = 0; i < this.curves.length; i++){
            for(let p = 0; p < 4; p++){
                this.curves[i][p].x += random(-amt, amt); 
                this.curves[i][p].y += random(-amt, amt); 
            }
            if(i > 0){
                this.curves[i][0] = this.curves[i-1][3];
                this.curves[i][1].x = this.curves[i][0].x + (this.curves[i-1][3].x - this.curves[i-1][2].x);
                this.curves[i][1].y = this.curves[i][0].y + (this.curves[i-1][3].y - this.curves[i-1][2].y);
            }
        }
        this.update_circles(); 
    }
}
