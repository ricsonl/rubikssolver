const dim = 3;
const len = 50;
const offset = (dim-1)*len*0.5;

var cube = [];
const colors = {
    upp: '#009b48', dwn: '#0046ad',
    lft: '#b71234', rgt: '#ff5800',
    frt: '#ffffff', bck: '#ffd500'
};

function setup() {
    createCanvas(500, 500, WEBGL);
    for(let i=0; i < dim; i++){
        cube[i] = [];

        for(let j=0; j < dim; j++){
            cube[i][j] = [];

            for(let k=0; k < dim; k++){
                cube[i][j][k] = new Cubie(i*len-offset, j*len-offset, k*len-offset, len);
            }
        }
    }
}

function draw() {
    clear();
    background('#333');
    rotX = map(mouseY, height, 0, -3.2, 3.2);
    rotY = map(mouseX, width, 0, 3.2, -3.2);
    rotateX(rotX);
    rotateY(rotY);
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            for (let k = 0; k < dim; k++) {
                cube[i][j][k].show();
            }
        }
    }
}