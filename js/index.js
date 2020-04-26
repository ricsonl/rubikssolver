const dim = 3;
const len = 50;

var cube = [];

const colors = {
    upp: '#009b00', dwn: '#0046ad',
    lft: '#e02000', rgt: '#d56000',
    frt: '#ffffff', bck: '#fff000'
};

function turn(axis, index, dir){
    for (let i = 0; i < cube.length; i++) {
        if (axis == 'x' && cube[i].x == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].y, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(cube[i].x, round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]));
            cube[i].turnFacesX(dir);
        }
        if (axis == 'y' && cube[i].y == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), cube[i].y, round(mt[3 * 4 + 1]));
            cube[i].turnFacesY(dir);
        }
        if (axis == 'z' && cube[i].z == index) {
            let m1 = Rematrix.rotate(dir*90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].y);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]), cube[i].z);
            cube[i].turnFacesZ(dir);
        }
    }
}

function keyPressed(){
    switch(key){
        case 'f':
            turn('z', 1, 1);
            break;
        case 'F':
            turn('z', 1, -1);
            break;
        case 'b':
            turn('z', -1, -1);
            break;
        case 'B':
            turn('z', -1, 1);
            break;
        case 'd':
            turn('y', 1, -1);
            break;
        case 'D':
            turn('y', 1, 1);
            break;
        case 'u':
            turn('y', -1, 1);
            break;
        case 'U':
            turn('y', -1, -1);
            break;
        case 'l':
            turn('x', -1, -1);
            break;
        case 'L':
            turn('x', -1, 1);
            break;
        case 'r':
            turn('x', 1, 1);
            break;
        case 'R':
            turn('x', 1, -1);
            break;
    }
}

function setup() {
    createCanvas(500, 500, WEBGL);
    var index = 0;
    for(let x = -1; x <= 1; x++){
        for(let y = -1; y <= 1; y++){
            for(let z = -1; z <= 1; z++){
                mat = Rematrix.translate3d(x, y, z);
                cube[index] = new Cubie(mat, x, y, z);
                index++;
            }
        }
    }
    cube[0].c = '#ff0000';
    cube[2].c = '#0000ff';
}

function draw() {
    clear();
    background('#333');
    scale(50);
    rotX = map(mouseY, height, 0, -3.2, 3.2);
    rotY = map(mouseX, width, 0, 3.2, -3.2);
    rotateX(rotX);
    rotateY(rotY);
    for (let i = 0; i < cube.length; i++) {
        cube[i].show();
    }
}