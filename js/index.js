const dim = 3;
const len = 50;

var cube = [];

const colors = {
    upp: '#009b00', dwn: '#0046ad',
    lft: '#e32000', rgt: '#ff5a00',
    frt: '#ffffff', bck: '#ffd300'
};

function turn(axis, index){
    for (let i = 0; i < cube.length; i++) {
        if (axis == 'x' && cube[i].x == index) {
            let m1 = Rematrix.rotate(90);
            let m2 = Rematrix.translate(cube[i].y, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(cube[i].x, round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]));
        }
        if (axis == 'y' && cube[i].y == index) {
            let m1 = Rematrix.rotate(90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].z);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), cube[i].y, round(mt[3 * 4 + 1]));
        }
        if (axis == 'z' && cube[i].z == index) {
            let m1 = Rematrix.rotate(90);
            let m2 = Rematrix.translate(cube[i].x, cube[i].y);
            let mt = Rematrix.multiply(m1, m2);
            cube[i].update(round(mt[3 * 4 + 0]), round(mt[3 * 4 + 1]), cube[i].z);
        }
    }
}

function keyPressed(){
    switch(key){
        case '1':
            turn('x', -1);
            break;
        case '2':
            turn('x', 1);
            break;
        case '3':
            turn('y', -1);
            break;
        case '4':
            turn('y', 1);
            break;
        case '5':
            turn('z', -1);
            break;
        case '6':
            turn('z', 1);
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