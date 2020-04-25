class Cubie {
    pos = undefined;
    len = undefined;
    constructor(x, y, z, len){
        this.pos = createVector(x, y, z);
        this.len = len;
    }

    show(){
        stroke(0);
        strokeWeight(5);

        push();

        translate(this.pos.x, this.pos.y, this.pos.z);
        const r = len*0.5;
        
        //Z
        fill(colors.bck);
        quad(-r, -r, -r,
              r, -r, -r,
              r,  r, -r,
             -r,  r, -r);
        fill(colors.frt);
        quad(-r, -r, r,
              r, -r, r,
              r,  r, r,
             -r,  r, r);

        
        //Y
        fill(colors.upp);
        quad(-r, -r, -r,
              r, -r, -r,
              r, -r,  r,
             -r, -r,  r);
        fill(colors.dwn);
        quad(-r,  r, -r,
              r,  r, -r,
              r,  r,  r,
             -r,  r,  r);
        
        //X
        fill(colors.lft);
        quad(-r, -r, -r,
             -r,  r, -r,
             -r,  r,  r,
             -r, -r,  r);
        fill(colors.rgt);
        quad( r, -r, -r,
              r,  r, -r,
              r,  r,  r,
              r, -r,  r);
        
        pop(); 
    }
}