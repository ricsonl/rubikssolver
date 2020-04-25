class Box {
    pos = undefined;
    len = undefined;
    constructor(x, y, z, len){
        this.pos = createVector(x, y, z);
        this.len = len;
    }

    show(){
        fill(255);
        stroke(0);
        strokeWeight(4);
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        box(len);
        pop(); 
    }
}