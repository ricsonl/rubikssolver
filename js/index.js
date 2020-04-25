const dim = 3;
const len = 50;
const offset = (dim-1)*len*0.5;

var cube = [];

function setup() {
    createCanvas(500, 500, WEBGL);
    for(let i=0; i < dim; i++){
        cube[i] = [];

        for(let j=0; j < dim; j++){
            cube[i][j] = [];

            for(let k=0; k < dim; k++){
                cube[i][j][k] = new Box(i*len-offset, j*len-offset, k*len-offset, len);
            }
        }
    }
}

function draw() {
    clear();
    background('#333');
    rotX = map(mouseY, height, 0, -3, 3);
    rotY = map(mouseX, width, 0, 3, -3);
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