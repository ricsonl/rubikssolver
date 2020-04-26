class Cubie {
    matrix = undefined;
    x = undefined;
    y = undefined;
    z = undefined;
    c = undefined;

    constructor(m, x, y, z){
        this.matrix = m;
        this.x = x;
        this.y = y;
        this.z = z;
        this.c = '#fff';
    }

    update(x, y, z){
        this.matrix = Rematrix.translate3d(x, y, z);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show(){
        fill(this.c);
        stroke(0);
        strokeWeight(5);
        push();
        applyMatrix(...this.matrix);
        box(1);
        resetMatrix();
        pop(); 
    }
}