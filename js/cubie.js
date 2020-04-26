class Cubie {
    matrix = undefined;
    x = undefined;
    y = undefined;
    z = undefined;
    faces = undefined;

    constructor(m, x, y, z){
        this.matrix = m;
        this.x = x;
        this.y = y;
        this.z = z;
        this.faces = [];
        this.faces[0] = new Face(createVector(0, 0, -1), colors.bck);
        this.faces[1] = new Face(createVector(0, 0, 1), colors.frt);
        this.faces[2] = new Face(createVector(0, 1, 0), colors.dwn);
        this.faces[3] = new Face(createVector(0, -1, 0), colors.upp);
        this.faces[4] = new Face(createVector(1, 0, 0), colors.rgt);
        this.faces[5] = new Face(createVector(-1, 0, 0), colors.lft);
    }

    turnFacesX(dir){
        for (let i = 0; i < this.faces.length; i++) {
            this.faces[i].turn('x', dir*HALF_PI);
        }
    }
    turnFacesY(dir){
        for (let i = 0; i < this.faces.length; i++) {
            this.faces[i].turn('y', dir*HALF_PI);
        }
    }
    turnFacesZ(dir){
        for (let i = 0; i < this.faces.length; i++) {
            this.faces[i].turn('z', dir*HALF_PI);
        }
    }

    update(x, y, z){
        this.matrix = Rematrix.translate3d(x, y, z);
        this.x = x;
        this.y = y;
        this.z = z;
    }

    show(){
        noFill();
        stroke(0);
        strokeWeight(7);
        push();
        applyMatrix(...this.matrix);
        box(1);
        for(let i=0; i<this.faces.length; i++){
            this.faces[i].show();
        }
        resetMatrix();
        pop(); 
    }
}