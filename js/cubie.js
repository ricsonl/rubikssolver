class Cubie {
    matrix = undefined;
    highlight = undefined;

    constructor(m){
        this.matrix = m;
        this.highlight = false;
    }

    show(){
        fill(255);
        if(this.highlight){
            fill(255, 0, 0);
        }
        stroke(0);
        strokeWeight(5);

        push();
        applyMatrix(...this.matrix);
        box(1);
        resetMatrix();
        pop(); 
    }
}